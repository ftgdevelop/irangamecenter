import React, { ReactNode } from "react";

interface TabItem {
  value: string;
  label?: string;
  component: ReactNode;
  show: boolean;
}

interface TabsProps {
  items: TabItem[];
  activeTab?: string;
  loading?: boolean;
}

const WizardTabs: React.FC<TabsProps> = ({ items, activeTab, loading }) => {
  const visibleItems = items.filter((item) => item.show);

  return (
    <div className="w-full">
      <div className="text-sm font-medium text-center text-gray-500 bg-[#192b39] dark:text-gray-400">
        <ul className="flex styled-scrollbar overflow-x-auto overflow-y-clip -mb-px h-[54px] select-none">
          {visibleItems.map((item) => {
            const isActive = item.value === activeTab;

            return (
              <li
                key={item.value}
                className="min-w-28 flex items-center justify-center pointer-events-none"
              >
                {loading ? (
                  <div className="inline-block p-4 rounded-t-lg bg-gray-700/40 animate-pulse w-24 h-10" />
                ) : (
                  <div
                    className={`inline-block p-4 border-b-2 rounded-t-lg transition-all ${
                      isActive
                        ? "text-[#aa3aff] border-[#aa3aff]"
                        : "text-gray-400 border-transparent"
                    }`}
                  >
                    {item.label || item.value}
                  </div>
                )}
              </li>
            );
          })}
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

export default WizardTabs;