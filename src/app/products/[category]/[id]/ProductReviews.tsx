import RatingStars from '@/components/common/RatingStars';

import formatDate from '@/lib/helpers/formatDate';

import type { Product } from '@/types/product';

export default function ProductReviews({ reviews }: { reviews: Product['reviews'] }) {
  if (!reviews?.length) return null;

  return (
    <section className="space-y-4 pb-10">
      <h2 className="text-xl font-semibold pl-1.5">Reviews</h2>

      {reviews.map(({ reviewerName, rating, comment, date }, index) => (
        <div key={`${reviewerName}-${date}-${index}`} className="border rounded-md p-4">
          <div className="font-medium">{reviewerName}</div>
          <div className="text-sm text-muted-foreground">{formatDate(date)}</div>
          <RatingStars rating={rating} />
          <p className="mt-2">{comment}</p>
        </div>
      ))}
    </section>
  );
}
