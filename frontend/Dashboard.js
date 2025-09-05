// Frontend: src/components/dashboard/Dashboard.js
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Badge, 
  ListGroup, 
  Button, 
  Modal, 
  Form,
  Alert,
  Spinner
} from 'react-bootstrap';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { format, parseISO, isToday, isBefore, startOfDay, addDays } from 'date-fns';
import axios from 'axios';
import { API_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css'; // Assume we have some custom CSS

const STATUS_COLORS = {
  scheduled: 'primary',
  confirmed: 'info',
  completed: 'success',
  cancelled: 'danger',
  no_show: 'warning'
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {},
    todayAppointments: [],
    upcomingAppointments: [],
    chartData: [],
    notifications: []
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(''); // 'view', 'edit', 'confirm', 'cancel'
  const [quickStatus, setQuickStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    fetchDashboardData();
    // Set up polling or WebSocket for real-time updates in a real app
    const interval = setInterval(fetchDashboardData, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/dashboard`, {
        params: { userId: user._id, role: user.role }
      });
      setDashboardData(res.data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  const handleAppointmentAction = (appointment, action) => {
    setSelectedAppointment(appointment);
    setModalAction(action);
    if (action === 'confirm') setQuickStatus('confirmed');
    if (action === 'cancel') setQuickStatus('cancelled');
    setShowModal(true);
  };

  const handleStatusUpdate = async () => {
    try {
      await axios.patch(
        `${API_URL}/api/appointments/${selectedAppointment._id}/status`,
        { status: quickStatus, notes: `Status changed by ${user.firstName} from dashboard` }
      );
      setShowModal(false);
      fetchDashboardData(); // Refresh data
    } catch (err) {
      console.error('Status update failed:', err);
      setError('Failed to update appointment status.');
    }
  };

  const renderAppointmentCard = (apt) => (
    <Card key={apt._id} className="mb-2 appointment-card">
      <Card.Body className="p-3">
        <Row className="align-items-center">
          <Col md={4}>
            <h6 className="mb-1">{apt.patientName}</h6>
            <small className="text-muted">{apt.patientPhone}</small>
          </Col>
          <Col md={3}>
            <div>
              <strong>{format(parseISO(apt.startTime), 'h:mm a')}</strong>
              <small className="text-muted"> - {format(parseISO(apt.endTime), 'h:mm a')}</small>
            </div>
            <small>{format(parseISO(apt.startTime), 'EEE, MMM do')}</small>
          </Col>
          <Col md={2}>
            <Badge bg={STATUS_COLORS[apt.status] || 'secondary'} className="w-100">
              {apt.status?.toUpperCase()}
            </Badge>
          </Col>
          <Col md={3} className="text-end">
            <Button 
              variant="outline-info" 
              size="sm" 
              className="me-1"
              onClick={() => handleAppointmentAction(apt, 'view')}
            >
              View
            </Button>
            {apt.status === 'scheduled' && (
              <>
                <Button 
                  variant="outline-success" 
                  size="sm" 
                  className="me-1"
                  onClick={() => handleAppointmentAction(apt, 'confirm')}
                >
                  Confirm
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => handleAppointmentAction(apt, 'cancel')}
                >
                  Cancel
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

  // Memoized chart data for performance
  const chartConfig = useMemo(() => ({
    barChart: dashboardData.chartData || [],
    pieChart: [
      { name: 'Scheduled', value: dashboardData.stats.scheduledCount || 0 },
      { name: 'Confirmed', value: dashboardData.stats.confirmedCount || 0 },
      { name: 'Completed', value: dashboardData.stats.completedCount || 0 },
      { name: 'Cancelled', value: dashboardData.stats.cancelledCount || 0 },
    ]
  }), [dashboardData]);

  const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading Dashboard...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container fluid className="dashboard-container">
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      {/* Header Row with Stats */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="stat-card text-white bg-primary">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5>{dashboardData.stats.todayCount || 0}</h5>
                  <span>Today's Appointments</span>
                </div>
                <i className="fas fa-calendar-day fa-2x"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card text-white bg-info">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5>{dashboardData.stats.upcomingCount || 0}</h5>
                  <span>Upcoming This Week</span>
                </div>
                <i className="fas fa-calendar-week fa-2x"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card text-white bg-warning">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5>{dashboardData.stats.pendingCount || 0}</h5>
                  <span>Pending Confirmation</span>
                </div>
                <i className="fas fa-clock fa-2x"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card text-white bg-success">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5>{dashboardData.stats.patientCount || 0}</h5>
                  <span>Total Patients</span>
                </div>
                <i className="fas fa-users fa-2x"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Left Column - Charts */}
        <Col lg={8}>
          <Row>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header>
                  <h6 className="mb-0">Appointments This Week</h6>
                </Card.Header>
                <Card.Body>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartConfig.barChart}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="scheduled" fill="#0088FE" name="Scheduled" />
                      <Bar dataKey="confirmed" fill="#00C49F" name="Confirmed" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header>
                  <h6 className="mb-0">Appointment Status Distribution</h6>
                </Card.Header>
                <Card.Body>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={chartConfig.pieChart}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {chartConfig.pieChart.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Today's Appointments Section */}
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Today's Appointments ({format(new Date(), 'MMMM do')})</h6>
              <Badge bg="primary" pill>{dashboardData.todayAppointments?.length || 0}</Badge>
            </Card.Header>
            <Card.Body className="p-0">
              {dashboardData.todayAppointments?.length > 0 ? (
                <ListGroup variant="flush">
                  {dashboardData.todayAppointments.map(apt => (
                    <ListGroup.Item key={apt._id} className="px-3">
                      {renderAppointmentCard(apt)}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="text-center p-4 text-muted">
                  <i className="fas fa-calendar-check fa-2x mb-2"></i>
                  <p>No appointments scheduled for today.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column - Upcoming & Notifications */}
        <Col lg={4}>
          {/* Upcoming Appointments */}
          <Card className="mb-4">
            <Card.Header>
              <h6 className="mb-0">Upcoming Appointments</h6>
            </Card.Header>
            <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {dashboardData.upcomingAppointments?.length > 0 ? (
                dashboardData.upcomingAppointments.map(apt => (
                  <div key={apt._id} className="border-bottom pb-2 mb-2">
                    <div className="d-flex justify-content-between">
                      <strong>{apt.patientName}</strong>
                      <Badge bg={STATUS_COLORS[apt.status] || 'secondary'}>{apt.status}</Badge>
                    </div>
                    <div className="text-muted small">
                      {format(parseISO(apt.startTime), 'EEE, MMM do • h:mm a')}
                    </div>
                    <div className="small">{apt.reason}</div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted py-3">
                  <i className="fas fa-calendar-plus fa-2x mb-2"></i>
                  <p>No upcoming appointments.</p>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Notifications Feed */}
          <Card>
            <Card.Header>
              <h6 className="mb-0">Recent Activity</h6>
            </Card.Header>
            <Card.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {dashboardData.notifications?.length > 0 ? (
                dashboardData.notifications.map(notif => (
                  <div key={notif._id} className="border-bottom pb-2 mb-2">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <p className="mb-1 small">{notif.message}</p>
                        <small className="text-muted">
                          {format(parseISO(notif.createdAt), 'MMM d, h:mm a')}
                        </small>
                      </div>
                      <Badge bg="light" text="dark" className="ms-2">
                        <i className={`fas fa-${notif.type === 'appointment' ? 'calendar-check' : 'user-plus'} fa-sm`}></i>
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted py-3">
                  <i className="fas fa-bell-slash fa-2x mb-2"></i>
                  <p>No recent activity.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Action Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalAction === 'view' && 'Appointment Details'}
            {modalAction === 'confirm' && 'Confirm Appointment'}
            {modalAction === 'cancel' && 'Cancel Appointment'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              {modalAction !== 'view' && (
                <Alert variant={modalAction === 'confirm' ? 'info' : 'warning'}>
                  Are you sure you want to {modalAction} this appointment for{' '}
                  <strong>{selectedAppointment.patientName}</strong> on{' '}
                  {format(parseISO(selectedAppointment.startTime), 'MMMM do, yyyy \'at\' h:mm a')}?
                </Alert>
              )}
              <Row>
                <Col md={6}>
                  <strong>Patient:</strong> {selectedAppointment.patientName}
                </Col>
                <Col md={6}>
                  <strong>Phone:</strong> {selectedAppointment.patientPhone}
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Date & Time:</strong><br />
                  {format(parseISO(selectedAppointment.startTime), 'MMMM do, yyyy \'at\' h:mm a')} -{' '}
                  {format(parseISO(selectedAppointment.endTime), 'h:mm a')}
                </Col>
                <Col md={6}>
                  <strong>Status:</strong>{' '}
                  <Badge bg={STATUS_COLORS[selectedAppointment.status]}>
                    {selectedAppointment.status?.toUpperCase()}
                  </Badge>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <strong>Reason:</strong>
                  <p>{selectedAppointment.reason}</p>
                </Col>
              </Row>
              {modalAction !== 'view' && (
                <Form.Group className="mt-3">
                  <Form.Label>Notes (Optional):</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Add any notes about this status change..." />
                </Form.Group>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          {(modalAction === 'confirm' || modalAction === 'cancel') && (
            <Button 
              variant={modalAction === 'confirm' ? 'success' : 'danger'} 
              onClick={handleStatusUpdate}
            >
              {modalAction === 'confirm' ? 'Confirm Appointment' : 'Cancel Appointment'}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
