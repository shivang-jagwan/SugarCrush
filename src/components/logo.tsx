import Image from "next/image";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="/logo.jpg"
        alt="SugarCrush Logo"
        width={40}
        height={40}
        className="h-10 w-10 rounded-md object-cover"
      />
      <span className="font-headline text-2xl font-bold text-foreground">
        SugarCrush
      </span>
    </div>
  );
};
