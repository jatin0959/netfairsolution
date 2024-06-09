import React from 'react';
import axios from 'axios';

const CommentPost = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name, email, website, comment } = Object.fromEntries(formData);
    try {
      await axios.post('http://localhost:5000/api/saveComment', {
        name,
        email,
        website,
        comment
      });
      console.log('Comment submitted successfully');
      // Optionally, you can show a success message to the user
    } catch (error) {
      console.error('Error submitting comment:', error.message);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit} className="box">
        <div className="row gx-20">
          <div className="col-xxl-4 col-xl-6 col-lg-4">
            <div className="postbox__comment-input mb-35">
              <input type="text" className="inputText" required />
              <span className="floating-label">Your Name</span>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-6 col-lg-4">
            <div className="postbox__comment-input mb-35">
              <input type="text" className="inputText" required />
              <span className="floating-label">Your Email</span>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-6 col-lg-4">
            <div className="postbox__comment-input mb-35">
              <input type="text" className="inputText" required />
              <span className="floating-label">Your Website</span>
            </div>
          </div>
          <div className="col-xxl-12">
            <div className="postbox__comment-input mb-20">
              <textarea className="textareaText" required></textarea>
              <span className="floating-label-2">Your Comment</span>
            </div>
          </div>
          <div className="col-xxl-12">
            <div className="postbox__comment-agree">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  I agree that my submitted data is being collected and stored.
                </label>
              </div>
            </div>
          </div>
          <div className="col-xxl-12">
            <div className="postbox__comment-btn">
              <button type="submit" className="tp-btn-inner">
                Post comment
              </button>
            </div>
          </div>
        </div>
        </form>
  );
};

export default CommentPost;
