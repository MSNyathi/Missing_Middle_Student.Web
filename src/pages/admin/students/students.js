import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../../commponents/adminNavbar';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [sortByAvgAsc, setSortByAvgAsc] = useState(true);
  const [sortByDateAsc, setSortByDateAsc] = useState(true);

  const [facultyFilter, setFacultyFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [programFilter, setProgramFilter] = useState('All');
  const [nsfasFilter, setNsfasFilter] = useState('All');

  // Pagination state
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch('https://localhost:7102/api/Student'); // replace with your real API URL
        const data = await response.json();

        const studentsFromApi = Array.isArray(data) ? data : [data];

        const mappedStudents = studentsFromApi.map((student) => ({
          surname: student.surname || '',
          studentNumber: student.studentNum?.toString() || '',
          faculty: student.faculty || '',
          course: student.courseName || '',
          programType: student.program || '',
          year: `${student.yearOfStudy} Year` || '',
          registrationDate: student.registrationDate
            ? new Date(student.registrationDate).toISOString().split('T')[0]
            : '',
          averageMark: student.averageMark ?? null,
          nsfasStatus: student.nsfasStatus === 'Funded' || student.nsfasStatus === true,
          studentEmail: student.email || '',
          contact: student.contact || '',
          nationality: student.nationality || '',
          Ethnicity: student.ethnicity || '',
          idNumber: student.idNumber || '',
          gender: student.gender || '',
        }));

        setStudents(mappedStudents);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    }

    fetchStudents();
  }, []);

  // Reset page to 1 when filters/search/sorts change
  useEffect(() => {
    setPage(1);
  }, [search, facultyFilter, genderFilter, programFilter, nsfasFilter, sortByAvgAsc, sortByDateAsc]);

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
      if (!sortByAvgAsc) {
        return sortByDateAsc
          ? new Date(a.registrationDate) - new Date(b.registrationDate)
          : new Date(b.registrationDate) - new Date(a.registrationDate);
      }
      return sortByAvgAsc
        ? a.averageMark - b.averageMark
        : b.averageMark - a.averageMark;
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const pagedStudents = filteredStudents.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <AdminNavbar />

      <div className="flex-grow-1 p-4">
        <h1 className="text-2xl font-bold text-center mb-4 text-black">Registered TUT Students</h1>

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
                {pagedStudents.map((student, index) => (
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
                {pagedStudents.length === 0 && (
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

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
          <button
            className="btn btn-outline-primary"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages || 1}
          </span>
          <button
            className="btn btn-outline-primary"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
