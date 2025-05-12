import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../../commponents/adminNavbar';
import { Form, Table, Image, Modal, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import backgroundImage from '../../../assets/backgroundAdmin.jpeg';
import './index.css';

const mockApplicants = [
  {
    id: 1,
    studentNum: '21900123',
    initials: 'JD',
    name: 'John Doe',
    courseName: 'ND: IT',
    faculty: 'ICT',
    campus: 'Pretoria',
    email: 'john@example.com',
    contact: '0821234567',
    nationality: 'South African',
    nsfasStatus: 'Unfunded',
    yearOfStudy: '1st Year',
    ethnicity: 'Black',
    averageMark: 72,
    eligible: true,
    proofOfIncomeUrl: 'https://via.placeholder.com/600x400?text=Proof+of+Income',
  },
  {
    id: 2,
    studentNum: '21900456',
    initials: 'SS',
    name: 'Sarah Smith',
    courseName: 'ND: Accounting',
    faculty: 'Business',
    campus: 'Soshanguve South',
    email: 'sarah@example.com',
    contact: '0831234567',
    nationality: 'South African',
    nsfasStatus: 'Funded',
    yearOfStudy: '2nd Year',
    ethnicity: 'White',
    averageMark: 58,
    eligible: false,
    proofOfIncomeUrl: 'https://via.placeholder.com/600x400?text=Proof+of+Income',
  },
];

const ApplicantsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const correctAdminPassword = 'admin123';
  const adminName = 'Xolane Shabalala';
  const adminEmail = 'admin@example.com';
  const adminRole = 'Super Admin';
  const adminInitials = 'XS';
  const [showSettings, setShowSettings] = useState(false);
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleRowClick = (applicant) => {
    setSelectedApplicant(applicant);
    setShowModal(true);
  };
   const handlePasswordChange = () => {
    if (currentPwd !== correctAdminPassword) {
      Swal.fire('Error', 'Incorrect current password.', 'error');
      return;
    }
    if (newPwd !== confirmPwd || newPwd.length < 6) {
      Swal.fire('Error', 'Passwords do not match or are too short.', 'error');
      return;
    }
    Swal.fire('Success', 'Password updated successfully.', 'success');
    setShowSettings(false);
    setCurrentPwd('');
    setNewPwd('');
    setConfirmPwd('');
  };

  const handlePasswordPrompt = async (actionType) => {
    const { value: password } = await Swal.fire({
      title: `Enter Admin Password to ${actionType}`,
      input: 'password',
      inputLabel: 'Password',
      inputPlaceholder: 'Enter your password',
      showCancelButton: true,
    });

    if (!password) {
      Swal.fire('Error', 'Password cannot be empty.', 'error');
      return false;
    }

    if (password !== correctAdminPassword) {
      Swal.fire('Incorrect Password', 'You entered an invalid password.', 'error');
      return false;
    }

    return true;
  };

  const handleApprove = async () => {
    setShowModal(false);
    setTimeout(async () => {
      const isValid = await handlePasswordPrompt('Approve');
      if (isValid) {
        Swal.fire('Approved', `${selectedApplicant.name} has been approved.`, 'success');
      } else {
        setShowModal(true);
      }
    }, 300);
  };

  const handleReject = async () => {
    setShowModal(false);
    setTimeout(async () => {
      const isValid = await handlePasswordPrompt('Reject');
      if (isValid) {
        Swal.fire('Rejected', `${selectedApplicant.name} has been rejected.`, 'success');
      } else {
        setShowModal(true);
      }
    }, 300);
  };

  const filteredApplicants = mockApplicants.filter((applicant) => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) || applicant.studentNum.includes(searchTerm);
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'eligible' && applicant.eligible) ||
      (filterStatus === 'not_eligible' && !applicant.eligible);
    return matchesSearch && matchesFilter;
  });

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    color: 'white',
  };

  return (
    <div className="d-flex">
      <AdminNavbar />
      <div style={backgroundStyle} className="flex-grow-1 p-4">
        <Container className="bg-white bg-opacity-75 p-4 rounded shadow-lg">
          <Row className="mb-4">
            <Col className="d-flex justify-content-between align-items-center">
              <h2 className="text-dark mb-0">Applicants</h2>
              <div className="d-flex align-items-center gap-3">
                <span className="text-dark">{currentTime}</span>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  roundedCircle
                  alt="Profile"
                  width={32}
                  height={32}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowProfileModal(true)}
                />
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6} className="mb-2">
              <Form.Control
                type="text"
                placeholder="Search by name or student number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All</option>
                <option value="eligible">Eligible</option>
                <option value="not_eligible">Not Eligible</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col xs={12}>
              <div className="table-responsive">
                <Table bordered hover className="text-center align-middle shadow-sm bg-white rounded table-3d">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Student #</th>
                      <th>Initials</th>
                      <th>Name</th>
                      <th>Course</th>
                      <th>Faculty</th>
                      <th>Campus</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Nationality</th>
                      <th>NSFAS</th>
                      <th>Year</th>
                      <th>Ethnicity</th>
                      <th>Avg. Mark</th>
                      <th>Eligibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplicants.map((applicant, index) => (
                      <tr key={applicant.id} onClick={() => handleRowClick(applicant)} style={{ cursor: 'pointer' }}>
                        <td>{index + 1}</td>
                        <td>{applicant.studentNum}</td>
                        <td>{applicant.initials}</td>
                        <td>{applicant.name}</td>
                        <td>{applicant.courseName}</td>
                        <td>{applicant.faculty}</td>
                        <td>{applicant.campus}</td>
                        <td>{applicant.email}</td>
                        <td>{applicant.contact}</td>
                        <td>{applicant.nationality}</td>
                        <td>{applicant.nsfasStatus}</td>
                        <td>{applicant.yearOfStudy}</td>
                        <td>{applicant.ethnicity}</td>
                        <td>{applicant.averageMark}%</td>
                        <td>
                          <span className={`badge ${applicant.eligible ? 'bg-success' : 'bg-danger'}`}>
                            {applicant.eligible ? 'Eligible' : 'Not Eligible'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>

          {filteredApplicants.length === 0 && (
            <div className="alert alert-warning text-center">No applicants match your search or filter criteria.</div>
          )}
        </Container>

        {/* Applicant Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
          <Modal.Header closeButton className="bg-light bg-opacity-75 shadow-sm">
            <Modal.Title>Applicant Information</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-white bg-opacity-75 shadow-lg rounded-4 p-4 typing-text">
            {selectedApplicant && (
              <>
                <Row>
                  <Col md={6}>
                    <p><strong>Name:</strong> {selectedApplicant.name}</p>
                    <p><strong>Student #:</strong> {selectedApplicant.studentNum}</p>
                    <p><strong>Course:</strong> {selectedApplicant.courseName}</p>
                    <p><strong>Email:</strong> {selectedApplicant.email}</p>
                    <p><strong>Contact:</strong> {selectedApplicant.contact}</p>
                  </Col>
                  <Col md={6}>
                    <p><strong>Faculty:</strong> {selectedApplicant.faculty}</p>
                    <p><strong>Campus:</strong> {selectedApplicant.campus}</p>
                    <p><strong>NSFAS Status:</strong> {selectedApplicant.nsfasStatus}</p>
                    <p><strong>Year:</strong> {selectedApplicant.yearOfStudy}</p>
                    <p><strong>Ethnicity:</strong> {selectedApplicant.ethnicity}</p>
                  </Col>
                </Row>
                <hr />
                <h5>Proof of Income</h5>
                <a href={selectedApplicant.proofOfIncomeUrl} target="_blank" rel="noopener noreferrer">
                  <Image src={selectedApplicant.proofOfIncomeUrl} fluid rounded style={{ maxHeight: '300px' }} />
                </a>
              </>
            )}
          </Modal.Body>
          <Modal.Footer className="bg-light bg-opacity-75 shadow-sm">
            <Button variant="danger" onClick={handleReject}>Reject</Button>
            <Button variant="success" onClick={handleApprove}>Approve</Button>
          </Modal.Footer>
        </Modal>

        {/* Admin Profile Modal */}
        <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
          <Modal.Header closeButton className="bg-light bg-opacity-75 shadow-sm">
            <Modal.Title>Admin Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center bg-white bg-opacity-75 shadow-lg rounded-4 p-4">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              roundedCircle
              width={100}
              height={100}
              className="mb-3"
            />
            <div className='typing-text'>
            <h5 className='typing-text'>Admin Name: {adminName}</h5>
            <p>Email: {adminEmail}</p>
            <p>Role: {adminRole}</p>
            <p>Last Login: {currentTime}</p>
            <p>Initials: {adminInitials}</p>
            <p>Contact: 0761981783</p>
            </div>
            <Button
            variant="outline-secondary"
            className="mt-3"
            onClick={() => setShowSettings(!showSettings)}
          >
            ⚙️ Settings
          </Button>
          {showSettings && (
            <Form className="mt-3 text-start">
              <Form.Group className="mb-2">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handlePasswordChange}>
                Update Password
              </Button>
            </Form>
          )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default ApplicantsPage;
