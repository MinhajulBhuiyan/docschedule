// Frontend: src/components/booking/AppointmentBookingWizard.js
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Modal,
  Badge,
  Spinner,
  InputGroup,
  ListGroup,
  Accordion,
  Tab,
  Nav
} from 'react-bootstrap';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Info,
  CreditCard,
  FileText,
  Shield
} from 'react-feather';
import { format, parseISO, addMinutes, isBefore, isAfter, isToday } from 'date-fns';
import axios from 'axios';
import { API_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';
import './AppointmentBookingWizard.css';

const AppointmentBookingWizard = ({ show, onClose, prefillData = {} }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientSearch, setPatientSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showPatientSearch, setShowPatientSearch] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    step1: {
      serviceType: '',
      doctorId: '',
      reason: '',
      urgency: 'routine'
    },
    step2: {
      date: '',
      time: ''
    },
    step3: {
      patientType: 'new', // 'new' or 'existing'
      patientId: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      insurance: {
        provider: '',
        policyNumber: '',
        groupNumber: ''
      }
    },
    step4: {
      notes: '',
      reminders: true,
      consent: false,
      terms: false
    }
  });

  const totalSteps = 4;
  const { user } = useAuth();

  // Prefill form data if provided
  useEffect(() => {
    if (prefillData.patientId) {
      setFormData(prev => ({
        ...prev,
        step3: {
          ...prev.step3,
          patientType: 'existing',
          patientId: prefillData.patientId,
          firstName: prefillData.firstName || '',
          lastName: prefillData.lastName || '',
          email: prefillData.email || '',
          phone: prefillData.phone || ''
        }
      }));
    }
  }, [prefillData]);

  // Fetch doctors and services on mount
  useEffect(() => {
    if (show) {
      fetchDoctorsAndServices();
    }
  }, [show]);

  // Fetch available slots when date or doctor changes
  useEffect(() => {
    if (formData.step1.doctorId && formData.step2.date) {
      fetchAvailableSlots();
    }
  }, [formData.step1.doctorId, formData.step2.date]);

  const fetchDoctorsAndServices = async () => {
    try {
      setLoading(true);
      const [doctorsRes, servicesRes] = await Promise.all([
        axios.get(${API_URL}/api/doctors?available=true),
        axios.get(${API_URL}/api/services)
      ]);
      setDoctors(doctorsRes.data);
      setServices(servicesRes.data);
    } catch (err) {
      setError('Failed to load booking options');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      setLoading(true);
      const res = await axios.get(${API_URL}/api/availability/slots, {
        params: {
          doctorId: formData.step1.doctorId,
          date: formData.step2.date,
          serviceType: formData.step1.serviceType
        }
      });
      setAvailableSlots(res.data);
    } catch (err) {
      setError('Failed to load available time slots');
    } finally {
      setLoading(false);
    }
  };

  const searchPatients = async (searchTerm) => {
    if (searchTerm.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await axios.get(${API_URL}/api/patients/search, {
        params: { q: searchTerm }
      });
      setSearchResults(res.data);
    } catch (err) {
      console.error('Patient search failed:', err);
    }
  };

  const selectPatient = (patient) => {
    setFormData(prev => ({
      ...prev,
      step3: {
        ...prev.step3,
        patientType: 'existing',
        patientId: patient._id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        phone: patient.phone,
        dateOfBirth: patient.dateOfBirth || '',
        gender: patient.gender || '',
        address: patient.address || { street: '', city: '', state: '', zipCode: '' },
        insurance: patient.insurance || { provider: '', policyNumber: '', groupNumber: '' }
      }
    }));
    setShowPatientSearch(false);
    setPatientSearch('');
    setSearchResults([]);
  };

  const handleInputChange = (step, field, value) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value
      }
    }));
  };

  const handleNestedInputChange = (step, parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [parent]: {
          ...prev[step][parent],
          [field]: value
        }
      }
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.step1.serviceType && formData.step1.doctorId && formData.step1.reason;
      case 2:
        return formData.step2.date && formData.step2.time;
      case 3:
        if (formData.step3.patientType === 'existing') {
          return formData.step3.patientId;
        }
        return formData.step3.firstName && formData.step3.lastName && 
               formData.step3.email && formData.step3.phone;
      case 4:
        return formData.step4.consent && formData.step4.terms;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      setError('');
    } else {
      setError('Please complete all required fields before continuing');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError('');

      const appointmentData = {
        ...formData.step1,
        ...formData.step2,
        patient: formData.step3.patientType === 'existing' ? {
          patientId: formData.step3.patientId
        } : {
          firstName: formData.step3.firstName,
          lastName: formData.step3.lastName,
          email: formData.step3.email,
          phone: formData.step3.phone,
          dateOfBirth: formData.step3.dateOfBirth,
          gender: formData.step3.gender,
          address: formData.step3.address,
          insurance: formData.step3.insurance
        },
        notes: formData.step4.notes,
        reminders: formData.step4.reminders,
        status: 'scheduled'
      };

      const res = await axios.post(${API_URL}/api/appointments, appointmentData);
      
      setSuccess('Appointment booked successfully!');
      setTimeout(() => {
        onClose();
        setCurrentStep(1);
        setFormData({
          step1: { serviceType: '', doctorId: '', reason: '', urgency: 'routine' },
          step2: { date: '', time: '' },
          step3: {
            patientType: 'new',
            patientId: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            dateOfBirth: '',
            gender: '',
            address: { street: '', city: '', state: '', zipCode: '' },
            insurance: { provider: '', policyNumber: '', groupNumber: '' }
          },
          step4: { notes: '', reminders: true, consent: false, terms: false }
        });
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="step-indicator">
      {[1, 2, 3, 4].map(step => (
        <div key={step} className={step ${currentStep === step ? 'active' : ''} ${step < currentStep ? 'completed' : ''}}>
          <div className="step-number">{step}</div>
          <div className="step-label">
            {step === 1 && 'Service'}
            {step === 2 && 'Time'}
            {step === 3 && 'Patient'}
            {step === 4 && 'Confirm'}
          </div>
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="booking-step">
      <h4>Select Service & Doctor</h4>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Service Type *</Form.Label>
            <Form.Select
              value={formData.step1.serviceType}
              onChange={(e) => handleInputChange('step1', 'serviceType', e.target.value)}
              required
            >
              <option value="">Select a service</option>
              {services.map(service => (
                <option key={service._id} value={service._id}>
                  {service.name} - ${service.price}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Select Doctor *</Form.Label>
            <Form.Select
              value={formData.step1.doctorId}
              onChange={(e) => handleInputChange('step1', 'doctorId', e.target.value)}
              required
            >
              <option value="">Select a doctor</option>
              {doctors.map(doctor => (
                <option key={doctor._id} value={doctor._id}>
                  Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialty}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      
      <Form.Group className="mb-3">
        <Form.Label>Reason for Visit *</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Please describe your symptoms or reason for the appointment"
          value={formData.step1.reason}
          onChange={(e) => handleInputChange('step1', 'reason', e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Urgency Level</Form.Label>
        <div>
          <Form.Check
            inline
            type="radio"
            label="Routine"
            name="urgency"
            value="routine"
            checked={formData.step1.urgency === 'routine'}
            onChange={(e) => handleInputChange('step1', 'urgency', e.target.value)}
          />
          <Form.Check
            inline
            type="radio"
            label="Urgent"
            name="urgency"
            value="urgent"
            checked={formData.step1.urgency === 'urgent'}
            onChange={(e) => handleInputChange('step1', 'urgency', e.target.value)}
          />
          <Form.Check
            inline
            type="radio"
            label="Emergency"
            name="urgency"
            value="emergency"
            checked={formData.step1.urgency === 'emergency'}
            onChange={(e) => handleInputChange('step1', 'urgency', e.target.value)}
          />
        </div>
      </Form.Group>
    </div>
  );

  const renderStep2 = () => (
    <div className="booking-step">
      <h4>Select Date & Time</h4>
      <Row>
        <Col md={5}>
          <Form.Group className="mb-4">
            <Form.Label>Select Date *</Form.Label>
            <Form.Control
              type="date"
              value={formData.step2.date}
              onChange={(e) => handleInputChange('step2', 'date', e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
              required
            />
          </Form.Group>

          {formData.step2.date && (
            <Card>
              <Card.Header>
                <h6 className="mb-0">Selected Doctor</h6>
              </Card.Header>
              <Card.Body>
                {doctors.find(d => d._id === formData.step1.doctorId) && (
                  <>
                    <h6>Dr. {doctors.find(d => d._id === formData.step1.doctorId).firstName} {' '}
                    {doctors.find(d => d._id === formData.step1.doctorId).lastName}</h6>
                    <p className="text-muted mb-0">
                      {doctors.find(d => d._id === formData.step1.doctorId).specialty}
                    </p>
                  </>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col md={7}>
          <Form.Label>Available Time Slots *</Form.Label>
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading available slots...</p>
            </div>
          ) : availableSlots.length > 0 ? (
            <div className="time-slots-grid">
              {availableSlots.map(slot => (
                <Button
                  key={slot.startTime}
                  variant={formData.step2.time === slot.startTime ? 'primary' : 'outline-primary'}
                  className="time-slot-btn"
                  onClick={() => {
                    handleInputChange('step2', 'time', slot.startTime);
                    setSelectedSlot(slot);
                  }}
                >
                  <Clock size={16} className="me-2" />
                  {format(parseISO(slot.startTime), 'h:mm a')}
                </Button>
              ))}
            </div>
          ) : (
            <Alert variant="info">
              <Info size={20} className="me-2" />
              No available slots for this date. Please choose another date.
            </Alert>
          )}
        </Col>
      </Row>

      {selectedSlot && (
        <Alert variant="light" className="mt-3">
          <strong>Selected Appointment:</strong><br />
          {format(parseISO(selectedSlot.startTime), 'EEEE, MMMM do, yyyy')} at{' '}
          {format(parseISO(selectedSlot.startTime), 'h:mm a')} -{' '}
          {format(addMinutes(parseISO(selectedSlot.startTime), selectedSlot.duration), 'h:mm a')}
          <br />
          <small className="text-muted">
            Duration: {selectedSlot.duration} minutes | 
            Type: {selectedSlot.appointmentType}
          </small>
        </Alert>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="booking-step">
      <h4>Patient Information</h4>
      
      <Form.Group className="mb-4">
        <Form.Label>Patient Type *</Form.Label>
        <div>
          <Form.Check
            inline
            type="radio"
            label="New Patient"
            name="patientType"
            value="new"
            checked={formData.step3.patientType === 'new'}
            onChange={(e) => handleInputChange('step3', 'patientType', e.target.value)}
          />
          <Form.Check
            inline
            type="radio"
            label="Existing Patient"
            name="patientType"
            value="existing"
            checked={formData.step3.patientType === 'existing'}
            onChange={(e) => handleInputChange('step3', 'patientType', e.target.value)}
          />
        </div>
      </Form.Group>

      {formData.step3.patientType === 'existing' ? (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Search Existing Patient *</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by name, email, or phone number"
                value={patientSearch}
                onChange={(e) => {
                  setPatientSearch(e.target.value);
                  searchPatients(e.target.value);
                }}
                onFocus={() => setShowPatientSearch(true)}
              />
              <Button variant="outline-secondary">
                <User size={18} />
              </Button>
            </InputGroup>

            {showPatientSearch && searchResults.length > 0 && (
              <Card className="mt-2">
                <Card.Body className="p-2">
                  <ListGroup variant="flush">
                    {searchResults.map(patient => (
                      <ListGroup.Item
                        key={patient._id}
                        action
                        onClick={() => selectPatient(patient)}
                        className="py-2"
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{patient.firstName} {patient.lastName}</strong>
                            <br />
                            <small className="text-muted">
                              {patient.email} | {patient.phone}
                            </small>
                          </div>
                          <Badge bg="light" text="dark">
                            {patient.gender || 'N/A'} | {patient.dateOfBirth ? format(parseISO(patient.dateOfBirth), 'MM/dd/yyyy') : 'No DOB'}
                          </Badge>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            )}
          </Form.Group>

          {formData.step3.patientId && (
            <Alert variant="success">
              <CheckCircle size={20} className="me-2" />
              Patient selected: <strong>{formData.step3.firstName} {formData.step3.lastName}</strong>
            </Alert>
          )}
        </>
      ) : (
        <Tab.Container defaultActiveKey="basic">
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="basic">Basic Info</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="contact">Contact Details</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="insurance">Insurance</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="basic">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name *</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.step3.firstName}
                      onChange={(e) => handleInputChange('step3', 'firstName', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name *</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.step3.lastName}
                      onChange={(e) => handleInputChange('step3', 'lastName', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      value={formData.step3.dateOfBirth}
                      onChange={(e) => handleInputChange('step3', 'dateOfBirth', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      value={formData.step3.gender}
                      onChange={(e) => handleInputChange('step3', 'gender', e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Tab.Pane>

            <Tab.Pane eventKey="contact">
              <Form.Group className="mb-3">
                <Form.Label>Email Address *</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.step3.email}
                  onChange={(e) => handleInputChange('step3', 'email', e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number *</Form.Label>
                <Form.Control
                  type="tel"
                  value={formData.step3.phone}
                  onChange={(e) => handleInputChange('step3', 'phone', e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder="Street address"
                  value={formData.step3.address.street}
                  onChange={(e) => handleNestedInputChange('step3', 'address', 'street', e.target.value)}
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Control
                    placeholder="City"
                    value={formData.step3.address.city}
                    onChange={(e) => handleNestedInputChange('step3', 'address', 'city', e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Control
                    placeholder="State"
                    value={formData.step3.address.state}
                    onChange={(e) => handleNestedInputChange('step3', 'address', 'state', e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Control
                    placeholder="ZIP"
                    value={formData.step3.address.zipCode}
                    onChange={(e) => handleNestedInputChange('step3', 'address', 'zipCode', e.target.value)}
                  />
                </Col>
              </Row>
            </Tab.Pane>

            <Tab.Pane eventKey="insurance">
              <Form.Group className="mb-3">
                <Form.Label>Insurance Provider</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., Blue Cross, Aetna, etc."
                  value={formData.step3.insurance.provider}
                  onChange={(e) => handleNestedInputChange('step3', 'insurance', 'provider', e.target.value)}
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Policy Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.step3.insurance.policyNumber}
                      onChange={(e) => handleNestedInputChange('step3', 'insurance', 'policyNumber', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Group Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.step3.insurance.groupNumber}
                      onChange={(e) => handleNestedInputChange('step3', 'insurance', 'groupNumber', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="booking-step">
      <h4>Review & Confirm</h4>
      
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">Appointment Summary</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h6>Appointment Details</h6>
              <p>
                <strong>Date:</strong> {formData.step2.date ? format(parseISO(formData.step2.date), 'EEEE, MMMM do, yyyy') : 'N/A'}<br />
                <strong>Time:</strong> {formData.step2.time ? format(parseISO(formData.step2.time), 'h:mm a') : 'N/A'}<br />
                <strong>Duration:</strong> {selectedSlot?.duration || 'N/A'} minutes<br />
                <strong>Service:</strong> {services.find(s => s._id === formData.step1.serviceType)?.name || 'N/A'}<br />
                <strong>Reason:</strong> {formData.step1.reason}
              </p>
            </Col>
            <Col md={6}>
              <h6>Doctor Information</h6>
              {doctors.find(d => d._id === formData.step1.doctorId) && (
                <p>
                  <strong>Doctor:</strong> Dr. {doctors.find(d => d._id === formData.step1.doctorId).firstName}{' '}
                  {doctors.find(d => d._id === formData.step1.doctorId).lastName}<br />
                  <strong>Specialty:</strong> {doctors.find(d => d._id === formData.step1.doctorId).specialty}<br />
                  <strong>Department:</strong> {doctors.find(d => d._id === formData.step1.doctorId).department || 'N/A'}
                </p>
              )}
            </Col>
          </Row>

          <hr />

          <h6>Patient Information</h6>
          <p>
            <strong>Name:</strong> {formData.step3.firstName} {formData.step3.lastName}<br />
            <strong>Email:</strong> {formData.step3.email}<br />
            <strong>Phone:</strong> {formData.step3.phone}<br />
            <strong>Type:</strong> {formData.step3.patientType === 'existing' ? 'Existing Patient' : 'New Patient'}
          </p>
        </Card.Body>
      </Card>

      <Form.Group className="mb-3">
        <Form.Label>Additional Notes (Optional)</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Any special requests or additional information..."
          value={formData.step4.notes}
          onChange={(e) => handleInputChange('step4', 'notes', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Send me appointment reminders via email and SMS"
          checked={formData.step4.reminders}
          onChange={(e) => handleInputChange('step4', 'reminders', e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="I consent to receive medical treatment and understand the risks involved"
          checked={formData.step4.consent}
          onChange={(e) => handleInputChange('step4', 'consent', e.target.checked)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="I agree to the terms of service and privacy policy"
          checked={formData.step4.terms}
          onChange={(e) => handleInputChange('step4', 'terms', e.target.checked)}
          required
        />
      </Form.Group>
    </div>
  );

  return (
    <Modal show={show} onHide={onClose} size="lg" centered className="booking-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          <Calendar size={24} className="me-2" />
          Book New Appointment
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {renderStepIndicator()}
        
        {error && (
          <Alert variant="danger" className="mt-3">
            <XCircle size={20} className="me-2" />
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" className="mt-3">
            <CheckCircle size={20} className="me-2" />
            {success}
          </Alert>
        )}

        <div className="step-content mt-4">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className="d-flex justify-content-between w-100">
          <Button
            variant="outline-secondary"
            onClick={currentStep === 1 ? onClose : prevStep}
            disabled={submitting}
          >
            <ChevronLeft size={18} className="me-1" />
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>

          {currentStep < totalSteps ? (
            <Button
              variant="primary"
              onClick={nextStep}
              disabled={!validateStep(currentStep) || loading}
            >
              Next
              <ChevronRight size={18} className="ms-1" />
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={handleSubmit}
              disabled={!validateStep(currentStep) || submitting}
            >
              {submitting ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Booking...
                </>
              ) : (
                <>
                  <CheckCircle size={18} className="me-2" />
                  Confirm Booking
                </>
              )}
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentBookingWizard;
