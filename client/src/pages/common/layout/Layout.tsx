import { ReactNode } from "react";
import { Header } from "./components/Header";
import { useCheckLoginStatus } from "./hooks/useCheckLoginStatus";
import { EventSection } from "./components/EventSection";
import { RecommendSection } from "./components/RecommendSection";
import { HashTagsSection } from "./components/HashTagsSection";

interface LayoutProps {
  children: ReactNode;
  containerClassName?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  containerClassName,
}) => {
  useCheckLoginStatus();
  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <div className={`container mx-auto px-4 ${containerClassName}`}>
            <div className="flex-1 container mx-auto px-1 py-6 md:py-8 flex flex-col md:flex-row">
              <div className="flex-1 md:mr-8 mb-6 md:mb-0">{children}</div>
              <aside className="w-full md:w-80">
                <EventSection />
                <RecommendSection />
                <HashTagsSection />
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
