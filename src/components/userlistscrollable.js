import React, { useEffect, useState } from 'react';

import AdminService from '../services/admin.service';


function UsersList() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await AdminService.getAllUsers();
        if (response.data && response.data.length > 0) {
          setUsers(response.data);
        } else {
          setMessage('No users available.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setMessage('Failed to fetch users.');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await AdminService.deleteUserById(userId);
        setUsers(users.filter((user) => user.id !== userId));
        setMessage('User deleted successfully.');
      } catch (error) {
        console.error('Error deleting user:', error);
        setMessage('Failed to delete user. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>All Users</h2>
      {message && <p className="message">{message}</p>}
      {users.length > 0 ? (
        <div className="scrollable-users-container">
          {users.map((user) => (
            <div key={user.id} className="user-item">
              <h1>ID:{user.id}</h1>
              <h3> Username: {user.username}</h3>
              <h3>Email: {user.email}</h3>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        !message && <p>Loading users...</p>
      )}
    </div>
  );
}

export default UsersList;
