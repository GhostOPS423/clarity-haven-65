import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-lg shadow-lg p-10 flex flex-col items-center">
        <Logo maxHeight={80} className="mb-8" />
        <h1 className="text-xl font-serif text-foreground mb-2 text-center">
          Bem-vindo
        </h1>
        <p className="text-sm text-muted-foreground mb-8 text-center font-label tracking-wider uppercase">
          Gestão Financeira Jurídica
        </p>
        <Button
          onClick={() => navigate("/")}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Entrar no Sistema
        </Button>
      </div>
    </div>
  );
}
