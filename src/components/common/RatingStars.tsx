import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
}

export default function RatingStars({ rating }: RatingStarsProps) {
  const fullStars = rating ? Math.trunc(rating) : 0;

  return (
    <>
      {rating && (
        <div className="mt-1 flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < fullStars ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-1 text-xs text-muted-foreground">{rating.toFixed(2)}</span>
        </div>
      )}
    </>
  );
}
