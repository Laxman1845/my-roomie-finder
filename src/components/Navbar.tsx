import { Link, useNavigate } from "react-router-dom";
import { Building2, Heart, Menu, X, LogOut, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">StayFinder</span>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <>
              <Link to="/add-hostel">
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" /> List Property
                </Button>
              </Link>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {user.user_metadata?.display_name || user.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2 text-muted-foreground">
                <LogOut className="h-4 w-4" /> Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {user ? (
              <>
                <Link to="/add-hostel" onClick={() => setMobileOpen(false)} className="text-sm font-medium">List Property</Link>
                <button onClick={() => { handleSignOut(); setMobileOpen(false); }} className="text-left text-sm font-medium text-destructive">Sign Out</button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full">Sign In / Sign Up</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
