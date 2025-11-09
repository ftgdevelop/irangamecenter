import { useEffect, useRef, useState } from "react";

type ProductTabsProps = {
  tabs: {
    id: string;
    label: string;
    isActive?: boolean;
  }[];
};

const ProductTabs = ({ tabs }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>("");
  const [isSticky, setIsSticky] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 100);

      if (isManualScrolling) return; 

      for (const tab of tabs) {
        if (!tab.isActive) continue;

        const section = document.getElementById(tab.id);
        if (section) {
          const top = section.getBoundingClientRect().top;
          if (top <= 120 && top >= -section.offsetHeight / 2) {
            setActiveTab(tab.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tabs, isManualScrolling]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      setIsManualScrolling(true);
      setActiveTab(id);

      window.scrollTo({
        top: el.offsetTop - 120,
        behavior: "smooth",
      });

      // بعد از اتمام انیمیشن اسکرول، دوباره اجازه‌ی تشخیص خودکار بده
      setTimeout(() => setIsManualScrolling(false), 800);
    }
  };

  return (
    <div
      ref={tabRef}
      className={`w-full backdrop-blur-md md:max-w-lg bg-[#0f1f2e]/80 z-[10] transition-all duration-300 ${
        isSticky ? "fixed top-[77px] shadow-md" : "hidden"
      }`}
    >
      <div className="flex styled-scrollbar overflow-x-auto border-b border-white/10">
        {tabs
          .filter((t) => t.isActive)
          .map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`relative flex-1 min-w-fit px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#A93AFF] to-[#FF81FF] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#A93AFF] after:to-[#FF81FF]"
                    : "text-white/70 hover:text-white"
                }`}
                style={{
                  WebkitBackgroundClip: isActive ? "text" : undefined,
                  WebkitTextFillColor: isActive ? "transparent" : undefined,
                }}
              >
                {tab.label}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default ProductTabs;