import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  priceRange: number[];
  onPriceChange: (value: number[]) => void;
  selectedCity: string;
  onCityChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  selectedGender: string;
  onGenderChange: (value: string) => void;
}

const FilterBar = ({
  priceRange,
  onPriceChange,
  selectedCity,
  onCityChange,
  selectedType,
  onTypeChange,
  selectedGender,
  onGenderChange,
}: FilterBarProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-4 md:p-6">
      <div className="mb-4 flex items-center gap-2">
        <SlidersHorizontal className="h-5 w-5 text-primary" />
        <h3 className="font-body text-sm font-semibold text-foreground">Filters</h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">City</label>
          <Select value={selectedCity} onValueChange={onCityChange}>
            <SelectTrigger><SelectValue placeholder="All Cities" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="Bangalore">Bangalore</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Delhi">Delhi</SelectItem>
              <SelectItem value="Chennai">Chennai</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Type</label>
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger><SelectValue placeholder="All Types" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="hostel">Hostel</SelectItem>
              <SelectItem value="pg">PG</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Gender</label>
          <Select value={selectedGender} onValueChange={onGenderChange}>
            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="boys">Boys</SelectItem>
              <SelectItem value="girls">Girls</SelectItem>
              <SelectItem value="co-ed">Co-Ed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Max Rent: ₹{priceRange[0].toLocaleString()}
          </label>
          <Slider
            value={priceRange}
            onValueChange={onPriceChange}
            max={20000}
            min={3000}
            step={500}
            className="mt-3"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
