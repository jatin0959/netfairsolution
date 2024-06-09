import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [kycSubmission, setKycSubmission] = useState(null);
  const router = useRouter();
  const { email } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getKycSubmission?email=${email}`);
        const data = await response.json();
        setKycSubmission(data.kycsubmission);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching kycsubmission:', error);
        setLoading(false);
      }
    };

    if (email) {
      fetchData();
    }
  }, [email]);

  return (
    <div className="min-h-screen">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="lg:ml-64">
          {kycSubmission === 'true' ? (
            <div className="bg-yellow-50 text-yellow-800 pl-4 pr-10 py-4 rounded relative" role="alert">
              <div className="mb-3 flex items-center">
                <strong className="font-bold text-base mr-3">KYC Verification Under Process</strong>
              </div>
              <span className="block sm:inline text-sm">
                Your KYC verification is under process. It may take up to 24 hours. 
                We'll notify you once it's completed.
              </span>
            </div>
          ) : (
            <div className="bg-yellow-50 text-yellow-800 pl-4 pr-10 py-4 rounded relative" role="alert">
              <div className="mb-3 flex items-center">
                <strong className="font-bold text-base mr-3">KYC required!</strong>
              </div>
              <span className="block sm:inline text-sm">This is a warning message please verify your KYC.</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 cursor-pointer fill-yellow-500 absolute right-4 top-4"
                viewBox="0 0 320.591 320.591">
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000" />
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000" />
              </svg>
              <Link href={`/Dashboard/verification?email=${email}`}>
                <h1 className="border-b border-yellow-800 block w-max text-sm text-yellow-800 mt-3">Verify</h1>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
