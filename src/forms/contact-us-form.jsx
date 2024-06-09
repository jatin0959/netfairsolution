import React, { useState } from "react";
import NiceSelect from "../ui/nice-select";
import axios from "axios"; // Import axios
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    inquiryAbout: "", // Initialize as an empty string
    message: ""
  });

  const selectHandler = (selectedValue) => {
    setFormData({ ...formData, inquiryAbout: selectedValue.value }); // Update to pass the selected value correctly
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:5000/api/contactUs/', formData);

      if (response.status === 201) {
        toast.success("Your inquiry has been submitted successfully!");
        // Reset form fields if submission is successful
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          inquiryAbout: "Your Inquiry about",
          message: ""
        });
      } else {
        toast.error("Failed to submit inquiry");
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error.message);
      toast.error('Failed to submit inquiry');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="box">
        <div className="row gx-20">
          <div className="col-12">
            <div className="postbox__comment-input mb-30">
              <input
                type="text"
                className="inputText"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <span className="floating-label">Full Name</span>
            </div>
          </div>
          <div className="col-12">
            <div className="postbox__comment-input mb-30">
              <input
                type="email"
                className="inputText"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="floating-label">Your Email</span>
            </div>
          </div>
          <div className="col-12">
            <div className="postbox__comment-input mb-35">
              <input
                type="tel"
                className="inputText"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              <span className="floating-label">Phone Number</span>
            </div>
          </div>
          <div className="col-12">
            <div className="postbox__select mb-30">
              <NiceSelect
                options={[
                  { value: "Your Inquiry about", text: "Your Inquiry about" },
                  { value: "01 Year", text: "01 Year" },
                  { value: "02 Year", text: "02 Year" },
                  { value: "03 Year", text: "03 Year" },
                  { value: "04 Year", text: "04 Year" },
                  { value: "05 Year", text: "05 Year" },
                ]}
                defaultCurrent={0}
                onChange={selectHandler}
              />
            </div>
          </div>
          <div className="col-xxl-12">
            <div className="postbox__comment-input mb-30">
              <textarea
                className="textareaText"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <span className="floating-label-2">Message...</span>
            </div>
          </div>
          <div className="col-xxl-12">
            <div className="postbox__btn-box">
              <button type="submit" className="submit-btn w-100">Send your Request</button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default ContactUsForm;
