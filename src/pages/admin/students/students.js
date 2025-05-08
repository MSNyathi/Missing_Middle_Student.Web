import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../../commponents/adminNavbar';
import backgroundImage from '../../../assets/backgroundAdmin.jpeg';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [sortByAvgAsc, setSortByAvgAsc] = useState(true);
  const [sortByDateAsc, setSortByDateAsc] = useState(true);

  const [facultyFilter, setFacultyFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [programFilter, setProgramFilter] = useState('All');
  const [nsfasFilter, setNsfasFilter] = useState('All');

  useEffect(() => {
    const dummyData = [
      {
        surname: 'Mokoena',
        studentNumber: '218123456',
        faculty: 'ICT',
        course: 'Information Technology',
        programType: 'Diploma',
        year: '3rd Year',
        registrationDate: '2022-01-15',
        averageMark: 72,
        nsfasStatus: true,
        studentEmail: '218123456@tut4life.ac.za',
        contact: '073 456 7890',
        nationality: 'South African',
        Ethnicity: 'African',
        idNumber: '9901185919081',
        gender: 'Female',
      },
      {
        surname: 'Naidoo',
        studentNumber: '218654321',
        faculty: 'Engineering',
        course: 'Electrical Engineering',
        programType: 'Advanced Diploma',
        year: '4th Year',
        registrationDate: '2021-02-10',
        averageMark: 80,
        nsfasStatus: false,
        studentEmail: '218654321@tut4life.ac.za',
        contact: '082 123 4567',
        nationality: 'South African',
        Ethnicity: 'Indian',
        idNumber: '9802195919081',
        gender: 'Male',
      },
      {
        surname: 'Smith',
        studentNumber: '219987654',
        faculty: 'Business',
        course: 'Business Administration',
        programType: 'Diploma',
        year: '2nd Year',
        registrationDate: '2023-03-01',
        averageMark: 68,
        nsfasStatus: true,
        studentEmail: '219987654@tut4life.ac.za',
        contact: '074 321 6789',
        nationality: 'Zimbabwean',
        Ethnicity: 'White',
        idNumber: '0001185919081',
        gender: 'Female',
      },
    ];
    setStudents(dummyData);
  }, []);

  const filteredStudents = students
    .filter((student) =>
      Object.values(student).join(' ').toLowerCase().includes(search.toLowerCase())
    )
    .filter((student) => {
      return (
        (facultyFilter === 'All' || student.faculty === facultyFilter) &&
        (genderFilter === 'All' || student.gender === genderFilter) &&
        (programFilter === 'All' || student.programType === programFilter) &&
        (nsfasFilter === 'All' ||
          (nsfasFilter === 'Funded' && student.nsfasStatus) ||
          (nsfasFilter === 'Not Funded' && !student.nsfasStatus))
      );
    })
    .sort((a, b) => {
      // First sort by registration date if toggled
      if (!sortByAvgAsc) {
        return sortByDateAsc
          ? new Date(a.registrationDate) - new Date(b.registrationDate)
          : new Date(b.registrationDate) - new Date(a.registrationDate);
      }
      // Otherwise sort by average
      return sortByAvgAsc
        ? a.averageMark - b.averageMark
        : b.averageMark - a.averageMark;
    });

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    color: 'white',
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <AdminNavbar />

      <div style={backgroundStyle} className="flex-grow-1 p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Registered TUT Students</h1>

        {/* Filters */}
        <div className="d-flex justify-content-center flex-wrap mb-3 gap-2">
          <input
            type="text"
            placeholder="Search students..."
            className="form-control w-25"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select w-auto"
            value={facultyFilter}
            onChange={(e) => setFacultyFilter(e.target.value)}
          >
            <option>All</option>
            <option>ICT</option>
            <option>Engineering</option>
            <option>Business</option>
          </select>
          <select
            className="form-select w-auto"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option>All</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <select
            className="form-select w-auto"
            value={programFilter}
            onChange={(e) => setProgramFilter(e.target.value)}
          >
            <option>All</option>
            <option>Diploma</option>
            <option>Advanced Diploma</option>
          </select>
          <select
            className="form-select w-auto"
            value={nsfasFilter}
            onChange={(e) => setNsfasFilter(e.target.value)}
          >
            <option>All</option>
            <option>Funded</option>
            <option>Not Funded</option>
          </select>
        </div>

        {/* Sort Buttons */}
        <div className="d-flex justify-content-center mb-4 gap-3">
          <button
            onClick={() => {
              setSortByAvgAsc(!sortByAvgAsc);
              setSortByDateAsc(false);
            }}
            className="btn btn-outline-primary"
          >
            Sort by Avg: {sortByAvgAsc ? 'Low → High' : 'High → Low'}
          </button>
          <button
            onClick={() => {
              setSortByDateAsc(!sortByDateAsc);
              setSortByAvgAsc(false);
            }}
            className="btn btn-outline-info"
          >
            Sort by Reg Date: {sortByDateAsc ? 'Oldest → Newest' : 'Newest → Oldest'}
          </button>
        </div>

        {/* Table */}
        <div className="d-flex justify-content-center">
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center w-auto">
              <thead className="table-dark">
                <tr>
                  <th>Surname</th>
                  <th>Student Number</th>
                  <th>ID Number</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Race</th>
                  <th>Faculty</th>
                  <th>Course</th>
                  <th>Program</th>
                  <th>Year</th>
                  <th>Registration Date</th>
                  <th>NSFAS Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={index}>
                    <td>{student.surname}</td>
                    <td>{student.studentNumber}</td>
                    <td>{student.idNumber}</td>
                    <td>{student.gender}</td>
                    <td>{student.studentEmail}</td>
                    <td>{student.contact}</td>
                    <td>{student.Ethnicity}</td>
                    <td>{student.faculty}</td>
                    <td>{student.course}</td>
                    <td>{student.programType}</td>
                    <td>{student.year}</td>
                    <td>{student.registrationDate}</td>
                    <td>{student.nsfasStatus ? 'Funded' : 'Not Funded'}</td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="13" className="text-muted py-2">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
