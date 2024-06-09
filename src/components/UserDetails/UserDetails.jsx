// components/UserDetails.js

import React, { useState, useEffect } from 'react';

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const UserDetails = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [kycDetails, setKYCDetails] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch user emails on component mount
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getUserEmails');
        const data = await response.json();
        setEmails(data.emails);
      } catch (error) {
        console.error('Error fetching user emails:', error);
      }
    };
    fetchEmails();
  }, []);

  // Fetch KYC details when selectedEmail changes
  useEffect(() => {
    const fetchKYCDetails = async () => {
      if (selectedEmail) {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:5000/api/getKYCDetailsByEmail?email=${selectedEmail}`);
          const data = await response.json();
          setKYCDetails(data.kycDetails);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching KYC details:', error);
          setLoading(false);
        }
      }
    };
    fetchKYCDetails();
  }, [selectedEmail]);

  // Handle verification button click
 // Handle verification button click
const handleVerify = async () => {
  try {
    setLoading(true);
    const response = await fetch('http://localhost:5000/api/verifyKYC', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: selectedEmail }),
    });
    const data = await response.json();
    setKYCDetails(data.kycDetails);
    setLoading(false);
    toast.success('KYC Verification Successful'); // Display success toast
  } catch (error) {
    console.error('Error verifying KYC:', error);
    setLoading(false);
    toast.error('Failed to verify KYC'); // Display error toast
  }
};


  return (
    <div style={styles.container}>
      <h2>User KYC Details</h2>
      <select style={styles.select} value={selectedEmail} onChange={(e) => setSelectedEmail(e.target.value)}>
    <option value="">Select Email</option>
    {emails ? (
      emails.map((email) => (
        <option key={email} value={email}>{email}</option>
      ))
    ) : (
      <option value="" disabled>No emails found</option>
    )}
  </select>
      {loading && <p style={styles.loading}>Loading...</p>}
      {!loading && Object.keys(kycDetails).length > 0 && (
        <div style={styles.details}>
          <h3>{kycDetails.businessName}</h3>
          <p>Email: {kycDetails.email}</p>
          <p>Business Address: {kycDetails.registeredAddress}</p>
          {/* Display other KYC details */}
          {Object.keys(kycDetails).map((key) => {
            if (key !== 'email' && key !== 'registeredAddress') {
              return (
                <p key={key}>
                  {key}: {kycDetails[key]}
                </p>
              );
            }
            return null;
          })}
          {/* Display PAN document image if available */}
          {kycDetails.panDocument && (
            <img
            src={`http://localhost:5000/${kycDetails.panDocument}`}
            alt="PAN Document"
            style={{ maxWidth: '100%', maxHeight: '200px' }}
          />
          )}
          {/* Add more images for other documents if available */}
          <button style={styles.button} onClick={handleVerify} disabled={loading}>
            {kycDetails.kycverification ? 'Verified' : 'Verify KYC'}
          </button>
        </div>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    margin: '20px',
  },
  select: {
    marginBottom: '10px',
  },
  loading: {
    fontStyle: 'italic',
  },
  details: {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '5px',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default UserDetails;
