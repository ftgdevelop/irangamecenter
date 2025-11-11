import React, { useState, ReactNode } from "react";

interface TabItem {
  value: string;
  label?: string;
  component: ReactNode;
  show: boolean;
}

interface TabsProps {
  items: TabItem[];
  defaultActive?: string;
  loading?: boolean;
}

const Tabs: React.FC<TabsProps> = ({ items, defaultActive, loading }) => {
  const [activeTab, setActiveTab] = useState<string>(
    defaultActive || items[0]?.value
  );

  const visibleItems = items.filter((item) => item.show);

  return (
    <div className="w-full">
      <div className="text-sm font-medium text-center text-gray-500 bg-[#192b39] dark:text-gray-400">
        <ul className="flex styled-scrollbar overflow-x-auto overflow-y-clip -mb-px h-[54px]">
          {visibleItems.map((item) => (
            <li key={item.value} className="min-w-28 flex items-center">
              {loading ? (
                <div className="inline-block p-4 rounded-t-lg bg-gray-700/40 animate-pulse w-24 h-10" />
              ) : (
                <button
                  onClick={() => setActiveTab(item.value)}
                  disabled={loading}
                  className={`inline-block p-4 border-b-2 rounded-t-lg transition-all ${
                    activeTab === item.value
                      ? "text-[#aa3aff] border-[#aa3aff] hover:text-[#aa3aff]/50 hover:border-[#aa3aff]/50"
                      : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  }`}
                >
                  {item.label || item.value}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 min-h-[300px] flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#aa3aff]" />
            <p className="mt-4 text-sm text-gray-400">در حال بارگذاری...</p>
          </div>
        ) : (
          visibleItems.map(
            (item) =>
              activeTab === item.value && (
                <div key={item.value} className="animate-fade-in w-full">
                  {item.component}
                </div>
              )
          )
        )}
      </div>
    </div>
  );
};

export default Tabs;