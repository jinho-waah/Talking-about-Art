import { ReactNode } from "react";
import { Header } from "./components/Header";
import { useCheckLoginStatus } from "./hooks/useCheckLoginStatus";

interface AuthLayoutProps {
  children: ReactNode;
  containerClassName?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  containerClassName,
}) => {
  useCheckLoginStatus();

  return (
    <div>
      <Header />
      <main className="flex-grow flex flex-col min-h-screen">
        <div className={`container mx-auto px-4 ${containerClassName}`}>
          {children}
        </div>
      </main>
    </div>
  );
};
