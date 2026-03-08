import { Link } from "react-router-dom";
import { Building2, Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">StayFinder</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Hostels
          </Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            PG
          </Link>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Heart className="h-5 w-5" />
          </Button>
          <Button size="sm">List Your Property</Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link to="/" className="text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/" className="text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Hostels</Link>
            <Link to="/" className="text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>PG</Link>
            <Button size="sm" className="mt-2 w-full">List Your Property</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
