import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import HostelCard from "@/components/HostelCard";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

interface HostelRow {
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
  owner_name: string | null;
  photos: { photo_url: string }[];
  reviews: { rating: number }[];
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([20000]);
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [hostels, setHostels] = useState<HostelRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostels = async () => {
      const { data, error } = await supabase
        .from("hostels")
        .select("*, photos:hostel_photos(photo_url), reviews(rating)")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setHostels(data as unknown as HostelRow[]);
      }
      setLoading(false);
    };
    fetchHostels();
  }, []);

  const filteredHostels = useMemo(() => {
    return hostels.filter((h) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q) || h.city.toLowerCase().includes(q);
      const matchesPrice = h.rent <= priceRange[0];
      const matchesCity = selectedCity === "all" || h.city === selectedCity;
      const matchesType = selectedType === "all" || h.type === selectedType;
      const matchesGender = selectedGender === "all" || h.gender === selectedGender;
      return matchesSearch && matchesPrice && matchesCity && matchesType && matchesGender;
    });
  }, [hostels, searchQuery, priceRange, selectedCity, selectedType, selectedGender]);

  const cities = useMemo(() => [...new Set(hostels.map(h => h.city))], [hostels]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="container mx-auto px-4 py-8">
        <FilterBar
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedGender={selectedGender}
          onGenderChange={setSelectedGender}
          cities={cities}
        />

        <div className="mt-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-foreground">
            {loading ? "Loading..." : `${filteredHostels.length} ${filteredHostels.length === 1 ? "Stay" : "Stays"} Found`}
          </h2>
        </div>

        {filteredHostels.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredHostels.map((hostel) => {
              const avgRating = hostel.reviews.length > 0
                ? hostel.reviews.reduce((a, r) => a + r.rating, 0) / hostel.reviews.length
                : 0;
              return (
                <HostelCard
                  key={hostel.id}
                  id={hostel.id}
                  name={hostel.name}
                  location={`${hostel.location}, ${hostel.city}`}
                  rent={hostel.rent}
                  facilities={hostel.facilities}
                  image={hostel.photos[0]?.photo_url || ""}
                  available={hostel.available}
                  rating={Math.round(avgRating * 10) / 10}
                  reviewCount={hostel.reviews.length}
                  type={hostel.type}
                  gender={hostel.gender}
                />
              );
            })}
          </div>
        ) : !loading ? (
          <div className="mt-16 text-center">
            <p className="text-lg font-medium text-muted-foreground">No hostels found matching your criteria.</p>
            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search query.</p>
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
