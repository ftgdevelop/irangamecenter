import React from "react";

const status = {
  Paid: { label: "پرداخت شده", color: "#F2C94C", textColor: "#1F2937" },
  Pending: { label: "درانتظار تایید", color: "#4A90E2", textColor: "#FFFFFF" },
  Completed: { label: "انجام شده", color: "#6FCF97", textColor: "#1F2937" },
  Canceled: { label: "لغو شده", color: "#B0B0B0", textColor: "#1F2937" },
  Refunded: { label: "بازگشت وجه", color: "#B0B0B0", textColor: "#1F2937" },
  InProgress: { label: "در حال انجام", color: "#F2994A", textColor: "#1F2937" },
} as const;

interface StatusTagProps {
  status?: string;
}

const StatusTag: React.FC<StatusTagProps> = ({ status: statusKey }) => {
  if (!statusKey) return null;

  const item = (status as Record<string, { label: string; color: string; textColor: string }>)[statusKey];

  const label = item ? item.label : statusKey; 
  const color = item ? item.color : "#B0B0B0"; 
  const textColor = item ? item.textColor : "#1F2937"; 

  return (
    <span
      className="flex items-center px-4 h-7 rounded-full font-semibold"
      style={{
        backgroundColor: color,
        color: textColor,
      }}
    >
      {label}
    </span>
  );
};

export default StatusTag;