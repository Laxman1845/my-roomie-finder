import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, User } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  user_id: string;
  profile: { display_name: string | null } | null;
}

interface ReviewSectionProps {
  hostelId: string;
  reviews: Review[];
  avgRating: number;
  onReviewAdded: () => void;
}

const ReviewSection = ({ hostelId, reviews, avgRating, onReviewAdded }: ReviewSectionProps) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const hasReviewed = reviews.some((r) => r.user_id === user?.id);

  const handleSubmit = async () => {
    if (!user) return;
    if (rating === 0) { toast.error("Please select a rating"); return; }

    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      hostel_id: hostelId,
      user_id: user.id,
      rating,
      comment: comment.trim() || null,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Review added!");
      setRating(0);
      setComment("");
      onReviewAdded();
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h2 className="mb-4 font-display text-xl font-bold text-foreground">
        Reviews ({reviews.length})
      </h2>

      {avgRating > 0 && (
        <div className="mb-6 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <span className="text-lg font-bold text-primary">{avgRating}</span>
          </div>
          <span className="text-sm text-muted-foreground">based on {reviews.length} reviews</span>
        </div>
      )}

      {/* Add review form */}
      {user && !hasReviewed ? (
        <div className="mb-6 rounded-lg border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Write a Review</h3>
          <div className="mb-3 flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onMouseEnter={() => setHoverRating(s)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(s)}
              >
                <Star className={`h-6 w-6 ${s <= (hoverRating || rating) ? "fill-primary text-primary" : "text-border"}`} />
              </button>
            ))}
          </div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            className="mb-3"
            maxLength={500}
          />
          <Button onClick={handleSubmit} disabled={submitting} size="sm">
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      ) : !user ? (
        <div className="mb-6 rounded-lg border border-border bg-muted p-4 text-center">
          <p className="text-sm text-muted-foreground">
            <Link to="/auth" className="font-medium text-primary hover:underline">Sign in</Link> to write a review
          </p>
        </div>
      ) : null}

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-lg border border-border bg-card p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {review.profile?.display_name || "Anonymous"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-primary text-primary" : "text-border"}`} />
                ))}
              </div>
            </div>
            {review.comment && <p className="text-sm text-foreground/80">{review.comment}</p>}
            <p className="mt-2 text-xs text-muted-foreground">{new Date(review.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
