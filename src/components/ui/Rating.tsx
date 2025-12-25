import React from "react";

interface RatingProps {
  title?: string;
  rate: number;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  readonly: boolean;
}

const Rating: React.FC<RatingProps> = ({ rate, title, size, readonly }) => {
  return (
    <div className='flex items-center'>
      {title && <span className='text-base-content ml-2'>{title}</span>}
      <div className={`rating rating-${size}`}>
        {[...Array(5)].map((_, i) => {
          if (readonly) {
            return (
              <div
                key={i}
                className={`mask mask-star-2 mx-0.5 bg-yellow-200 ${
                  i < rate ? "opacity-100" : ""
                }`}></div>
            );
          } else {
            return (
              <input
                key={i}
                type='radio'
                name={`rating-display`}
                checked={i < rate}
                className={`mask mask-star-2 mx-0.5 bg-yellow-200 ${
                  i < rate ? "opacity-100" : ""
                }`}
                readOnly
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Rating;
