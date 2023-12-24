import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "reactstrap";
import "../assets/css/star_rating.css";

const StarRating = ({ onChange, initValue = 1, lengthStars = 10 }) => {
  const [rating, setRating] = useState(initValue);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    if (onChange) {
      onChange(selectedRating);
    }
  };

  const renderStars = () => {
    return Array.from({ length: lengthStars }, (_, index) => (
      <Button
        key={index + 1}
        className="star-rating-button"
        onClick={() => handleStarClick(index + 1)}
        style={{
          color: index < rating ? "var(--yellow)" : "var(--gray-two)",
        }}
      >
        <FaStar />
      </Button>
    ));
  };

  return (
    <div className="star-rating-container">
      {renderStars()}
      <span className="star-rating-container-text">
        ({`0${rating}`.slice(-2)})
      </span>
    </div>
  );
};

export default StarRating;
