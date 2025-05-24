
import type { Review } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarRating } from '@/components/property/StarRating';
import { format } from 'date-fns';

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-muted-foreground">No reviews yet for this property.</p>;
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="flex space-x-4 pb-4 border-b last:border-b-0">
          <Avatar>
            <AvatarImage src={review.avatar || `https://placehold.co/40x40.png?text=${review.userName.charAt(0)}`} alt={review.userName} data-ai-hint="person avatar"/>
            <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">{review.userName}</h4>
              <time dateTime={review.date} className="text-xs text-muted-foreground">
                {format(new Date(review.date), 'MMM d, yyyy')}
              </time>
            </div>
            <StarRating rating={review.rating} size={14} className="my-1" />
            <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
