import { ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
  containerClassName?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  containerClassName,
}) => {
  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-screen ">
        <main className="flex-grow">
          <div className={`container mx-auto px-4 ${containerClassName}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
