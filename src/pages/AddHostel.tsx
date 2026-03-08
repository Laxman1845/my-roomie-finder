import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRef } from "react";

const facilityOptions = ["WiFi", "Food", "AC", "Laundry", "Gym", "Power Backup", "Parking", "Swimming Pool"];

const AddHostel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [rent, setRent] = useState("");
  const [type, setType] = useState("hostel");
  const [gender, setGender] = useState("co-ed");
  const [facilities, setFacilities] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [distanceFromCollege, setDistanceFromCollege] = useState("");
  const [ownerContact, setOwnerContact] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="text-lg text-muted-foreground">Please sign in to list your property.</p>
          <Button className="mt-4" onClick={() => navigate("/auth")}>Sign In</Button>
        </div>
      </div>
    );
  }

  const toggleFacility = (f: string) => {
    setFacilities((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location || !city || !rent) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);

    // Create hostel
    const { data: hostelData, error: hostelError } = await supabase
      .from("hostels")
      .insert({
        owner_id: user.id,
        name: name.trim(),
        location: location.trim(),
        city: city.trim(),
        rent: parseInt(rent),
        type,
        gender,
        facilities,
        description: description.trim() || null,
        distance_from_college: distanceFromCollege.trim() || null,
        owner_contact: ownerContact.trim() || null,
        owner_name: ownerName.trim() || null,
      })
      .select("id")
      .single();

    if (hostelError) {
      toast.error("Failed to create listing: " + hostelError.message);
      setSubmitting(false);
      return;
    }

    // Upload photos
    for (const file of photos) {
      const ext = file.name.split(".").pop();
      const path = `${user.id}/${hostelData.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage.from("hostel-photos").upload(path, file);
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from("hostel-photos").getPublicUrl(path);
        await supabase.from("hostel_photos").insert({
          hostel_id: hostelData.id,
          uploaded_by: user.id,
          photo_url: urlData.publicUrl,
        });
      }
    }

    toast.success("Hostel listed successfully!");
    navigate(`/hostel/${hostelData.id}`);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-6 font-display text-3xl font-bold text-foreground">List Your Property</h1>
        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-border bg-card p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Hostel/PG Name *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sunrise Hostel" className="mt-1" required />
            </div>
            <div>
              <Label>Owner Name</Label>
              <Input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="Your name" className="mt-1" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Location *</Label>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Koramangala, Near Christ University" className="mt-1" required />
            </div>
            <div>
              <Label>City *</Label>
              <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Bangalore" className="mt-1" required />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label>Monthly Rent (₹) *</Label>
              <Input type="number" value={rent} onChange={(e) => setRent(e.target.value)} placeholder="8500" className="mt-1" required min={1000} />
            </div>
            <div>
              <Label>Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="hostel">Hostel</SelectItem>
                  <SelectItem value="pg">PG</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="boys">Boys</SelectItem>
                  <SelectItem value="girls">Girls</SelectItem>
                  <SelectItem value="co-ed">Co-Ed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Facilities</Label>
            <div className="mt-2 flex flex-wrap gap-3">
              {facilityOptions.map((f) => (
                <label key={f} className="flex items-center gap-2 text-sm">
                  <Checkbox checked={facilities.includes(f)} onCheckedChange={() => toggleFacility(f)} />
                  {f}
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your property..." className="mt-1" maxLength={1000} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Distance from College</Label>
              <Input value={distanceFromCollege} onChange={(e) => setDistanceFromCollege(e.target.value)} placeholder="e.g. 500m from IIT" className="mt-1" />
            </div>
            <div>
              <Label>Contact Number</Label>
              <Input value={ownerContact} onChange={(e) => setOwnerContact(e.target.value)} placeholder="+91 98765 43210" className="mt-1" />
            </div>
          </div>

          <div>
            <Label>Photos</Label>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={(e) => setPhotos(Array.from(e.target.files || []))} className="mt-1 block w-full text-sm" />
            {photos.length > 0 && <p className="mt-1 text-xs text-muted-foreground">{photos.length} photo(s) selected</p>}
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? "Creating Listing..." : "List Property"}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default AddHostel;
