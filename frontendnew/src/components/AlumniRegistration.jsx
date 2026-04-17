import React, { useState } from 'react';
import './AlumniRegistration.css';

const AlumniRegistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        photo: '',
        dept: '',
        gradYear: '',
        recentInvolvement: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data for Backend:", formData);
        alert("Thank you! Your information has been sent for review.");
        // Tomar teammate jokhon backend ready korbe, eikhane Axios call hobe.
    };

    return (
        <div className="alumni-reg-wrapper">
            <div className="alumni-reg-container">
                <div className="reg-header">
                    <h2>Alumni Registration</h2>
                    <p>Connect with the Metropolitan University legacy</p>
                </div>
                
                <form className="reg-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input type="text" name="name" placeholder="Enter your full name" onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label>Profile Photo URL</label>
                        <input type="text" name="photo" placeholder="Paste image link (Cloudinary/Google Drive)" onChange={handleChange} />
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <label>Department</label>
                            <input type="text" name="dept" placeholder="e.g. CSE" onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Graduation Year</label>
                            <input type="number" name="gradYear" placeholder="e.g. 2024" onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Recent Involvement</label>
                        <textarea 
                            name="recentInvolvement" 
                            placeholder="Current Company, University, or Startup..." 
                            rows="4"
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-btn">Submit Profile</button>
                </form>
            </div>
        </div>
    );
};

export default AlumniRegistration;