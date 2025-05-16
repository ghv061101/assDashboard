import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../db';
import './jobs.scss';

const ViewJob = () => {
  const { id } = useParams();
  const job = db.jobs.find(j => j.id === id);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    comments: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the application data to a server
    console.log('Application submitted:', formData);
    alert('Application submitted successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="view-job-container">
      <div className="job-details">
        <h2>Job Details</h2>
        <div className="detail-item">
          <strong>Type:</strong> {job.type}
        </div>
        <div className="detail-item">
          <strong>Priority:</strong> {job.priority}
        </div>
        <div className="detail-item">
          <strong>Status:</strong> {job.status}
        </div>
        <div className="detail-item">
          <strong>Scheduled Date:</strong> {job.scheduledDate}
        </div>
      </div>

      <div className="application-form">
        <h3>Apply for this Position</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="experience">Years of Experience</label>
            <input
              type="number"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="comments">Additional Comments</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <button type="submit">Submit Application</button>
        </form>
      </div>
    </div>
  );
};

export default ViewJob;