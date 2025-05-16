import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./profile.scss";

interface FormData {
  id?: string;
  email?: string;
  role?: string;
  experience?: string;
  [key: string]: string | undefined; // Add index signature for dynamic keys
  plusOneInstitute?: string;
  plusOneYear?: string;
  plusOneCgpa?: string;
  plusTwoInstitute?: string;
  plusTwoYear?: string;
  plusTwoCgpa?: string;
  btechInstitute?: string;
  btechYear?: string;
  btechCgpa?: string;
  mtechInstitute?: string;
  mtechYear?: string;
  mtechCgpa?: string;
}

const LOCAL_STORAGE_KEY = "profileData";

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<FormData>({});

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error parsing saved data:", error);
        setFormData({
          id: user.id,
          email: user.email,
          role: user.role,
        });
      }
    } else {
      setFormData({
        id: user.id,
        email: user.email,
        role: user.role,
      });
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    if (editMode) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    }
    setEditMode(!editMode);
  };

  const renderEducationCard = (key: keyof FormData, label: string) => (
    <div className="card" key={key}>
      <h3>{label}</h3>
      {editMode ? (
        <>
          <label>
            Institute Name
            <input
              type="text"
              name={`${key}Institute`}
              value={formData[`${key}Institute`] || ""}
              onChange={handleInputChange}
              placeholder="Enter institute name"
            />
          </label>
          <label>
            Year of Passing
            <input
              type="number"
              name={`${key}Year`}
              value={formData[`${key}Year`] || ""}
              onChange={handleInputChange}
              placeholder="Enter year"
              min="1900"
              max={new Date().getFullYear()}
            />
          </label>
          <label>
            CGPA / Percentage
            <input
              type="text"
              name={`${key}Cgpa`}
              value={formData[`${key}Cgpa`] || ""}
              onChange={handleInputChange}
              placeholder="Enter CGPA or %"
              pattern="^\d{1,2}(\.\d{1,2})?$"
              title="Please enter a valid CGPA/Percentage"
            />
          </label>
        </>
      ) : (
        <>
          <p><strong>Institute:</strong> {formData[`${key}Institute`] || "-"}</p>
          <p><strong>Year:</strong> {formData[`${key}Year`] || "-"}</p>
          <p><strong>CGPA/Percentage:</strong> {formData[`${key}Cgpa`] || "-"}</p>
        </>
      )}
    </div>
  );

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      <div className="cards-grid">
        <div className="card">
          <h3>Basic Information</h3>
          <p><strong>ID:</strong> {formData.id}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Role:</strong> {formData.role}</p>
          <label>
            Experience (years)
            {editMode ? (
              <input
                type="number"
                name="experience"
                value={formData.experience || ""}
                onChange={handleInputChange}
                placeholder="Enter experience in years"
                min="0"
                max="50"
              />
            ) : (
              <p>{formData.experience || "-"} years</p>
            )}
          </label>
        </div>

        {renderEducationCard("plusOne", "+1 (Intermediate)")}
        {renderEducationCard("plusTwo", "+2 (Senior Secondary)")}
        {renderEducationCard("btech", "B.Tech")}
        {renderEducationCard("mtech", "M.Tech")}
      </div>

      <div className="button-group">
        <button className="edit-btn" onClick={handleEditToggle}>
          {editMode ? "Save" : "Edit"}
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;