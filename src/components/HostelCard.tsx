import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Wifi, UtensilsCrossed, Wind, WashingMachine, Heart } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const facilityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-3.5 w-3.5" />,
  Food: <UtensilsCrossed className="h-3.5 w-3.5" />,
  AC: <Wind className="h-3.5 w-3.5" />,
  Laundry: <WashingMachine className="h-3.5 w-3.5" />,
};

interface HostelCardProps {
  id: string;
  name: string;
  location: string;
  rent: number;
  facilities: string[];
  image: string;
  available: boolean;
  rating: number;
  reviewCount: number;
  type: string;
  gender: string;
}

const HostelCard = ({ id, name, location, rent, facilities, image, available, rating, reviewCount, type, gender }: HostelCardProps) => {
  const [liked, setLiked] = useState(false);
  const { user } = useAuth();

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to save favorites");
      return;
    }
    if (liked) {
      await supabase.from("favorites").delete().eq("user_id", user.id).eq("hostel_id", id);
      setLiked(false);
    } else {
      await supabase.from("favorites").insert({ user_id: user.id, hostel_id: id });
      setLiked(true);
    }
  };

  return (
    <Link to={`/hostel/${id}`} className="group block">
      <div className="hostel-card-shadow overflow-hidden rounded-xl border border-border bg-card">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {image ? (
            <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">No Photo</div>
          )}
          <button onClick={toggleFavorite} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card">
            <Heart className={`h-4 w-4 ${liked ? "fill-primary text-primary" : "text-muted-foreground"}`} />
          </button>
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge variant={available ? "default" : "secondary"} className={available ? "bg-success text-success-foreground" : ""}>
              {available ? "Available" : "Full"}
            </Badge>
            <Badge variant="secondary" className="capitalize">{type}</Badge>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="font-body text-base font-semibold text-foreground group-hover:text-primary transition-colors">{name}</h3>
            {rating > 0 && (
              <div className="flex shrink-0 items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                <span className="text-xs font-semibold text-primary">{rating}</span>
              </div>
            )}
          </div>
          <div className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />{location}
          </div>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {facilities.slice(0, 4).map((f) => (
              <span key={f} className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                {facilityIcons[f] || null}{f}
              </span>
            ))}
          </div>
          <div className="flex items-end justify-between border-t border-border pt-3">
            <div>
              <span className="text-lg font-bold text-foreground">₹{rent.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">/month</span>
            </div>
            <span className="text-xs capitalize text-muted-foreground">{gender === "co-ed" ? "Co-Ed" : gender}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HostelCard;
