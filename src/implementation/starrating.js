import React, { useState } from 'react';

function StarRating({ totalStars = 5 }) {
    const [rating, setRating] = useState(0);

    const handleClick = (index) => {
        setRating(index);
    };

    return (
        <div>
            {[...Array(totalStars)].map((_, index) => {
                const starIndex = index + 1;
                return (
                    <span
                        key={index}
                        onClick={() => handleClick(starIndex)}
                        style={{
                            fontSize: '24px',
                            cursor: 'pointer',
                            color: starIndex <= rating ? 'gold' : 'gray'
                        }}
                    >
                        ★
                    </span>
                );
            })}
            <p>{rating} out of {totalStars} stars</p>
        </div>
    );
}

export default StarRating;
