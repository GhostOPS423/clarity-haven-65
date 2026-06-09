import logo from "@/assets/angeline-logo.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  maxHeight?: number;
}

/**
 * Angeline Sociedade de Advogados — official brand logo.
 * Source PNG has a white background and dark mark; on dark surfaces we invert.
 */
export function Logo({ className, variant = "light", maxHeight = 80 }: LogoProps) {
  return (
    <img
      src={logo}
      alt="Angeline Sociedade de Advogados"
      style={{ maxHeight }}
      className={cn(
        "w-auto object-contain select-none",
        variant === "dark" && "invert brightness-110",
        className
      )}
      draggable={false}
    />
  );
}
