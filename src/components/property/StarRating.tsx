
"use client";
import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
  className?: string;
  showText?: boolean;
}

export function StarRating({ rating, totalStars = 5, size = 16, className, showText = false }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = totalStars - fullStars - halfStar;

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} fill="currentColor" className="text-yellow-400" style={{ width: size, height: size }} />
      ))}
      {halfStar === 1 && (
        <StarHalf key="half" fill="currentColor" className="text-yellow-400" style={{ width: size, height: size }} />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="text-yellow-400" style={{ width: size, height: size }} />
      ))}
      {showText && <span className="ml-2 text-sm text-muted-foreground">({rating.toFixed(1)})</span>}
    </div>
  );
}

interface StarInputProps {
  rating: number;
  setRating: (rating: number) => void;
  totalStars?: number;
  size?: number;
  className?: string;
  disabled?: boolean;
}

export function StarInput({ rating, setRating, totalStars = 5, size = 24, className, disabled = false }: StarInputProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            type="button"
            key={starValue}
            disabled={disabled}
            onClick={() => !disabled && setRating(starValue)}
            onMouseEnter={() => !disabled && setRating(starValue)} // Optional: for hover effect
            className={cn("cursor-pointer transition-colors", disabled && "cursor-not-allowed opacity-50")}
            aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
          >
            <Star
              fill={starValue <= rating ? "currentColor" : "none"}
              className={cn(
                "text-yellow-400 hover:text-yellow-500",
                starValue <= rating ? "text-yellow-500" : "text-gray-300"
              )}
              style={{ width: size, height: size }}
            />
          </button>
        );
      })}
    </div>
  );
}
