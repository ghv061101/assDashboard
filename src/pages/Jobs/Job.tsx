import { useNavigate } from 'react-router-dom';
import './jobs.scss';
import { db } from '../../db';

const Job = () => {
  const navigate = useNavigate();

  const handleView = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div className="jobs-container">
      <table className="jobs-table">
        <thead>
          <tr>
            <th>Job Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {db.jobs.map((job) => (
            <tr key={job.id}>
              <td>
                <div className="job-info">
                  <h3>{job.type}</h3>
                  <p>Priority: {job.priority}</p>
                  <p>Status: {job.status}</p>
                </div>
              </td>
              <td>
                <button 
                  className="view-button"
                  onClick={() => handleView(job.id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Job;