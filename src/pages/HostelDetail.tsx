import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewSection from "@/components/ReviewSection";
import PhotoUpload from "@/components/PhotoUpload";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Phone, Star, Wifi, UtensilsCrossed, Wind, WashingMachine, Dumbbell, Zap, Car, Waves } from "lucide-react";
import { useState, useEffect } from "react";

const allFacilityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-5 w-5" />,
  Food: <UtensilsCrossed className="h-5 w-5" />,
  AC: <Wind className="h-5 w-5" />,
  Laundry: <WashingMachine className="h-5 w-5" />,
  Gym: <Dumbbell className="h-5 w-5" />,
  "Power Backup": <Zap className="h-5 w-5" />,
  Parking: <Car className="h-5 w-5" />,
  "Swimming Pool": <Waves className="h-5 w-5" />,
};

interface HostelData {
  id: string;
  name: string;
  location: string;
  city: string;
  rent: number;
  type: string;
  gender: string;
  facilities: string[];
  available: boolean;
  description: string | null;
  distance_from_college: string | null;
  owner_contact: string | null;
  owner_name: string | null;
  owner_id: string;
}

interface PhotoData {
  id: string;
  photo_url: string;
  uploaded_by: string;
}

interface ReviewData {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  user_id: string;
  profile: { display_name: string | null } | null;
}

const HostelDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [hostel, setHostel] = useState<HostelData | null>(null);
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!id) return;

    const [hostelRes, photosRes, reviewsRes] = await Promise.all([
      supabase.from("hostels").select("*").eq("id", id).single(),
      supabase.from("hostel_photos").select("id, photo_url, uploaded_by").eq("hostel_id", id),
      supabase.from("reviews").select("id, rating, comment, created_at, user_id, profile:profiles(display_name)").eq("hostel_id", id).order("created_at", { ascending: false }),
    ]);

    if (hostelRes.data) setHostel(hostelRes.data as HostelData);
    if (photosRes.data) setPhotos(photosRes.data as PhotoData[]);
    if (reviewsRes.data) setReviews(reviewsRes.data as unknown as ReviewData[]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hostel) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-32 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Hostel Not Found</h1>
          <Link to="/"><Button className="mt-6">Back to Home</Button></Link>
        </div>
      </div>
    );
  }

  const avgRating = reviews.length > 0
    ? Math.round((reviews.reduce((a, r) => a + r.rating, 0) / reviews.length) * 10) / 10
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to listings
        </Link>

        {/* Image gallery */}
        {photos.length > 0 && (
          <div className="mb-8 grid gap-3 lg:grid-cols-[1fr_300px]">
            <div className="overflow-hidden rounded-xl">
              <img src={photos[selectedImage]?.photo_url} alt={hostel.name} className="h-[400px] w-full object-cover" />
            </div>
            <div className="flex gap-3 lg:flex-col">
              {photos.map((p, i) => (
                <button key={p.id} onClick={() => setSelectedImage(i)}
                  className={`overflow-hidden rounded-lg border-2 transition-colors ${i === selectedImage ? "border-primary" : "border-transparent"}`}>
                  <img src={p.photo_url} alt="" className="h-24 w-full object-cover lg:h-[120px]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Photo upload */}
        <PhotoUpload hostelId={hostel.id} onUpload={fetchData} />

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant={hostel.available ? "default" : "secondary"} className={hostel.available ? "bg-success text-success-foreground" : ""}>
                {hostel.available ? "Available" : "Full"}
              </Badge>
              <Badge variant="secondary" className="capitalize">{hostel.type}</Badge>
              <Badge variant="outline" className="capitalize">{hostel.gender}</Badge>
            </div>
            <h1 className="mb-2 font-display text-3xl font-bold text-foreground">{hostel.name}</h1>
            <div className="mb-1 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />{hostel.location}, {hostel.city}
            </div>
            {hostel.distance_from_college && (
              <div className="mb-6 text-sm text-muted-foreground">📍 {hostel.distance_from_college}</div>
            )}

            {hostel.description && <p className="mb-8 leading-relaxed text-foreground/80">{hostel.description}</p>}

            <h2 className="mb-4 font-display text-xl font-bold text-foreground">Facilities</h2>
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {hostel.facilities.map((f) => (
                <div key={f} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <div className="text-primary">{allFacilityIcons[f] || null}</div>
                  <span className="text-sm font-medium text-foreground">{f}</span>
                </div>
              ))}
            </div>

            {/* Reviews section */}
            <ReviewSection hostelId={hostel.id} reviews={reviews} avgRating={avgRating} onReviewAdded={fetchData} />
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 text-center">
                <span className="text-3xl font-bold text-foreground">₹{hostel.rent.toLocaleString()}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <div className="mb-6 space-y-3 text-sm">
                {hostel.owner_name && (
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Owner</span>
                    <span className="font-medium text-foreground">{hostel.owner_name}</span>
                  </div>
                )}
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium capitalize text-foreground">{hostel.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">For</span>
                  <span className="font-medium capitalize text-foreground">{hostel.gender === "co-ed" ? "Co-Ed" : hostel.gender}</span>
                </div>
              </div>
              <Button className="mb-3 w-full gap-2" size="lg">
                <Phone className="h-4 w-4" /> Contact Owner
              </Button>
              {hostel.owner_contact && (
                <p className="mt-4 text-center text-xs text-muted-foreground">📞 {hostel.owner_contact}</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HostelDetail;
