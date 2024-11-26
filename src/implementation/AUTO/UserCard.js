// UserCard.js
import React from 'react';

const UserCard = ({ user }) => (
  <div className="user-card">
    <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
    <h3>{`${user.firstName} ${user.lastName}`}</h3>
    <p>Age: {user.age}</p>
    <p>Gender: {user.gender}</p>
  </div>
);

export default UserCard;
