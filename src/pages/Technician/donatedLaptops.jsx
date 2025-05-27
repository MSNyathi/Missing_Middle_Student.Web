import React, { useState } from 'react';
import Sidebar from '../../commponents/Sidebar';
import './devicesTable.css';

function DonatedLaptops() {
  const initialLaptops = [
    { id: 1, brand: 'Dell', model: 'XPS 13', donor: 'Alice', year: 2023, status: 'Good' },
    { id: 2, brand: 'HP', model: 'EliteBook', donor: 'Bob', year: 2022, status: 'Refurbished' },
    { id: 3, brand: 'Apple', model: 'MacBook Pro', donor: 'Charlie', year: 2023, status: 'Needs Repair' },
    { id: 4, brand: 'Lenovo', model: 'ThinkPad', donor: 'Dave', year: 2023, status: 'Good' },
    { id: 5, brand: 'Asus', model: 'ZenBook', donor: 'Eve', year: 2022, status: 'Refurbished' },
    { id: 6, brand: 'Acer', model: 'Aspire 5', donor: 'Frank', year: 2023, status: 'Needs Repair' },
    // Add more if needed
  ];

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const laptopsPerPage = 5;

  const filteredLaptops = initialLaptops
    .filter((laptop) =>
      [laptop.brand, laptop.model, laptop.donor].some((field) =>
        field.toLowerCase().includes(search.toLowerCase())
      )
    )
    .filter((laptop) => (yearFilter ? laptop.year.toString() === yearFilter : true))
    .sort((a, b) => {
      if (sortBy === 'donor') return a.donor.localeCompare(b.donor);
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      return 0;
    });

  const indexOfLastLaptop = currentPage * laptopsPerPage;
  const indexOfFirstLaptop = indexOfLastLaptop - laptopsPerPage;
  const currentLaptops = filteredLaptops.slice(indexOfFirstLaptop, indexOfLastLaptop);
  const totalPages = Math.ceil(filteredLaptops.length / laptopsPerPage);

  const exportToCSV = () => {
    const headers = ['ID', 'Brand', 'Model', 'Donor', 'Year', 'Status'];
    const rows = filteredLaptops.map((l) => [l.id, l.brand, l.model, l.donor, l.year, l.status]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      headers.join(',') +
      '\n' +
      rows.map((row) => row.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'donated_laptops.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div style={{ display: 'flex', background: '#f2f0f1' }}>
      <div style={{ width: '250px', backgroundColor: '#003366', minHeight: '100vh' }}>
        <Sidebar />
      </div>

      <div style={{ padding: '20px', flex: 1 }}>
        <h2>Donated Laptops</h2>

        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by brand, model, or donor"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ width: '250px' }}
          />

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select"
            style={{ width: '180px' }}
          >
            <option value="">Sort By</option>
            <option value="donor">Donor</option>
            <option value="status">Status</option>
          </select>

          {/* Year Filter */}
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="form-select"
            style={{ width: '180px' }}
          >
            <option value="">Filter by Year</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>

          {/* Export CSV */}
          <button className="btn btn-success" onClick={exportToCSV}>
            Export CSV
          </button>
        </div>

        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            overflowX: 'auto',
          }}
        >
          <table id="written" className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Donor</th>
                <th>Year</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentLaptops.length > 0 ? (
                currentLaptops.map((laptop) => (
                  <tr key={laptop.id}>
                    <td>{laptop.id}</td>
                    <td>{laptop.brand}</td>
                    <td>{laptop.model}</td>
                    <td>{laptop.donor}</td>
                    <td>{laptop.year}</td>
                    <td>{laptop.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No laptops found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav className="mt-3">
          <ul className="pagination">
            {[...Array(totalPages).keys()].map((num) => (
              <li
                key={num}
                className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => setCurrentPage(num + 1)}>
                  {num + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default DonatedLaptops;
