import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../db";
import "./signup.scss";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const existingUser = db.users.find(u => u.email === email);
    if (existingUser) {
      setError("An account with this email already exists.");
      return;
    }

    setIsLoading(true);

    try {
      const newUser = {
        id: Date.now().toString(),
        email,
        password, // Note: never store plaintext passwords in real apps!
        role: "user",
      };

      db.users.push(newUser);

      alert("Account created successfully! You can now log in.");
      navigate("/login");
    } catch (err) {
      setError("An error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        <h2>Create Account</h2>

        {error && <div className="error-message">{error}</div>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={isLoading}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
          required
          disabled={isLoading}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          required
          disabled={isLoading}
        />

        <button type="submit" className="signup-btn" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
