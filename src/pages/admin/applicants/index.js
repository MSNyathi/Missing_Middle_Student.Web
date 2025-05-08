import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../../commponents/adminNavbar';
import { Form, Table, Image, Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import backgroundImage from '../../../assets/backgroundAdmin.jpeg'

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
    proofOfIncomeUrl: 'https://via.placeholder.com/400x300?text=Proof+of+Income',
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
    proofOfIncomeUrl: 'https://via.placeholder.com/400x300?text=Proof+of+Income',
  },
];

const ApplicantsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const correctAdminPassword = 'admin123';
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    color: 'white',
  };

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

  const handlePasswordPrompt = async (actionType) => {
    const { value: password } = await Swal.fire({
      title: `Enter Admin Password to ${actionType}`,
      input: 'password',
      inputLabel: 'Password',
      inputPlaceholder: 'Enter your password',
      showCancelButton: true,
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off',
      },
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
    setShowModal(false); // Close modal before prompt
    setTimeout(async () => {
      const isValid = await handlePasswordPrompt('Approve');
      if (isValid) {
        Swal.fire('Approved', `${selectedApplicant.name} has been approved.`, 'success');
      } else {
        setShowModal(true); // Reopen if canceled or failed
      }
    }, 300); // slight delay to ensure modal closes cleanly
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
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.studentNum.includes(searchTerm);
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'eligible' && applicant.eligible) ||
      (filterStatus === 'not_eligible' && !applicant.eligible);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="d-flex">
      <AdminNavbar />
      <div style={backgroundStyle} className="flex-grow-1 p-4 overflow-auto">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Applicants</h2>
          <div className="d-flex align-items-center gap-3">
            <span className=" text-white">{currentTime}</span>
            <Image
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              roundedCircle
              alt="Profile"
              width={32}
              height={32}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 mb-2">
            <Form.Control
              type="text"
              placeholder="Search by name or student number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <Form.Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="eligible">Eligible</option>
              <option value="not_eligible">Not Eligible</option>
            </Form.Select>
          </div>
        </div>

        <Table striped bordered hover responsive>
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
              <tr
                key={applicant.id}
                onClick={() => handleRowClick(applicant)}
                style={{ cursor: 'pointer' }}
              >
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

        {filteredApplicants.length === 0 && (
          <div className="alert alert-warning mt-3">
            No applicants match your search or filter criteria.
          </div>
        )}

        {/* Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Applicant Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedApplicant && (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Name:</strong> {selectedApplicant.name}</p>
                    <p><strong>Student #:</strong> {selectedApplicant.studentNum}</p>
                    <p><strong>Course:</strong> {selectedApplicant.courseName}</p>
                    <p><strong>Email:</strong> {selectedApplicant.email}</p>
                    <p><strong>Contact:</strong> {selectedApplicant.contact}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Faculty:</strong> {selectedApplicant.faculty}</p>
                    <p><strong>Campus:</strong> {selectedApplicant.campus}</p>
                    <p><strong>NSFAS Status:</strong> {selectedApplicant.nsfasStatus}</p>
                    <p><strong>Year:</strong> {selectedApplicant.yearOfStudy}</p>
                    <p><strong>Ethnicity:</strong> {selectedApplicant.ethnicity}</p>
                  </div>
                </div>
                <hr />
                <h5>Proof of Income</h5>
                <Image src={selectedApplicant.proofOfIncomeUrl} fluid rounded />
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleReject}>Reject</Button>
            <Button variant="success" onClick={handleApprove}>Approve</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ApplicantsPage;
