import { useEffect, useState } from 'react';
import AdminNavbar from '../../../../commponents/adminNavbar';
import backgroundImage from '../../../../assets/backgroundAdmin.jpeg';
import Select from 'react-select';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function AssignDevicePage() {
  const [applications, setApplications] = useState([]);
  const [devices, setDevices] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');

  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDeviceOption, setSelectedDeviceOption] = useState(null);

  useEffect(() => {
    const dummyApplications = [
      { id: 1, studentNumber: '202312345', surname: 'Mokoena', initials: 'T.', approvalDate: '2025-04-20' },
      { id: 2, studentNumber: '202398765', surname: 'Dlamini', initials: 'L.', approvalDate: '2025-04-18' },
      { id: 3, studentNumber: '202376543', surname: 'Ndlovu', initials: 'S.', approvalDate: '2025-04-23' },
    ];

    const dummyDevices = [
      { id: 'd1', name: 'Dell Latitude 7490', assignedTo: '202398765' },
      { id: 'd2', name: 'HP ProBook 450 G7', assignedTo: null },
      { id: 'd3', name: 'Lenovo ThinkPad E15', assignedTo: null },
      { id: 'd4', name: 'Acer Aspire 5', assignedTo: null },
    ];

    setApplications(dummyApplications);
    setDevices(dummyDevices);
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

    setDevices((prev) =>
      prev.map((d) =>
        d.id === selectedDeviceOption.value
          ? { ...d, assignedTo: selectedApplicant }
          : d
      )
    );

    setShowModal(false);
    MySwal.fire('Assigned!', 'Device has been assigned successfully.', 'success');
  };

  const handleAssignAll = () => {
    const unassignedApps = applications.filter(
      (app) => !getDeviceByStudent(app.studentNumber)
    );

    const unassignedDevicesQueue = [...unassignedDevices];

    if (unassignedApps.length > unassignedDevicesQueue.length) {
      Swal.fire(
        'Not Enough Devices',
        `There are only ${unassignedDevicesQueue.length} devices available for ${unassignedApps.length} applicants.`,
        'warning'
      );
      return;
    }

    const newDeviceState = devices.map((d) => ({ ...d }));
    const newAssignments = [];

    for (const app of unassignedApps) {
      const device = unassignedDevicesQueue.shift();
      if (device) {
        const deviceIndex = newDeviceState.findIndex((d) => d.id === device.id);
        newDeviceState[deviceIndex].assignedTo = app.studentNumber;
        newAssignments.push({ student: app.studentNumber, device: device.name });
      }
    }

    setDevices(newDeviceState);

    MySwal.fire({
      title: 'Devices Assigned',
      html: newAssignments
        .map((a) => `<div><strong>${a.student}</strong> → ${a.device}</div>`)
        .join(''),
      icon: 'success',
    });
  };

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

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    color: 'white',
  };

  const deviceOptions = unassignedDevices.map((d) => ({
    value: d.id,
    label: d.name,
  }));

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <AdminNavbar />

      <div style={backgroundStyle} className="flex-grow-1 p-4">
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

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              Sort ({sortOrder === 'asc' ? 'Oldest First' : 'Newest First'})
            </button>
            <button className="btn btn-success" onClick={handleAssignAll}>
              Assign All
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-dark">
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
              {sortedAndFilteredApps.map((app) => {
                const assignedDevice = getDeviceByStudent(app.studentNumber);

                return (
                  <tr key={app.id}>
                    <td>{app.studentNumber}</td>
                    <td>{app.surname}</td>
                    <td>{app.initials}</td>
                    <td>{app.approvalDate}</td>
                    <td>
                      {assignedDevice ? (
                        <span className="badge bg-success">Assigned</span>
                      ) : (
                        <span className="badge bg-danger">Unassigned</span>
                      )}
                    </td>
                    <td>
                      {assignedDevice ? (
                        assignedDevice.name
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
              })}
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

      {/* Device Assignment Modal */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }}
        >
          <div className="bg-white p-4 rounded shadow" style={{ minWidth: '300px' }}>
            <h5 className="mb-3">Assign Device</h5>
            <Select
              options={deviceOptions}
              value={selectedDeviceOption}
              onChange={setSelectedDeviceOption}
              placeholder="Search and select a device..."
              isSearchable
            />
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-secondary me-2" onClick={() => setShowModal(false)}>
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
