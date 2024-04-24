import React, { useState, useEffect } from "react";
import { firebase } from '../../Firebase/config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { signInWithPhoneNumber } from "firebase/auth";

const Index = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch user data from Firestore
    const fetchUserData = async () => {
      try {
        const userRef = firebase.firestore().collection("users").doc(user);
        const doc = await userRef.get();
        if (doc.exists) {
          setUserData(doc.data());
        } else {
          console.log("No such document!");
        }
        setLoading(false); // Update loading state when data is fetched
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false); // Update loading state even if there's an error
      }
    };

    fetchUserData();
  }, [user]);

  console.log(userData);
  
  return (
    <div className="min-h-screen ">
      {loading ? ( // Render loading spinner while data is loading
       <div class='flex lg:ml-64 space-x-2 justify-center items-center bg-white h-screen dark:invert'>
       <span class='sr-only'>Loading...</span>
        <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
    </div>
      ) : (
        <div className="lg:ml-64">
          {(userData && userData.kycverification === "Done") ? null : (
            userData && userData.kycverification === "true" ? (
              <div class="bg-yellow-50 text-yellow-800 pl-4 pr-10 py-4 rounded relative" role="alert">
                <div class="mb-3 flex items-center">
                  <strong class="font-bold text-base mr-3">KYC Verification Under Process</strong>
                </div>
                <span class="block sm:inline text-sm">
                  Your KYC verification is under process. It may take up to 24 hours. 
                  We'll notify you once it's completed.
                </span>
              </div>
            ) : (
              <div class="bg-yellow-50 text-yellow-800 pl-4 pr-10 py-4 rounded relative" role="alert">
                <div class="mb-3 flex items-center">
                  <strong class="font-bold text-base mr-3">KYC required!</strong>
                </div>
                <span class="block sm:inline text-sm">This is a warning message please verify your KYC.</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 cursor-pointer fill-yellow-500 absolute right-4 top-4"
                  viewBox="0 0 320.591 320.591">
                  <path
                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                    data-original="#000000" />
                  <path
                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                    data-original="#000000" />
                </svg>
                <a href="/Dashboard/verification" class="border-b border-yellow-800 block w-max text-sm text-yellow-800 mt-3">Verify
                  KYC</a>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
