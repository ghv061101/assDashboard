import React, { useState } from "react";
import { db } from "../../db";
import { useNavigate } from "react-router-dom";
import "./users.scss";

export interface User {
  id: string;
  role: string;
  email: string;
  password: string;
}

const VALID_ROLES = ['Admin', 'Inspector', 'Engineer'] as const;

const Users: React.FC = () => {
  const [usersState, setUsersState] = useState<User[]>(db.users);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsersState(usersState.filter(user => user.id !== id));
    }
  };

  const handleAddNew = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const role = formData.get('role') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (role && email && password) {
      const newUser: User = {
        id: (Math.max(...usersState.map(u => +u.id)) + 1).toString(),
        role,
        email,
        password,
      };
      setUsersState([...usersState, newUser]);
      setShowAddForm(false);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/users/${id}`);
  };

  return (
    <div className="users">
      <h2>Users List</h2>
      <button className="add-btn" onClick={() => setShowAddForm(true)}>
        Add New User
      </button>

      {showAddForm && (
        <div className="add-user-form">
          <form onSubmit={handleAddNew}>
            <select name="role" required>
              <option value="">Select Role</option>
              {VALID_ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength={6}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Role</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersState.map(({ id, role, email }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{role}</td>
              <td>{email}</td>
              <td>••••••••</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(id)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {usersState.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;