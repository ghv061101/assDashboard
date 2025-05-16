import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./users.scss";

interface User {
  id: string;
  role: string;
  email: string;
  password: string;
}

const ViewUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Access usersState and setUsersState passed from Users component
  const usersState: User[] = location.state?.usersState || [];
  const setUsersState: React.Dispatch<React.SetStateAction<User[]>> = location.state?.setUsersState;

  const foundUser = usersState.find(u => u.id === id);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (foundUser) setUser(foundUser);
  }, [foundUser]);

  if (!user) return <div>User not found</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = () => {
    if (!user || !setUsersState) return;

    const updatedUsers = usersState.map(u => (u.id === user.id ? user : u));
    setUsersState(updatedUsers);
    alert("User details updated");
    navigate("/users");
  };

  return (
    <div className="view-user">
      <h2>Edit User: {user.id}</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <label>
          Role:
          <select name="role" value={user.role} onChange={handleChange} required>
            <option value="Admin">Admin</option>
            <option value="Inspector">Inspector</option>
            <option value="Engineer">Engineer</option>
          </select>
        </label>
        <label>
          Email:
          <input name="email" type="email" value={user.email} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input name="password" type="text" value={user.password} onChange={handleChange} required />
        </label>
        <div className="buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate("/users")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ViewUser;
