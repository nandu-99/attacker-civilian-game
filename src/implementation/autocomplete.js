import React, { useState } from 'react';

function Autocomplete({ suggestions }) {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div style={{ width: '200px' }}>
            <input
                type="text"
                list="suggestions"
                value={query}
                onChange={handleChange}
                placeholder="Type to search"
            />
            <datalist id="suggestions">
                {suggestions.map((suggestion, index) => (
                    <option key={index} value={suggestion} />
                ))}
            </datalist>
        </div>
    );
}

export default Autocomplete
