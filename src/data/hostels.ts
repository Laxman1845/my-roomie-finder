import hostel1 from "@/assets/hostel-1.jpg";
import hostel2 from "@/assets/hostel-2.jpg";
import hostel3 from "@/assets/hostel-3.jpg";
import hostel4 from "@/assets/hostel-4.jpg";
import hostel5 from "@/assets/hostel-5.jpg";
import hostel6 from "@/assets/hostel-6.jpg";

export interface Hostel {
  id: string;
  name: string;
  location: string;
  city: string;
  rent: number;
  facilities: string[];
  images: string[];
  available: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  distanceFromCollege: string;
  ownerContact: string;
  ownerName: string;
  type: "hostel" | "pg";
  gender: "boys" | "girls" | "co-ed";
  reviews: Review[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const hostels: Hostel[] = [
  {
    id: "1",
    name: "Sunrise Student Hostel",
    location: "Koramangala, Near Christ University",
    city: "Bangalore",
    rent: 8500,
    facilities: ["WiFi", "Food", "AC", "Laundry", "Gym", "Power Backup"],
    images: [hostel1, hostel2, hostel4],
    available: true,
    rating: 4.5,
    reviewCount: 128,
    description: "Sunrise Student Hostel offers a comfortable and vibrant living experience for students. Located just 500 meters from Christ University, our hostel features modern amenities, spacious rooms, and a friendly community atmosphere. We provide nutritious meals three times a day and have dedicated study areas.",
    distanceFromCollege: "500m from Christ University",
    ownerContact: "+91 98765 43210",
    ownerName: "Rajesh Kumar",
    type: "hostel",
    gender: "boys",
    reviews: [
      { id: "r1", userName: "Amit S.", rating: 5, comment: "Great hostel! Food is amazing and rooms are clean.", date: "2026-02-15" },
      { id: "r2", userName: "Priya K.", rating: 4, comment: "Good location, WiFi could be better though.", date: "2026-01-20" },
    ],
  },
  {
    id: "2",
    name: "Green Valley PG",
    location: "HSR Layout, Sector 2",
    city: "Bangalore",
    rent: 12000,
    facilities: ["WiFi", "Food", "AC", "Laundry", "Parking"],
    images: [hostel3, hostel5, hostel6],
    available: true,
    rating: 4.2,
    reviewCount: 85,
    description: "Green Valley PG is a premium paying guest accommodation in the heart of HSR Layout. We offer fully furnished rooms with attached bathrooms, home-cooked meals, and a peaceful study environment. Ideal for working professionals and students.",
    distanceFromCollege: "2km from IIIT Bangalore",
    ownerContact: "+91 87654 32109",
    ownerName: "Meera Sharma",
    type: "pg",
    gender: "girls",
    reviews: [
      { id: "r3", userName: "Sneha R.", rating: 4, comment: "Feels like home! The food is homely and delicious.", date: "2026-02-10" },
    ],
  },
  {
    id: "3",
    name: "Metro Stay Hostel",
    location: "Andheri West, Near Station",
    city: "Mumbai",
    rent: 9500,
    facilities: ["WiFi", "Food", "Laundry", "Power Backup"],
    images: [hostel2, hostel1, hostel5],
    available: false,
    rating: 3.8,
    reviewCount: 64,
    description: "Affordable and well-connected hostel right next to Andheri station. Perfect for students attending colleges in the western suburbs of Mumbai. We provide basic but comfortable accommodations with daily meals included.",
    distanceFromCollege: "1.5km from Mithibai College",
    ownerContact: "+91 76543 21098",
    ownerName: "Vikram Patel",
    type: "hostel",
    gender: "co-ed",
    reviews: [
      { id: "r4", userName: "Rohan M.", rating: 4, comment: "Best location for the price. Very convenient.", date: "2026-01-05" },
    ],
  },
  {
    id: "4",
    name: "Scholar's Nest PG",
    location: "Powai, Hiranandani Gardens",
    city: "Mumbai",
    rent: 15000,
    facilities: ["WiFi", "Food", "AC", "Laundry", "Gym", "Swimming Pool"],
    images: [hostel6, hostel4, hostel3],
    available: true,
    rating: 4.7,
    reviewCount: 210,
    description: "Premium PG accommodation in the upscale Hiranandani Gardens. Scholar's Nest offers luxury living with world-class amenities including a swimming pool, gym, and gourmet meals. Walking distance from IIT Bombay campus.",
    distanceFromCollege: "800m from IIT Bombay",
    ownerContact: "+91 65432 10987",
    ownerName: "Ananya Desai",
    type: "pg",
    gender: "girls",
    reviews: [
      { id: "r5", userName: "Kavya J.", rating: 5, comment: "Absolutely premium! Worth every penny.", date: "2026-03-01" },
      { id: "r6", userName: "Neha P.", rating: 5, comment: "Best PG I've ever stayed in. Highly recommended!", date: "2026-02-20" },
    ],
  },
  {
    id: "5",
    name: "Campus Edge Hostel",
    location: "Hauz Khas, Near IIT Delhi",
    city: "Delhi",
    rent: 7500,
    facilities: ["WiFi", "Food", "Laundry", "Power Backup"],
    images: [hostel4, hostel2, hostel1],
    available: true,
    rating: 4.0,
    reviewCount: 95,
    description: "Budget-friendly hostel near IIT Delhi and JNU campus. Campus Edge provides clean rooms, nutritious meals, and a studious atmosphere. Our hostel is popular among students preparing for competitive exams.",
    distanceFromCollege: "1km from IIT Delhi",
    ownerContact: "+91 54321 09876",
    ownerName: "Suresh Gupta",
    type: "hostel",
    gender: "boys",
    reviews: [
      { id: "r7", userName: "Arun T.", rating: 4, comment: "Good for serious students. Quiet environment.", date: "2026-02-08" },
    ],
  },
  {
    id: "6",
    name: "Royal Comfort PG",
    location: "Velachery, Near VIT Chennai",
    city: "Chennai",
    rent: 6500,
    facilities: ["WiFi", "Food", "Laundry"],
    images: [hostel5, hostel3, hostel6],
    available: true,
    rating: 3.9,
    reviewCount: 42,
    description: "Affordable PG accommodation in the calm neighborhood of Velachery. Royal Comfort PG offers a homely environment with South Indian home-cooked meals. Close to multiple engineering colleges and IT parks.",
    distanceFromCollege: "1.2km from VIT Chennai",
    ownerContact: "+91 43210 98765",
    ownerName: "Lakshmi Narayan",
    type: "pg",
    gender: "co-ed",
    reviews: [
      { id: "r8", userName: "Deepak R.", rating: 4, comment: "Authentic South Indian food! Great value.", date: "2026-01-28" },
    ],
  },
];
