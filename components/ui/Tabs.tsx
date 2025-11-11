
import React, { useState, ReactNode } from 'react'

interface TabItem {
  value: string
  label?: string
  component: ReactNode
}

interface TabsProps {
  items: TabItem[]
  defaultActive?: string
}

const Tabs: React.FC<TabsProps> = ({ items, defaultActive }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultActive || items[0]?.value)

  return (
    <div className="w-full">
      <div className="text-sm font-medium text-center text-gray-500  bg-[#192b39] dark:text-gray-400 ">
        <ul className="flex styled-scrollbar overflow-x-auto overflow-y-clip -mb-px">
          {items.map((item) => <li key={item.value} className="me-2 min-w-28">
              <button
                onClick={() => setActiveTab(item.value)}
                className={`inline-block p-4 border-b-2 rounded-t-lg transition-all ${
                  activeTab === item.value
                    ? 'text-[#aa3aff] hover:text-[#aa3aff]/50 border-[#aa3aff] hover:border-[#aa3aff]/50  '
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                {item.label || item.value}
              </button>
            </li>)}
        </ul>
      </div>

      <div className="p-6">
        {items.map(
          (item) =>
            activeTab === item.value && (
              <div key={item.value} className="animate-fade-in">
                {item.component}
              </div>
            )
        )}
      </div>
    </div>
  )
}

export default Tabs