import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hostel-1.jpg";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const HeroSection = ({ searchQuery, onSearchChange }: HeroSectionProps) => {
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
        <div className="flex w-full max-w-2xl animate-fade-in-up items-center gap-2 rounded-xl bg-card p-2 shadow-lg [animation-delay:0.2s]">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by city, area or college..."
              className="border-0 bg-transparent pl-10 text-foreground shadow-none focus-visible:ring-0"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <Button size="lg" className="shrink-0 gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
