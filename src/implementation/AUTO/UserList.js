// UserList.js
import React, { useState } from 'react';
import UserCard from './UserCard';
import SearchBar from './SearchBar';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchUsers = async (searchQuery, newPage) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://dummyjson.com/users/search?q=${searchQuery}&limit=10&skip=${newPage * 10}`
      );
      const data = await response.json();

      if (data.users.length > 0) {
        setUsers((prevUsers) => (newPage === 0 ? data.users : [...prevUsers, ...data.users]));
        setHasMore(data.users.length === 10);  // True if there are 10 users, meaning more could be available
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError('Failed to fetch users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(0);
    fetchUsers(searchQuery, 0);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUsers(query, nextPage);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {users.length === 0 && !loading && !error && <p>No results found.</p>}
      <div className="user-list">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      {hasMore && !loading && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};

export default UserList;
