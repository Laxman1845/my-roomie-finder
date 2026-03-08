import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import HostelCard from "@/components/HostelCard";
import Footer from "@/components/Footer";
import { hostels } from "@/data/hostels";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([20000]);
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");

  const filteredHostels = useMemo(() => {
    return hostels.filter((h) => {
      const matchesSearch =
        !searchQuery ||
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = h.rent <= priceRange[0];
      const matchesCity = selectedCity === "all" || h.city === selectedCity;
      const matchesType = selectedType === "all" || h.type === selectedType;
      const matchesGender = selectedGender === "all" || h.gender === selectedGender;
      return matchesSearch && matchesPrice && matchesCity && matchesType && matchesGender;
    });
  }, [searchQuery, priceRange, selectedCity, selectedType, selectedGender]);

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
        />

        <div className="mt-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-foreground">
            {filteredHostels.length} {filteredHostels.length === 1 ? "Stay" : "Stays"} Found
          </h2>
        </div>

        {filteredHostels.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredHostels.map((hostel) => (
              <HostelCard key={hostel.id} hostel={hostel} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-lg font-medium text-muted-foreground">No hostels found matching your criteria.</p>
            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search query.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
