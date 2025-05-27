import React, {useState} from 'react';
import DonorNavbar from './donorNavbar';
import './DonorHistory.css'

export default function DonorHistory(){
    const donationData = [
        {
            id: '12344',
            status: 'Accepted',
            pickup: '2024-04-10',
            notes: 'Contains power adapters',
            deviceNum: 5,
            creationDate: '2024-04-01'
        },
        {
            id: '12343',
            status: 'Pending',
            pickup: '2024-03-22',
            notes: 'Will leave by back door',
            deviceNum: 12,
            creationDate: '2024-03-10'
        },
        {
            id: '12342',
            status: 'Not Accepted',
            pickup: '2024-03-15',
            notes: 'Incomplete set',
            deviceNum: 4,
            creationDate: '2024-03-01'
        }
    ];
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [filterStatus, setFilterStatus] = useState('');
    const [sortAsc, setSortAsc] = useState(true);

    const handleRowClick = (donation) => {
        setSelectedDonation(donation);
    };

    const closeModal = () => {
        setSelectedDonation(null);
    };

    const handleFilter = (status) => {
        setFilterStatus(status);
    };

    const handleSort = () => {
        setSortAsc(!sortAsc);
    };

    const filteredData = donationData
        .filter(item => !filterStatus || item.status === filterStatus)
        .sort((a, b) => {
            const dateA = new Date(a.creationDate);
            const dateB = new Date(b.creationDate);
            return sortAsc ? dateA - dateB : dateB - dateA;
        });

    const statusColors = {
        "Accepted": "status-accepted",
        "Pending": "status-pending",
        "Not Accepted": "status-rejected",
    };

    return (
        <div className='container'>
           <DonorNavbar/>
        <main  className='main-content'>
            <h2><b>DONATION HISTORY</b></h2>
            <div className="header-controls">
                
                <div className="controls">
                    <select onChange={(e) => handleFilter(e.target.value)}>
                        <option value="">All Statuses</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Pending">Pending</option>
                        <option value="Not Accepted">Not Accepted</option>
                    </select>
                    <button onClick={handleSort}>
                        Sort by Date {sortAsc ? '▲' : '▼'}
                    </button>
                </div>
            </div>

            <table className='donation-table'>
                <thead>
                    <tr>
                        <th>Donation ID</th>
                        <th>Pick-up</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item)} className='clickable-row'>
                            <td>{item.id}</td>
                            <td>{item.pickup}</td>
                            <td>
                                <span className={`status-badge ${statusColors[item.status] || ''}`}>
                                    {item.status}
                                </span>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedDonation && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closeModal}>×</button>
                        <h3>Donation Details</h3>
                        <p><strong>Donation ID:</strong> {selectedDonation.id}</p>
                        <p><strong>Creation Date:</strong> {selectedDonation.creationDate}</p>
                        <p><strong>Pick-up Date:</strong> {selectedDonation.pickup}</p>
                        <p><strong>Number of Devices:</strong> {selectedDonation.deviceNum}</p>
                        <p><strong>Status:</strong> {selectedDonation.status}</p>
                        <p><strong>Notes:</strong> {selectedDonation.notes}</p>
                    </div>
                </div>
            )}
        </main> 
        </div>
        
    );
}