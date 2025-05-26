import React from 'react';
import Sidebar from '../../commponents/Sidebar';

function writtenOfLaptops() {
    const laptopData = [
        { id: 1, brand: 'Dell', model: 'XPS 13', donor: 'Alice' },
        { id: 2, brand: 'HP', model: 'EliteBook', donor: 'Bob' },
        { id: 3, brand: 'Apple', model: 'MacBook Pro', donor: 'Charlie' }
    ];
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '250px', backgroundColor: '#003366', minHeight: '100vh' }}>
                <Sidebar />
            </div>
            <div style={{ padding: '20px' }}>
                <h2>Written Off Laptops</h2>
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Donor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {laptopData.length > 0 ? (
                            laptopData.map((laptop, index) => (
                                <tr key={index}>
                                    <td>{laptop.id}</td>
                                    <td>{laptop.brand}</td>
                                    <td>{laptop.model}</td>
                                    <td>{laptop.donor}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No laptops Written Off.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default writtenOfLaptops;