import logoAsset from "@/assets/gerson-gomes-logo.png.asset.json";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  maxHeight?: number;
}

/**
 * Gerson Gomes — Advocacia e Consultoria Jurídica.
 * Logo PNG transparente com monograma GG em dourado.
 */
export function Logo({ className, variant = "light", maxHeight = 80 }: LogoProps) {
  return (
    <img
      src={logoAsset.url}
      alt="Gerson Gomes — Advocacia e Consultoria Jurídica"
      style={{ maxHeight }}
      className={cn("w-auto object-contain select-none", className)}
      draggable={false}
    />
  );
}
