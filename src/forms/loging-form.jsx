import React, { useState } from "react";
import EyeOff from "../svg/eye-off";
import EyeOn from "../svg/eye-on";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { firebase } from "../Firebase/config"; // Import Firebase configuration
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { useRouter } from "next/router";

const LoginForm = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter(); // Router instance

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSigningIn(true); // Set signing in state to true
      const { email, password } = data;
      // Sign in with email and password

      const response = await fetch(' http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        // Successful login
        setIsSigningIn(false); // Set signing in state to false after successful sign in
        toast.success("Sign in successful!"); // Show success notification
        router.push({
          pathname: "/Dashboard",
          query: { email: email }
        }); // Redirect to home page or any other page after successful sign in
        // Save token to localStorage or state for future requests
      } else {
        // Failed login
        setIsSigningIn(false); 
        toast.error("Wrong Credentials");
      }

      // await firebase.auth().signInWithEmailAndPassword(email, password);


      
    } catch (error) {
      setIsSigningIn(false); // Set signing in state to false if there's an error
      console.error("Error signing in:", error.message);
      toast.error(`Error: ${error.message}`); // Show error notification
    }
  };


  const handleGoogleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await firebase.auth().signInWithPopup(provider);
      const { user } = userCredential;

      // Check if user exists in Firestore collection
      const userSnapshot = await firebase.firestore().collection("users").doc(user.uid).get();
      if (userSnapshot.exists) {
        // User found, redirect to Dashboard
        router.push("/Dashboard");
      } else {
        // User not found, redirect to signup page and show toast
        router.push("/register");
        toast.error("Please sign up.");
      }
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      toast.error(`Error: ${error.message}`); // Show error notification
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12">
            <div className="postbox__comment-input mb-30">
              <input
                {...register("email")}
                className="inputText"
                type="email"
              />
              <span className="floating-label">Your Email</span>
            </div>
          </div>
          <div className="col-12">
            <div className="mb-30">
              <div className="postbox__comment-input">
                <input
                  {...register("password")}
                  className="inputText password"
                  type={passwordType}
                />
                <span className="floating-label">Password</span>
                <span
                  id="click"
                  className="eye-btn"
                  onClick={togglePasswordVisibility}
                >
                  {passwordType === "password" ? (
                    <span className="eye-off">
                      <EyeOff />
                    </span>
                  ) : (
                    <span className="eye-off">
                      <EyeOn />
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="signin-banner-form-remember">
          <div className="row">
            <div className="col-6">
              <div className="postbox__comment-agree">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Remember me
                  </label>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="postbox__forget text-end">
                <Link href="/#">Forgot password ?</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="signin-banner-from-btn mb-2">
          <button type="submit" className="signin-btn" disabled={isSigningIn}>
            {isSigningIn ? "Signing In..." : "Sign In"}
          </button>
        </div>
        
        <button type="button" onClick={handleGoogleSignIn}
                class="w-full px-4 py-3 flex items-center mb-10 justify-center rounded text-[#333] text-base tracking-wider font-semibold border-none outline-none bg-gray-100 hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="22px" fill="#fff" class="inline shrink-0 mr-4" viewBox="0 0 512 512">
                  <path fill="#fbbd00"
                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                    data-original="#fbbd00" />
                  <path fill="#0f9d58"
                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                    data-original="#0f9d58" />
                  <path fill="#31aa52"
                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                    data-original="#31aa52" />
                  <path fill="#3c79e6"
                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                    data-original="#3c79e6" />
                  <path fill="#cf2d48"
                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                    data-original="#cf2d48" />
                  <path fill="#eb4132"
                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                    data-original="#eb4132" />
                </svg>
                Continue with Google
              </button>
        <div className="signin-banner-from-register">
          <Link href="/register">Don't have an account ? <span>Register</span></Link>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
