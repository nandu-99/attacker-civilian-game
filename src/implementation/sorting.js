import { useState, useEffect } from "react";
function Sorting(){
    const [users, setUsers] = useState([]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users));
  }, []);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const sortedUsers = users.sort((a, b) => {
    if (sort === "sort a-z asc") {
      return a.firstName.localeCompare(b.firstName);
    } else if (sort === "sort a-z desc") {
      return b.firstName.localeCompare(a.firstName);
    } else if (sort === "sort age asc") {
      return a.age - b.age;
    } else if (sort === "sort age desc") {
      return b.age - a.age;
    }
    return 0;
  });

  return (
    <div className="App">
      <select onChange={handleSortChange}>
        <option value="sort a-z asc">sort a-z asc</option>
        <option value="sort a-z desc">sort a-z desc</option>
        <option value="sort age asc">sort age asc</option>
        <option value="sort age desc">sort age desc</option>
      </select>

      <ul>
        {sortedUsers.map((user) => (
          <li key={user.id}>
            {user.firstName} - Age: {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sorting;
