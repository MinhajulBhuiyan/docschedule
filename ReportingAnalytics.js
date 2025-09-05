// Frontend: src/components/reporting/ReportingAnalytics.js
import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Dropdown,
  Tabs,
  Tab,
  Table,
  Spinner,
  Alert
} from 'react-bootstrap';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { format, parseISO, subDays, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import axios from 'axios';
import { API_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';
import './ReportingAnalytics.css';

const ReportingAnalytics = () => {
  const [reportData, setReportData] = useState({});
  const [filters, setFilters] = useState({
    dateRange: '30days',
    startDate: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    doctorId: 'all',
    appointmentType: 'all'
  });
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();

  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: 'month', label: 'This month' },
    { value: 'custom', label: 'Custom range' }
  ];

  useEffect(() => {
    fetchReportData();
  }, [filters]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const params = {
        startDate: filters.startDate,
        endDate: filters.endDate,
        doctorId: filters.doctorId !== 'all' ? filters.doctorId : undefined,
        appointmentType: filters.appointmentType !== 'all' ? filters.appointmentType : undefined
      };

      const res = await axios.get(`${API_URL}/api/reports/appointments`, { params });
      setReportData(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load report data');
      console.error('Report fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      
      // Handle date range presets
      if (key === 'dateRange' && value !== 'custom') {
        let startDate;
        const endDate = new Date();
        
        switch (value) {
          case '7days':
            startDate = subDays(endDate, 7);
            break;
          case '30days':
            startDate = subDays(endDate, 30);
            break;
          case '90days':
            startDate = subDays(endDate, 90);
            break;
          case 'month':
            startDate = startOfMonth(endDate);
            break;
          default:
            startDate = subDays(endDate, 30);
        }
        
        return {
          ...newFilters,
          startDate: format(startDate, 'yyyy-MM-dd'),
          endDate: format(endDate, 'yyyy-MM-dd')
        };
      }
      
      return newFilters;
    });
  };

  const handleExport = async (format) => {
    try {
      setExporting(true);
      const params = {
        startDate: filters.startDate,
        endDate: filters.endDate,
        format
      };
      
      const res = await axios.get(`${API_URL}/api/reports/export`, {
        params,
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `appointment-report-${format(new Date(), 'yyyy-MM-dd')}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
    } catch (err) {
      setError('Failed to export report');
    } finally {
      setExporting(false);
    }
  };

  const chartData = useMemo(() => {
    if (!reportData.dailyStats) return [];
    
    return reportData.dailyStats.map(day => ({
      date: format(parseISO(day.date), 'MMM dd'),
      scheduled: day.scheduled,
      completed: day.completed,
      cancelled: day.cancelled,
      revenue: day.revenue || 0
    }));
  }, [reportData.dailyStats]);

  const statusData = useMemo(() => [
    { name: 'Scheduled', value: reportData.summary?.scheduled || 0 },
    { name: 'Completed', value: reportData.summary?.completed || 0 },
    { name: 'Cancelled', value: reportData.summary?.cancelled || 0 },
    { name: 'No Show', value: reportData.summary?.noShow || 0 }
  ], [reportData.summary]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container fluid className="reporting-analytics">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Reporting & Analytics</h2>
              <p className="text-muted">Comprehensive appointment analytics and insights</p>
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" disabled={exporting}>
                {exporting ? 'Exporting...' : 'Export Report'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleExport('csv')}>CSV</Dropdown.Item>
                <Dropdown.Item onClick={() => handleExport('pdf')}>PDF</Dropdown.Item>
                <Dropdown.Item onClick={() => handleExport('excel')}>Excel</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Date Range</Form.Label>
                <Form.Select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                >
                  {dateRangeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  disabled={filters.dateRange !== 'custom'}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  disabled={filters.dateRange !== 'custom'}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Doctor</Form.Label>
                <Form.Select
                  value={filters.doctorId}
                  onChange={(e) => handleFilterChange('doctorId', e.target.value)}
                >
                  <option value="all">All Doctors</option>
                  {/* Would map through doctors list */}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Appointment Type</Form.Label>
                <Form.Select
                  value={filters.appointmentType}
                  onChange={(e) => handleFilterChange('appointmentType', e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="consultation">Consultation</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="emergency">Emergency</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={1} className="d-flex align-items-end">
              <Button variant="primary" onClick={fetchReportData}>
                Apply
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-white bg-primary">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h4>{reportData.summary?.total || 0}</h4>
                  <span>Total Appointments</span>
                </div>
                <i className="fas fa-calendar fa-2x"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-success">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h4>{reportData.summary?.completed || 0}</h4>
                  <span>Completed</span>
                </div>
                <i className="fas fa-check-circle fa-2x"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-danger">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h4>{reportData.summary?.cancelled || 0}</h4>
                  <span>Cancelled</span>
                </div>
                <i className="fas fa-times-circle fa-2x"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-info">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h4>${reportData.summary?.revenue || 0}</h4>
                  <span>Total Revenue</span>
                </div>
                <i className="fas fa-dollar-sign fa-2x"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts and Detailed Reports */}
      <Tabs defaultActiveKey="overview" className="mb-4">
        <Tab eventKey="overview" title="Overview">
          <Row>
            <Col md={8}>
              <Card className="mb-4">
                <Card.Header>
                  <h6 className="mb-0">Appointment Trends</h6>
                </Card.Header>
                <Card.Body>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="scheduled" stackId="1" stroke="#0088FE" fill="#0088FE" />
                      <Area type="monotone" dataKey="completed" stackId="1" stroke="#00C49F" fill="#00C49F" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Header>
                  <h6 className="mb-0">Status Distribution</h6>
                </Card.Header>
                <Card.Body>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card>
                <Card.Header>
                  <h6 className="mb-0">Revenue Trend</h6>
                </Card.Header>
                <Card.Body>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Header>
                  <h6 className="mb-0">Doctor Performance</h6>
                </Card.Header>
                <Card.Body>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={reportData.doctorStats || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="doctorName" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" fill="#00C49F" name="Completed" />
                      <Bar dataKey="cancelled" fill="#FF8042" name="Cancelled" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="detailed" title="Detailed Report">
          <Card>
            <Card.Header>
              <h6 className="mb-0">Appointment Details</h6>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Patient</th>
                      <th>Doctor</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Duration</th>
                      <th>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.detailedAppointments?.map(apt => (
                      <tr key={apt._id}>
                        <td>{format(parseISO(apt.startTime), 'MMM dd, yyyy')}</td>
                        <td>{apt.patientName}</td>
                        <td>Dr. {apt.doctor?.firstName} {apt.doctor?.lastName}</td>
                        <td>{apt.appointmentType}</td>
                        <td>
                          <span className={`badge bg-${
