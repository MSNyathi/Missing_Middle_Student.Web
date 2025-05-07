import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AdminNavbar from '../../../../commponents/adminNavbar';

export default function AssignDevicePage() {
  const [applications, setApplications] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'assigned' | 'unassigned'

  const [availableDevices, setAvailableDevices] = useState([
    'Dell Latitude 7490',
    'HP ProBook 450 G7',
    'Lenovo ThinkPad E15',
    'Acer Aspire 5',
  ]);

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        studentNumber: '2023123456',
        surname: 'Mokoena',
        initials: 'T.',
        approvalDate: '2025-04-20',
        device: '',
      },
      {
        id: 2,
        studentNumber: '2023987654',
        surname: 'Dlamini',
        initials: 'L.',
        approvalDate: '2025-04-18',
        device: 'Dell Latitude 7490',
      },
      {
        id: 3,
        studentNumber: '2023765432',
        surname: 'Ndlovu',
        initials: 'S.',
        approvalDate: '2025-04-23',
        device: '',
      },
    ];
    setApplications(dummyData);
  }, []);

  const handleAssignDevice = (id) => {
    const assignedDevices = applications.map((app) => app.device).filter(Boolean);
    const unassignedDevices = availableDevices.filter(
      (device) => !assignedDevices.includes(device)
    );

    if (unassignedDevices.length === 0) {
      Swal.fire('No Devices Available', 'All devices have already been assigned.', 'info');
      return;
    }

    Swal.fire({
      title: 'Select a Device',
      input: 'select',
      inputOptions: unassignedDevices.reduce((acc, device) => {
        acc[device] = device;
        return acc;
      }, {}),
      inputPlaceholder: 'Choose a device',
      showCancelButton: true,
      confirmButtonText: 'Assign',
    }).then((result) => {
      const selectedDevice = result.value;

      if (result.isConfirmed) {
        if (!selectedDevice) {
          Swal.fire('No Selection', 'Please choose a device before assigning.', 'warning');
          return;
        }

        setApplications((prev) =>
          prev.map((app) =>
            app.id === id ? { ...app, device: selectedDevice } : app
          )
        );
        Swal.fire('Assigned!', `Device '${selectedDevice}' has been assigned.`, 'success');
      }
    });
  };

  const isAnyDeviceAvailable = availableDevices.some(
    (device) => !applications.some((app) => app.device === device)
  );

  const sortedAndFilteredApps = applications
    .filter((app) => {
      if (filterStatus === 'assigned') return !!app.device;
      if (filterStatus === 'unassigned') return !app.device;
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.approvalDate);
      const dateB = new Date(b.approvalDate);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <AdminNavbar />
    

      <div className="flex-grow-1 p-4">
        <h2 className="text-center mb-4">Assign Devices</h2>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <label className="me-2">Filter by Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-select d-inline w-auto"
            >
              <option value="all">All</option>
              <option value="assigned">Assigned</option>
              <option value="unassigned">Unassigned</option>
            </select>
          </div>

          <button
            className="btn btn-outline-secondary"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            Sort by Approval Date ({sortOrder === 'asc' ? 'Oldest First' : 'Newest First'})
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-light">
              <tr>
                <th>Student Number</th>
                <th>Surname</th>
                <th>Initials</th>
                <th>Approval Date</th>
                <th>Status</th>
                <th>Assign Device</th>
              </tr>
            </thead>
            <tbody>
              {sortedAndFilteredApps.map((app) => (
                <tr key={app.id}>
                  <td>{app.studentNumber}</td>
                  <td>{app.surname}</td>
                  <td>{app.initials}</td>
                  <td>{app.approvalDate}</td>
                  <td>
                    {app.device ? (
                      <span className="badge bg-success">Assigned</span>
                    ) : (
                      <span className="badge bg-danger">Unassigned</span>
                    )}
                  </td>
                  <td>
                    {app.device ? (
                      app.device
                    ) : !isAnyDeviceAvailable ? (
                      <span className="text-muted">No Devices</span>
                    ) : (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleAssignDevice(app.id)}
                      >
                        Assign
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {sortedAndFilteredApps.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-muted">
                    No applications found for selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
