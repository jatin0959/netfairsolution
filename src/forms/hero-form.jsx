import React, { useState } from "react";
import EmailIcon from "../svg/email";

const HeroForm = () => {
  const [email, setEmail] = useState(""); // State to hold the email input value

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send the form data to the backend
    try {
      const response = await fetch("http://localhost:5000/api/saveEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Sending email as JSON object
      });

      if (response.ok) {
        // Data successfully saved in the database
        console.log("Email saved successfully!");
        // Optionally, you can reset the form here
        setEmail("");
      } else {
        // Error saving data
        console.error("Failed to save email");
      }
    } catch (error) {
      console.error("Error saving email:", error.message);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value); // Update email state as the user types
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="p-relative">
          <input
            type="text"
            placeholder="Business email address"
            value={email} // Bind input value to state
            onChange={handleChange} // Update state as the user types
          />
          {/* email icon */}
          <EmailIcon />
        </div>
        <button type="submit" className="tp-btn tp-btn-hover alt-color-black">
          <span>Get A Demo</span>
          <b></b>
        </button>
      </form>
    </>
  );
};

export default HeroForm;
