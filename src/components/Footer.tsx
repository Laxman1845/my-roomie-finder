import { Building2 } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card py-10">
    <div className="container mx-auto px-4">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">StayFinder</span>
          </div>
          <p className="text-sm text-muted-foreground">Helping students find their perfect home away from home since 2024.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Browse Hostels</li>
            <li>Browse PGs</li>
            <li>List Your Property</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Cities</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Bangalore</li>
            <li>Mumbai</li>
            <li>Delhi</li>
            <li>Chennai</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © 2026 StayFinder. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
