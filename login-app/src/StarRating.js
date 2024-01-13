import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const InteractiveStarRating = ({ onRate, initialRating }) => {
  const [rating, setRating] = useState(initialRating || 0);

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
    onRate(clickedRating); // Call the onRate prop with the selected rating
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((ratingValue) => (
        <FaStar
          key={ratingValue}
          color={ratingValue <= rating ? '#FFD700' : '#C0C0C0'}
          size={20}
          style={{ marginRight: '2px', cursor: 'pointer' }}
          onClick={() => handleStarClick(ratingValue)}
        />
      ))}
    </div>
  );
};

export default InteractiveStarRating;
