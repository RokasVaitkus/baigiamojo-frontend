// components/CreateUser.js
import React, { useState } from 'react';
import LoginService from '../services/login.service'; // Use LoginService for registration
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
    console.log("CreateUser component rendered");
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState({ admin: false, user: false }); // State to manage roles
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    const { name, checked } = e.target;
    setRoles((prevRoles) => ({
      ...prevRoles,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedRoles = Object.keys(roles).filter(role => roles[role]); // Get selected roles
    try {
      await LoginService.register({ username, email, role: selectedRoles, password }); // Use LoginService for registration
      setMessage('User created successfully!');
      navigate('/admin'); // Navigate back to Admin Board or to another page
    } catch (error) {
      console.error('Error creating user:', error);
      setMessage('Failed to create user. Please try again.');
    }
  };

  return (
    <div className="admin-container">
    <div>
      <h2>Create New User</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Roles:</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="admin"
                checked={roles.admin}
                onChange={handleRoleChange}
              />
              Admin
            </label>
            <label>
              <input
                type="checkbox"
                name="user"
                checked={roles.user}
                onChange={handleRoleChange}
              />
              User
            </label>
          </div>
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='btn' type="submit">Create User</button>
      </form>
    </div>
    </div>
  );
};

export default CreateUser;
