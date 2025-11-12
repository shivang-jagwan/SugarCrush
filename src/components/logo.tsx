import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8 text-primary"
      >
        <path d="M12 2C9.243 2 7 4.243 7 7v1H6a1 1 0 00-1 1v11a3 3 0 003 3h8a3 3 0 003-3V9a1 1 0 00-1-1h-1V7c0-2.757-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3v1H9V7c0-1.654 1.346-3 3-3zm-3 7h6v2h-6v-2zm-2 4a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1z" />
        <path d="M12 4.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5z" />
      </svg>
      <span className="font-headline text-2xl font-bold text-foreground">
        SugarCrush
      </span>
    </div>
  );
};
