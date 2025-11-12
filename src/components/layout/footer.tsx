import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <div className="flex justify-center items-center gap-2">
          <Heart className="h-4 w-4 text-primary" fill="currentColor" />
          <p>© {new Date().getFullYear()} SugarCrushBakers | Made with 💖 and Flour.</p>
          <Heart className="h-4 w-4 text-primary" fill="currentColor" />
        </div>
      </div>
    </footer>
  );
};
