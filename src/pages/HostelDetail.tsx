import { useParams, Link } from "react-router-dom";
import { hostels } from "@/data/hostels";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Phone, Star, User, Wifi, UtensilsCrossed, Wind, WashingMachine, Dumbbell, Zap, Car, Waves } from "lucide-react";
import { useState } from "react";

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

const HostelDetail = () => {
  const { id } = useParams();
  const hostel = hostels.find((h) => h.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!hostel) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-32 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Hostel Not Found</h1>
          <p className="mt-2 text-muted-foreground">The hostel you're looking for doesn't exist.</p>
          <Link to="/"><Button className="mt-6">Back to Home</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to listings
        </Link>

        {/* Image gallery */}
        <div className="mb-8 grid gap-3 lg:grid-cols-[1fr_300px]">
          <div className="overflow-hidden rounded-xl">
            <img
              src={hostel.images[selectedImage]}
              alt={hostel.name}
              className="h-[400px] w-full object-cover transition-opacity duration-300"
            />
          </div>
          <div className="flex gap-3 lg:flex-col">
            {hostel.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`overflow-hidden rounded-lg border-2 transition-colors ${i === selectedImage ? "border-primary" : "border-transparent"}`}
              >
                <img src={img} alt="" className="h-24 w-full object-cover lg:h-[120px]" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          {/* Main content */}
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
            <div className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
              📍 {hostel.distanceFromCollege}
            </div>

            <p className="mb-8 leading-relaxed text-foreground/80">{hostel.description}</p>

            {/* Facilities */}
            <h2 className="mb-4 font-display text-xl font-bold text-foreground">Facilities</h2>
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {hostel.facilities.map((f) => (
                <div key={f} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <div className="text-primary">{allFacilityIcons[f] || null}</div>
                  <span className="text-sm font-medium text-foreground">{f}</span>
                </div>
              ))}
            </div>

            {/* Reviews */}
            <h2 className="mb-4 font-display text-xl font-bold text-foreground">
              Reviews ({hostel.reviewCount})
            </h2>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="text-lg font-bold text-primary">{hostel.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">based on {hostel.reviewCount} reviews</span>
            </div>
            <div className="space-y-4">
              {hostel.reviews.map((review) => (
                <div key={review.id} className="rounded-lg border border-border bg-card p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                        <User className="h-4 w-4 text-secondary-foreground" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{review.userName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < review.rating ? "fill-primary text-primary" : "text-border"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80">{review.comment}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{review.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 text-center">
                <span className="text-3xl font-bold text-foreground">₹{hostel.rent.toLocaleString()}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <div className="mb-6 space-y-3 text-sm">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Owner</span>
                  <span className="font-medium text-foreground">{hostel.ownerName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium capitalize text-foreground">{hostel.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">For</span>
                  <span className="font-medium capitalize text-foreground">{hostel.gender}</span>
                </div>
              </div>
              <Button className="mb-3 w-full gap-2" size="lg">
                <Phone className="h-4 w-4" />
                Contact Owner
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                Schedule Visit
              </Button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                📞 {hostel.ownerContact}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HostelDetail;
