// ... [imports unchanged]
import { useEffect, useState, useRef } from 'react';
import AdminNavbar from '../../../../commponents/adminNavbar';
import Select from 'react-select';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);

export default function AssignDevicePage() {
  // [State declarations unchanged]
  const [applications, setApplications] = useState([]);
  const [devices, setDevices] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDeviceOption, setSelectedDeviceOption] = useState(null);

  const [isAssigningAll, setIsAssigningAll] = useState(false);
  const undoTimeoutRef = useRef(null);

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
    /*  MySwal.fire({
        icon: 'error',
        title: 'Device Fetch Failed',
        text: 'Unable to fetch device data from the server.',
      });*/
    }
  };

  useEffect(() => {
    const fetchApprovedApplicants = async () => {
      try {
        const baseUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${baseUrl}api/Application/approvedApplicant2`);
        if (!response.ok) throw new Error('Failed to fetch approved applicants');

        const realApplicants = await response.json();
        const transformedApplicants = realApplicants.map(app => ({
          id: app.id,
          studentNumber: app.student_No || '',
          surname: app.surname || 'Unknown',
          initials: app.initials || '',
          approvalDate: app.applicationDate ? app.applicationDate.split('T')[0] : '',
        }));

        setApplications(transformedApplicants);
      } catch (error) {
        console.error('Error fetching approved applicants:', error);
        setApplications([]);
        /*MySwal.fire({
          icon: 'error',
          title: 'Applicants Fetch Failed',
          text: 'Unable to fetch approved applicants from the server.',
        });*/
      }
    };

    fetchApprovedApplicants();
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

  const handleAssignDevice = async () => {
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

    const selectedDevice = devices.find((d) => d.id === selectedDeviceOption.value);
    const payload = {
      studentNumber: selectedApplicant,
      serialNumber: selectedDevice?.serialNumber,
    };

    try {
      const baseUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${baseUrl}assignDaDevice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to assign device');

      MySwal.fire('Assigned!', 'Device has been assigned successfully.', 'success');
    } catch (error) {
      console.error('Assignment error:', error);
      MySwal.fire('Error', 'Failed to assign device to backend.', 'error');
    }
  };

  const handleAssignAll = async () => {
    setIsAssigningAll(true);

    const unassignedApps = applications.filter((app) => !getDeviceByStudent(app.studentNumber));
    const unassignedDevicesQueue = [...unassignedDevices];
    const assignedDate = new Date().toISOString().split('T')[0];

    if (unassignedDevicesQueue.length === 0) {
      Swal.fire('No Devices Available', 'There are no unassigned devices available.', 'warning');
      setIsAssigningAll(false);
      return;
    }

    const newDeviceState = devices.map((d) => ({ ...d }));
    const newAssignments = [];

    for (const app of unassignedApps) {
      const device = unassignedDevicesQueue.shift();
      if (!device) break;

      const deviceIndex = newDeviceState.findIndex((d) => d.id === device.id);
      newDeviceState[deviceIndex].assignedTo = app.studentNumber;
      newDeviceState[deviceIndex].assignedDate = assignedDate;
      newDeviceState[deviceIndex].collected = false;

      newAssignments.push({
        student: app.studentNumber,
        deviceName: device.name,
        serialNumber: device.serialNumber,
      });
    }

    setDevices(newDeviceState);

    const undoPopup = await MySwal.fire({
      title: 'Assignments Scheduled',
      html: `<div>${newAssignments.length} device(s) will be assigned.</div><div>You have <strong>5 seconds</strong> to undo.</div>`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Let it Assign',
      cancelButtonText: 'Undo',
      allowOutsideClick: false,
      timer: 5000,
      timerProgressBar: true,
    });

    if (undoPopup.dismiss === Swal.DismissReason.cancel) {
      const rollbackDevices = devices.map((d) => {
        const undoMatch = newAssignments.find((a) => a.serialNumber === d.serialNumber);
        return undoMatch
          ? { ...d, assignedTo: null, assignedDate: null, collected: null }
          : d;
      });
      setDevices(rollbackDevices);
      Swal.fire('Undone', 'Device assignments were canceled.', 'info');
      setIsAssigningAll(false);
      return;
    }

    const baseUrl = process.env.REACT_APP_API_URL;
    for (const assignment of newAssignments) {
      try {
        const payload = {
          studentNumber: assignment.student,
          serialNumber: assignment.serialNumber,
        };
        const response = await fetch(`${baseUrl}assignDaDevice`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error(`Failed to assign ${assignment.serialNumber}`);
      } catch (error) {
        console.error(`Error assigning device to ${assignment.student}:`, error);
      }
    }

    MySwal.fire({
      title: 'Devices Assigned',
      html: newAssignments.map((a) => `<div><strong>${a.student}</strong> → ${a.deviceName}</div>`).join(''),
      icon: 'success',
    });

    setIsAssigningAll(false);
  };

  const handleCollectedToggle = (deviceId) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === deviceId ? { ...d, collected: !d.collected } : d))
    );
  };

 

  
  const [searchTerm, setSearchTerm] = useState('');

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
        <h2 className="text-center mb-4 fw-bold text-dark">Assign Devices</h2>

        {/* Filters and Controls */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4 p-3 rounded shadow-sm bg-white border">
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
              placeholder="Search by Student # "
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
            <button onClick={handleAssignAll} disabled={isAssigningAll} className="btn btn-primary">
              {isAssigningAll ? 'Assigning...' : 'Assign All'}
            </button>
            <button className="btn btn-outline-primary" onClick={fetchDevices}>
              Refresh Devices
            </button>
           
           
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-striped shadow bg-white table-hover rounded"
           style={{ borderRadius: "15px", overflow: "hidden" }}>
            <thead className="table-dark">
              <tr>
                <th>Student Number</th>
                <th>Surname</th>
                <th>Initials</th>
                <th>Approval Date</th>
                <th>Status</th>
                <th>Device</th>
                <th>Assigned Date</th>
               
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
                        <span className={`badge ${assignedDevice ? 'bg-success' : 'bg-danger'}`}>
                          {assignedDevice ? 'Assigned' : 'Unassigned'}
                        </span>
                      </td>
                      <td>{assignedDevice?.name || '—'}</td>
                      <td>{assignedDevice?.assignedDate || '—'}</td>
                   
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
                  <td colSpan={9} className="text-center text-muted py-5">
                    <i className="bi bi-exclamation-circle" style={{ fontSize: '3rem' }}></i>
                    <div className="mt-2" style={{ fontSize: '1.2rem' }}>
                      No  Applicants found.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="bg-white p-4 rounded shadow" style={{ width: '400px' }}>
              <h5 className="mb-3">Assign Device</h5>
              <Select
                options={deviceOptions}
                value={selectedDeviceOption}
                onChange={setSelectedDeviceOption}
                placeholder="Search and select a device..."
                isSearchable
              />
              <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-outline-secondary me-2" onClick={() => setShowModal(false)}>
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
    </div>
  );
}
