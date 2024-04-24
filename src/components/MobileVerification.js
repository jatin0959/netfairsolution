import React, { useState, useEffect, useRef } from "react";
import { firebase } from '../Firebase/config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { signInWithPhoneNumber } from "firebase/auth";

const MobileVerification = () => {
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(""); // Array to hold OTP digits
  

  

  function onSignup() {
    setLoading(true);

    const appVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          signIn();
        },
        "expired-callback": () => {},
      }
    );

    const formatPh = "+" + ph;

    signInWithPhoneNumber(firebase.auth(), formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function signIn() {
    const appVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );
    const formatPh = "+" + ph;

    signInWithPhoneNumber(firebase.auth(), formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp) // Use the OTP directly since it's already a string
      .then(async (res) => {
        setLoading(false);
        toast.success("Phone number verified successfully!");
        console.log("User object:", res.user);
  
        // Update mobileverification status to true
        const userRef = firebase.firestore().collection("users").doc(user);
        await userRef.update({
          mobileverification: true
        });
  
       
  
        // Reload the page
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error verifying OTP:", err);
        setLoading(false);
      });
  }
  

  return (
    <div className="min-h-screen">
      <div className="lg:ml-64">
      <div className="w-80 flex flex-col gap-2 rounded-lg p-2">
                  {showOTP ? (
                    <>
                      <p class="mb-1 font-medium text-center text-black">Enter OTP</p>
                            <div class="mb-1 flex flex-col">
                              <div class="focus-within:border-red-600 relativeflex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
                                <input
                                  type="text"
                                  value={otp}
                                  onChange={(e) => setOtp(e.target.value)}
                                  placeholder="Enter OTP"
                                  class="w-full border-gray-300 bg-white px-4 py-2 text-base text-black placeholder-gray-400 focus:outline-none"
                                />
                              </div>
                            </div>

                            <button
                              onClick={onOTPVerify}
                              className="bg-red-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                            >
                              {loading && (
                                <CgSpinner
                                  size={20}
                                  className="mt-1 animate-spin"
                                />
                              )}
                              <span>Verify OTP</span>
                            </button>
                    </>
                  ) : (
                    <>
                    <h1 className="text-xl text-center font-bold" >Verify Mobile Number</h1>
                      <PhoneInput
                        country={"in"}
                        value={ph}
                        onChange={setPh}
                      />
                      <button
                        onClick={onSignup}
                        className="bg-red-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                      >
                        {loading && (
                          <CgSpinner
                            size={20}
                            className="mt-1 animate-spin"
                          />
                        )}
                        <span>Send code via SMS</span>
                      </button>
                    </>
                  )}
                </div>
      </div>
    </div>
  );
};

export default MobileVerification;
