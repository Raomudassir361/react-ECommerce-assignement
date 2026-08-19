import React from "react";
import { Star } from "lucide-react";

export default function StarRating({
  rating = 4.5,
  showScore = true,
  size = "sm",
}) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3;
  const starSize = size === "sm" ? 16 : 20;

  return (
    <div className="flex items-center gap-1.5" id={`rating-${rating}`}>
      <div className="flex items-center text-[#FFC633]">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          if (starIndex <= fullStars) {
            return (
              <Star
                key={starIndex}
                size={starSize}
                className="fill-[#FFC633] text-[#FFC633]"
              />
            );
          } else if (starIndex === fullStars + 1 && hasHalfStar) {
            return (
              <div key={starIndex} className="relative inline-block">
                <Star size={starSize} className="text-[#FFC633]" />
                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${(rating % 1) * 100}%` }}
                >
                  <Star
                    size={starSize}
                    className="fill-[#FFC633] text-[#FFC633]"
                  />
                </div>
              </div>
            );
          } else {
            return (
              <Star
                key={starIndex}
                size={starSize}
                className="text-gray-300 fill-transparent"
              />
            );
          }
        })}
      </div>
      {showScore && (
        <span className="text-xs sm:text-sm font-medium text-black ml-0.5">
          {rating.toFixed(1)}
          <span className="text-gray-400 font-normal">/5</span>
        </span>
      )}
    </div>
  );
}
