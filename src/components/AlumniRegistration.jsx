import React, { useState } from 'react';
import axios from 'axios';
import './AlumniRegistration.css';

const AlumniRegistration = () => {
    const [formData, setFormData] = useState({
        fullName: '', // মডেলের সাথে মিল রেখে fullName দিলাম
        photoUrl: '', // মডেলের সাথে মিল রেখে photoUrl দিলাম
        department: '',
        graduationYear: '',
        recentInvolvement: '',
        country: '' // দেশ ইনপুট দেওয়ার জন্য নতুন ফিল্ড
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // তোমার ব্যাকএন্ড পোর্টের সাথে মিলিয়ে URL টা চেক করে নিও (যেমন: http://localhost:5000)
            const response = await axios.post('https://mu-reach-awarness-project.onrender.com/api/alumni/register', formData);
            if (response.data.success) {
                alert("Registration Successful!");
                window.location.reload(); // ডাটা সেভ হলে পেজ রিলোড হবে যাতে লিস্টে নাম দেখা যায়
            }
        } catch (err) {
            console.error("Error saving alumni:", err);
            alert("Something went wrong!");
        }
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
                        <input type="text" name="fullName" placeholder="Enter your full name" onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label>Profile Photo URL</label>
                        <input type="text" name="photoUrl" placeholder="Paste image link (Cloudinary/Google Drive)" onChange={handleChange} className="form-input"/>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <label>Department</label>
                            <input type="text" name="department" placeholder="e.g. CSE" onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Graduation Year</label>
                            <input type="number" name="graduationYear" placeholder="e.g. 2024" onChange={handleChange} required />
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
                    <div className="input-group">
                        <label>Country</label>
                        <textarea 
                            name="country" 
                            //placeholder="Current Company, University, or Startup..." 
                            //rows="4"
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