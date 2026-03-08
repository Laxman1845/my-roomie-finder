import { Search, MapPin, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import heroImg from "@/assets/hostel-1.jpg";

const popularCities = ["Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad", "Pune", "Kolkata", "Jaipur"];

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const HeroSection = ({ searchQuery, onSearchChange }: HeroSectionProps) => {
  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    toast.loading("Detecting your location...", { id: "geo" });
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
          );
          const data = await res.json();
          const city = data.address?.city || data.address?.town || data.address?.state_district || data.address?.state || "";
          if (city) {
            onSearchChange(city);
            toast.success(`Location detected: ${city}`, { id: "geo" });
          } else {
            toast.error("Could not determine your city", { id: "geo" });
          }
        } catch {
          toast.error("Failed to detect location", { id: "geo" });
        }
      },
      () => toast.error("Location access denied", { id: "geo" }),
      { timeout: 10000 }
    );
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Student hostel" className="h-full w-full object-cover" />
        <div className="gradient-hero-overlay absolute inset-0" />
      </div>
      <div className="relative z-10 flex flex-col items-center px-4 py-20 text-center md:py-32">
        <h1 className="mb-4 max-w-3xl animate-fade-in-up font-display text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
          Find Your Perfect Stay
        </h1>
        <p className="mb-8 max-w-xl animate-fade-in-up text-lg text-primary-foreground/80 [animation-delay:0.1s]">
          Discover hostels & PGs near your college. Compare prices, facilities, and reviews — all in one place.
        </p>

        {/* Search bar */}
        <div className="flex w-full max-w-2xl animate-fade-in-up items-center gap-2 rounded-xl bg-card p-2 shadow-lg [animation-delay:0.2s]">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Enter your city, area or college..."
              className="border-0 bg-transparent pl-10 text-foreground shadow-none focus-visible:ring-0"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" onClick={detectLocation} title="Use my location" className="shrink-0">
            <Navigation className="h-4 w-4" />
          </Button>
          <Button size="lg" className="shrink-0 gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>

        {/* Popular cities */}
        <div className="mt-5 flex animate-fade-in-up flex-wrap justify-center gap-2 [animation-delay:0.3s]">
          <span className="text-xs text-primary-foreground/60">Popular:</span>
          {popularCities.map((city) => (
            <button
              key={city}
              onClick={() => onSearchChange(city)}
              className="rounded-full border border-primary-foreground/20 px-3 py-1 text-xs text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
