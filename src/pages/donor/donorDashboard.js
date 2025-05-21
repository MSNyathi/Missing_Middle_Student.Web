import React from 'react';
import DonorNavbar from './donorNavbar';
import { Import } from 'lucide-react';
import './donorDashboard.css'



export default function DonorDashboard(){

    const donationData = [
        { id: '128456', status: 'Pending', pickup: '04/20', notes: 'Good condition' },
        { id: '654321', status: 'Received', pickup: '04/15', notes: 'Minot scratches' },
        { id: '112233', status: 'Not Accepted', pickup: '04/15', notes: 'No power' },
        { id: '445566', status: 'Received', pickup: '—', notes: 'Clean and functional' },
    ];
    const statusColors = {
        'Pending': 'status-pending',
        'Received': 'status-received',
        'Not Accepted': 'status-notaccepted',
    };

    return(

        <div className='Dashboard-container'>

                <DonorNavbar/>

            <main className='main-content'>
                
                <div className='main-header'>DONATOR DASHBOARD</div>
                <div className='cards'>                    
                    <div className='custom-card'>
                        <div className='card-content'>
                            <p>Laptops Donated</p>
                            <p className='count'>12</p>
                        </div>                        
                    </div>
                    <div className='custom-card'>
                        <div className='card-content'>
                            <p>Pending Pickup</p>
                            <p className='count'>8</p>
                        </div>                        
                    </div>
                    <div className='custom-card'>
                        <div className='card-content'>
                            <p>Received Laptops</p>
                            <p className='count'>3</p>
                        </div>                        
                    </div>
                    <div className='custom-card'>
                        <div className='card-content'>
                            <p>Not Accepted</p>
                            <p className='count'>1</p>
                        </div>                        
                    </div>
                </div>

                <h2>DONATION HISTORY</h2>
                <table className='donation-table'>
                    <thead>
                        <tr>
                            <th>Donation ID</th>
                            <th>Status</th>
                            <th>Pick-up</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donationData.map((item,index)=>(
                            <tr key ={index}>
                                <td>{item.id}</td>
                                <td>
                                    <span className={`status-badge ${statusColors[item.status] || ''}`}>
                                        {item.status === 'Not Accepted' ? 'Not Accepted' : item.status}
                                    </span>
                                </td>
                                <td>{item.pickup}</td>
                                <td>{item.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
            </main>
        </div>

    );
}