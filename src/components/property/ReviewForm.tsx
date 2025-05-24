
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StarInput } from '@/components/property/StarRating';
import { useToast } from '@/hooks/use-toast';
import type { Review } from '@/lib/data';

interface ReviewFormProps {
  propertyId: string;
  onReviewSubmit: (newReview: Review) => void;
}

export function ReviewForm({ propertyId, onReviewSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim() || !userName.trim()) {
      toast({
        title: "Incomplete Review",
        description: "Please provide a rating, comment, and your name.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newReviewData = {
      userName,
      rating,
      comment,
      // avatar will be handled by mock data or a real backend
    };
    
    // In a real app, you would call an API here.
    // For now, we use a function passed from the parent to update mock data.
    // This requires the `addReviewToProperty` function to be enhanced or called correctly.
    // This is a simplified mock addition:
    const fullNewReview: Review = {
        ...newReviewData,
        id: `review-${Date.now()}`,
        propertyId,
        date: new Date().toISOString(),
    };

    onReviewSubmit(fullNewReview);

    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });

    // Reset form
    setRating(0);
    setComment('');
    setUserName('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-card">
      <div>
        <Label htmlFor="userName" className="font-semibold">Your Name</Label>
        <Input
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label className="font-semibold">Your Rating</Label>
        <StarInput rating={rating} setRating={setRating} size={28} className="mt-1" />
      </div>
      <div>
        <Label htmlFor="comment" className="font-semibold">Your Review</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this property..."
          rows={4}
          required
          className="mt-1"
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
}
