// Frontend: src/components/schedule/DoctorSchedulePlanner.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Alert,
  Badge,
  Tabs,
  Tab,
  ListGroup,
  InputGroup,
  Dropdown,
  Spinner
} from 'react-bootstrap';
import {
  Calendar,
  Clock,
  Plus,
  Edit,
  Trash2,
  Save,
  RefreshCw,
  Users,
  Sliders
} from 'react-feather';
import { format, parseISO, addDays, startOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';
import axios from 'axios';
import { API_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';
import './DoctorSchedulePlanner.css';

const DoctorSchedulePlanner = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState({});
  const [availability, setAvailability] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { user } = useAuth();

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      fetchScheduleData();
    }
  }, [selectedDoctor, currentDate]);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(${API_URL}/api/doctors);
      setDoctors(res.data);
      // Auto-select the first doctor or current user if they are a doctor
      const defaultDoctor = user.role === 'doctor' 
        ? res.data.find(d => d._id === user._id) 
        : res.data[0];
      setSelectedDoctor(defaultDoctor);
    } catch (err) {
      setError('Failed to load doctors');
    }
  };

  const fetchScheduleData = async () => {
    try {
      setLoading(true);
      const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
      const endDate = addDays(startDate, 6);

      const [availabilityRes, appointmentsRes] = await Promise.all([
        axios.get(${API_URL}/api/availability/doctor/${selectedDoctor._id}),
        axios.get(${API_URL}/api/appointments, {
          params: {
            doctorId: selectedDoctor._id,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
          }
        })
      ]);

      setAvailability(availabilityRes.data);
      setAppointments(appointmentsRes.data);
      setError('');
    } catch (err) {
      setError('Failed to load schedule data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAvailability = (day, time) => {
    setEditingSlot({
      dayOfWeek: day,
      startTime: time,
      endTime: addMinutes(time, 30), // Default 30-minute slot
      isActive: true,
      maxPatients: 1,
      appointmentType: 'consultation'
    });
    setShowAvailabilityModal(true);
  };

  const handleSaveAvailability = async () => {
    try {
      setSaving(true);
      const url = editingSlot._id 
        ? ${API_URL}/api/availability/${editingSlot._id}
        : ${API_URL}/api/availability;

      const method = editingSlot._id ? 'put' : 'post';
      
      await axios[method](url, {
        ...editingSlot,
        doctor: selectedDoctor._id
      });

      setSuccess('Availability saved successfully!');
      setShowAvailabilityModal(false);
      fetchScheduleData();
    } catch (err) {
      setError('Failed to save availability');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAvailability = async (slotId) => {
    try {
      await axios.delete(${API_URL}/api/availability/${slotId});
      setSuccess('Time slot deleted successfully!');
      fetchScheduleData();
    } catch (err) {
      setError('Failed to delete time slot');
    }
  };

  const renderTimeSlot = (day, time) => {
    const slotAvailability = availability.find(slot => 
      slot.dayOfWeek === day && 
      slot.startTime <= time && 
      slot.endTime > time
    );

    const dayDate = getDateForDay(day);
    const slotAppointments = appointments.filter(apt =>
      isSameDay(parseISO(apt.startTime), dayDate) &&
      format(parseISO(apt.startTime), 'HH:mm') === time
    );

    if (slotAvailability) {
      return (
        <div
          key={${day}-${time}}
          className="time-slot available"
          onClick={() => setEditingSlot(slotAvailability)}
        >
          <Badge bg="success" className="mb-1">
            Available
          </Badge>
          {slotAppointments.length > 0 && (
            <div className="appointment-count">
              <Users size={12} />
              <small>{slotAppointments.length}/{slotAvailability.maxPatients}</small>
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={${day}-${time}}
        className="time-slot unavailable"
        onClick={() => handleAddAvailability(day, time)}
      >
        <Badge bg="secondary">Unavailable</Badge>
      </div>
    );
  };

  const getDateForDay = (day) => {
    const dayIndex = daysOfWeek.indexOf(day);
    return addDays(startOfWeek(currentDate, { weekStartsOn: 1 }), dayIndex);
  };

  const navigateWeek = (direction) => {
    setCurrentDate(prev => direction === 'next' ? addWeeks(prev, 1) : subWeeks(prev, 1));
  };

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container fluid className="schedule-planner">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Schedule Planner</h2>
              <p className="text-muted">Manage doctor availability and appointments</p>
            </div>
            <div className="d-flex gap-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary">
                  <Users size={18} className="me-2" />
                  {selectedDoctor ? Dr. ${selectedDoctor.firstName} ${selectedDoctor.lastName} : 'Select Doctor'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {doctors.map(doctor => (
                    <Dropdown.Item
                      key={doctor._id}
                      onClick={() => setSelectedDoctor(doctor)}
                    >
                      Dr. {doctor.firstName} {doctor.lastName}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Button variant="outline-secondary" onClick={() => navigateWeek('prev')}>
                Previous Week
              </Button>
              <Button variant="outline-primary" disabled>
                {format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'MMM dd')} - 
                {format(addDays(startOfWeek(currentDate, { weekStartsOn: 1 }), 6), 'MMM dd, yyyy')}
              </Button>
              <Button variant="outline-secondary" onClick={() => navigateWeek('next')}>
                Next Week
              </Button>
              <Button variant="outline-secondary" onClick={fetchScheduleData}>
                <RefreshCw size={18} />
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Alerts */}
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

      {/* Schedule Grid */}
      <Card>
        <Card.Body className="p-0">
          <div className="schedule-grid">
            {/* Header Row */}
            <div className="grid-header">
              <div className="time-column">Time</div>
              {daysOfWeek.map(day => (
                <div key={day} className="day-header">
                  <div>{day}</div>
                  <div className="date-label">
                    {format(getDateForDay(day), 'MMM dd')}
                  </div>
                </div>
              ))}
            </div>

            {/* Time Slots */}
            {timeSlots.map(time => (
              <div key={time} className="grid-row">
                <div className="time-column">
                  <Clock size={14} className="me-1" />
                  {time}
                </div>
                {daysOfWeek.map(day => (
                  <div key={${day}-${time}} className="day-cell">
                    {renderTimeSlot(day, time)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Availability Modal */}
      <Modal show={showAvailabilityModal} onHide={() => setShowAvailabilityModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingSlot?._id ? 'Edit Time Slot' : 'Add Time Slot'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingSlot && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Day</Form.Label>
                <Form.Control value={editingSlot.dayOfWeek} disabled />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={editingSlot.startTime}
                      onChange={(e) => setEditingSlot(prev => ({ ...prev, startTime: e.target.value }))}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={editingSlot.endTime}
                      onChange={(e) => setEditingSlot(prev => ({ ...prev, endTime: e.target.value }))}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Appointment Type</Form.Label>
                <Form.Select
                  value={editingSlot.appointmentType}
                  onChange={(e) => setEditingSlot(prev => ({ ...prev, appointmentType: e.target.value }))}
                >
                  <option value="consultation">Consultation</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="emergency">Emergency</option>
                  <option value="procedure">Procedure</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Maximum Patients</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="10"
                  value={editingSlot.maxPatients}
                  onChange={(e) => setEditingSlot(prev => ({ ...prev, maxPatients: parseInt(e.target.value) }))}
                />
              </Form.Group>
              <Form.Check
                type="switch"
                label="Active"
                checked={editingSlot.isActive}
                onChange={(e) => setEditingSlot(prev => ({ ...prev, isActive: e.target.checked }))}
              />
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          {editingSlot?._id && (
            <Button
              variant="outline-danger"
              onClick={() => handleDeleteAvailability(editingSlot._id)}
            >
              <Trash2 size={18} className="me-2" />
              Delete
            </Button>
          )}
          <Button variant="secondary" onClick={() => setShowAvailabilityModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveAvailability} disabled={saving}>
            {saving && <Spinner animation="border" size="sm" className="me-2" />}
            <Save size={18} className="me-2" />
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

// Helper function to add minutes to time string
function addMinutes(time, minutes) {
  const [hours, mins] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, mins + minutes, 0, 0);
  return format(date, 'HH:mm');
}

export default DoctorSchedulePlanner;
