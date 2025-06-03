import { useEffect, useState, useRef } from 'react';
import AdminNavbar from '../../../../commponents/adminNavbar';

import Select from 'react-select';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const MySwal = withReactContent(Swal);

export default function AssignDevicePage() {
  const [applications, setApplications] = useState([]);
  const [devices, setDevices] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDeviceOption, setSelectedDeviceOption] = useState(null);
  const csvRef = useRef();

  const fetchDevices = async () => {
    try {
      const baseUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${baseUrl}AssignDevices`);
      if (!response.ok) throw new Error('Failed to fetch devices');

      const realDevices = await response.json();

      const transformedDevices = realDevices.map((device, index) => ({
        id: device.serialNumber || `real-${index}`,
        name: `${device.brand} ${device.model}`,
        serialNumber: device.serialNumber || 'N/A',
        assignedTo: device.status === 'Distributed' ? device.assignedTo || 'UNKNOWN' : null,
        assignedDate: device.assignedDate || null,
        collected: device.collected || false,
      }));

      setDevices(transformedDevices);
    } catch (error) {
      console.error('Error fetching devices:', error);
      setDevices([]);
      MySwal.fire({
        icon: 'error',
        title: 'Device Fetch Failed',
        text: 'Unable to fetch device data from the server.',
      });
    }
  };

  useEffect(() => {
    // Dummy applications data
    const dummyApplications = [
      { id: 1, studentNumber: '202312345', surname: 'Mokoena', initials: 'T.', approvalDate: '2025-04-20' },
      { id: 2, studentNumber: '202398765', surname: 'Dlamini', initials: 'L.', approvalDate: '2025-04-18' },
      { id: 3, studentNumber: '202376543', surname: 'Ndlovu', initials: 'S.', approvalDate: '2025-04-23' },
    ];

    setApplications(dummyApplications);
    fetchDevices();
  }, []);

  const getDeviceByStudent = (studentNumber) =>
    devices.find((device) => device.assignedTo === studentNumber);

  const unassignedDevices = devices.filter((d) => !d.assignedTo);

  const handleOpenModal = (studentNumber) => {
    setSelectedApplicant(studentNumber);
    setSelectedDeviceOption(null);
    setShowModal(true);
  };

  const handleAssignDevice = () => {
    if (!selectedDeviceOption || !selectedApplicant) return;

    const assignedDate = new Date().toISOString().split('T')[0];

    setDevices((prev) =>
      prev.map((d) =>
        d.id === selectedDeviceOption.value
          ? { ...d, assignedTo: selectedApplicant, assignedDate, collected: false }
          : d
      )
    );

    setShowModal(false);
    MySwal.fire('Assigned!', 'Device has been assigned successfully.', 'success');
  };

  // Updated handleAssignAll to assign partial if not enough devices
  const handleAssignAll = () => {
    const unassignedApps = applications.filter((app) => !getDeviceByStudent(app.studentNumber));
    const unassignedDevicesQueue = [...unassignedDevices];
    const assignedDate = new Date().toISOString().split('T')[0];

    if (unassignedDevicesQueue.length === 0) {
      Swal.fire('No Devices Available', 'There are no unassigned devices available.', 'warning');
      return;
    }

    const newDeviceState = devices.map((d) => ({ ...d }));
    const newAssignments = [];

    for (const app of unassignedApps) {
      const device = unassignedDevicesQueue.shift();
      if (!device) break; // no more devices, stop assigning

      const deviceIndex = newDeviceState.findIndex((d) => d.id === device.id);
      newDeviceState[deviceIndex].assignedTo = app.studentNumber;
      newDeviceState[deviceIndex].assignedDate = assignedDate;
      newDeviceState[deviceIndex].collected = false;
      newAssignments.push({ student: app.studentNumber, device: device.name });
    }

    setDevices(newDeviceState);

    const message = newAssignments.length < unassignedApps.length
      ? `Only ${newAssignments.length} device(s) were assigned due to limited availability.`
      : 'All devices assigned successfully!';

    MySwal.fire({
      title: 'Devices Assigned',
      html:
        `<div>${message}</div>` +
        newAssignments.map((a) => `<div><strong>${a.student}</strong> → ${a.device}</div>`).join(''),
      icon: 'success',
    });
  };

  const handleCollectedToggle = (deviceId) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === deviceId ? { ...d, collected: !d.collected } : d
      )
    );
  };

  // Export CSV handler
  const handleExportCSV = () => {
    const headers = ['Student Number', 'Surname', 'Initials', 'Approval Date', 'Device Assigned', 'Serial Number', 'Assigned Date', 'Collected'];
    const rows = applications.map((app) => {
      const device = getDeviceByStudent(app.studentNumber);
      return [
        app.studentNumber,
        app.surname,
        app.initials,
        app.approvalDate,
        device?.name || '',
        device?.serialNumber || '',
        device?.assignedDate || '',
        device?.collected ? 'Yes' : 'No',
      ];
    });

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\r\n';
    rows.forEach(rowArray => {
      csvContent += rowArray.join(',') + '\r\n';
    });

    const encodedUri = encodeURI(csvContent);
    if (csvRef.current) {
      csvRef.current.href = encodedUri;
      csvRef.current.download = 'device_assignments.csv';
      csvRef.current.click();
    }
  };

  // Export PDF handler using jsPDF and autotable
  const handleExportPDF = () => {
    const doc = new jsPDF();
  
    doc.text('Assigned Devices List', 14, 20);
  
    const tableColumn = ['Student Number', 'Surname', 'Initials', 'Approval Date', 'Status', 'Device', 'Serial Number', 'Assigned Date'];
    const tableRows = [];
  
    filteredApps.forEach(app => {
      const assignedDevice = getDeviceByStudent(app.studentNumber);
      tableRows.push([
        app.studentNumber,
        app.surname,
        app.initials,
        app.approvalDate,
        assignedDevice ? 'Assigned' : 'Unassigned',
        assignedDevice ? assignedDevice.name : '',
        assignedDevice ? assignedDevice.serialNumber : '',
        assignedDevice ? assignedDevice.assignedDate || '' : ''
      ]);
    });
  
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });
  
    doc.save('assigned_devices.pdf');
  };

  // Search by student number or serial number
  const [searchTerm, setSearchTerm] = useState('');


  // First: get sorted and filtered applications based on status and sort order
const sortedAndFilteredApps = applications
.filter((app) => {
  const isAssigned = !!getDeviceByStudent(app.studentNumber);
  if (filterStatus === 'assigned') return isAssigned;
  if (filterStatus === 'unassigned') return !isAssigned;
  return true;
})
.sort((a, b) => {
  const dateA = new Date(a.approvalDate);
  const dateB = new Date(b.approvalDate);
  return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
});

// Then: apply search filter on the already sorted and filtered list
const filteredApps = sortedAndFilteredApps.filter(app => {
if (!searchTerm) return true;
const device = getDeviceByStudent(app.studentNumber);
return (
  app.studentNumber.includes(searchTerm) ||
  (device?.serialNumber && device.serialNumber.includes(searchTerm))
);
});




  const deviceOptions = unassignedDevices.map((d) => ({
    value: d.id,
    label: `${d.name} (${d.serialNumber})`,
  }));

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: "rgb(228, 235, 255)" }}>
  <AdminNavbar />

  <div className="flex-grow-1 p-4">
    <h2 className="text-center mb-4 fw-bold text-primary">Assign Devices</h2>

    <div
      className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4 p-3 rounded shadow-sm"
      style={{ backgroundColor: '#fff', border: '1px solid #dee2e6' }}
    >
      <div>
        <label className="form-label fw-semibold me-2 mb-0 text-black">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="form-select d-inline-block"
          style={{ width: '160px' }}
        >
          <option value="all">All</option>
          <option value="assigned">Assigned</option>
          <option value="unassigned">Unassigned</option>
        </select>
      </div>

      <div className="flex-grow-1" style={{ maxWidth: '300px' }}>
        <input
          type="text"
          placeholder="Search by Student # or Serial #"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.trim())}
        />
      </div>

      <div className="d-flex flex-wrap gap-2">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Sort ({sortOrder === 'asc' ? 'Oldest First' : 'Newest First'})
        </button>
        <button className="btn btn-success" onClick={handleAssignAll}>
          Assign All
        </button>
        <button className="btn btn-outline-primary" onClick={fetchDevices}>
          Refresh Devices
        </button>
        <button className="btn btn-primary" onClick={handleExportCSV}>
          Export CSV
        </button>
        <button className="btn btn-primary" onClick={handleExportPDF}>
          Export PDF
        </button>
        <a ref={csvRef} style={{ display: 'none' }} />
      </div>
    </div>

    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle text-center">
        <thead className="table-dark">
          <tr>
            <th>Student Number</th>
            <th>Surname</th>
            <th>Initials</th>
            <th>Approval Date</th>
            <th>Status</th>
            <th>Device</th>
            <th>Assigned Date</th>
            <th>Collected</th>
            <th>Assign</th>
          </tr>
        </thead>
        <tbody>
          {filteredApps.length > 0 ? (
            filteredApps.map((app) => {
              const assignedDevice = getDeviceByStudent(app.studentNumber);
              return (
                <tr key={app.id}>
                  <td>{app.studentNumber}</td>
                  <td>{app.surname}</td>
                  <td>{app.initials}</td>
                  <td>{app.approvalDate}</td>
                  <td>
                    <span
                      className={`badge ${assignedDevice ? 'bg-success' : 'bg-danger'}`}
                    >
                      {assignedDevice ? 'Assigned' : 'Unassigned'}
                    </span>
                  </td>
                  <td>{assignedDevice?.name || '—'}</td>
                  <td>{assignedDevice?.assignedDate || '—'}</td>
                  <td>
                    {assignedDevice ? (
                      <input
                        type="checkbox"
                        checked={assignedDevice.collected || false}
                        onChange={() => handleCollectedToggle(assignedDevice.id)}
                      />
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>
                    {assignedDevice ? (
                      <span className="text-muted">Done</span>
                    ) : unassignedDevices.length === 0 ? (
                      <span className="text-muted">No Devices</span>
                    ) : (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleOpenModal(app.studentNumber)}
                      >
                        Assign
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={9} className="text-muted">
                No matching applications.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>

  {/* Device Assignment Modal */}
  {showModal && (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
    >
      <div
        className="bg-white p-4 rounded shadow"
        style={{ minWidth: '320px', maxWidth: '90%', width: '400px' }}
      >
        <h5 className="mb-3">Assign Device</h5>
        <Select
          options={deviceOptions}
          value={selectedDeviceOption}
          onChange={setSelectedDeviceOption}
          placeholder="Search and select a device..."
          isSearchable
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: '#f8f9fa',
              borderColor: '#ced4da',
              boxShadow: 'none',
              fontSize: '0.9rem',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected
                ? '#0d6efd'
                : state.isFocused
                ? '#e9ecef'
                : 'white',
              color: state.isSelected ? 'white' : 'black',
              fontSize: '0.9rem',
            }),
          }}
        />
        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleAssignDevice}>
            Assign
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
}
