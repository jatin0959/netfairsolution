import React, { useState } from "react";
import EyeOff from "../svg/eye-off";
import EyeOn from "../svg/eye-on";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { firebase } from "../Firebase/config"; // Import Firebase configuration
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Router instance

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true); // Set submitting state to true
      const { email, password, fullname, mobile, website } = data;
      // Create user with email and password
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const { user } = userCredential;

      // Store additional user data in Firestore
      await firebase.firestore().collection("users").doc(user.uid).set({
        fullname,
        email,
        mobile,
        website,
      });

      setIsSubmitting(false); // Set submitting state to false after successful submission
      toast.success("Registration successful!"); // Show success notification
      router.push("/sign-in"); // Redirect to sign-in page
    } catch (error) {
      setIsSubmitting(false); // Set submitting state to false if there's an error
      console.error("Error signing up:", error.message);
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
                {...register("fullname")}
                className="inputText"
              />
              <span className="floating-label">Full Name</span>
            </div>
          </div>
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
            <div className="postbox__comment-input mb-30">
              <input
                {...register("mobile")}
                className="inputText"
              />
              <span className="floating-label">Your Mobile Number</span>
            </div>
          </div>
          <div className="col-12">
            <div className="postbox__comment-input mb-30">
              <input
                {...register("website")}
                className="inputText"
              />
              <span className="floating-label">Your Website</span>
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

        <div className="signin-banner-from-btn mb-20">
          <button type="submit" className="signin-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default RegisterForm;
