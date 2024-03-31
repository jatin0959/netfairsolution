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
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setIsSigningIn(false); // Set signing in state to false after successful sign in
      toast.success("Sign in successful!"); // Show success notification
      router.push("/Dashboard"); // Redirect to home page or any other page after successful sign in
    } catch (error) {
      setIsSigningIn(false); // Set signing in state to false if there's an error
      console.error("Error signing in:", error.message);
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
        <div className="signin-banner-from-btn mb-20">
          <button type="submit" className="signin-btn" disabled={isSigningIn}>
            {isSigningIn ? "Signing In..." : "Sign In"}
          </button>
        </div>
        <div className="signin-banner-from-register">
          <Link href="/register">Don't have an account ? <span>Register</span></Link>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
