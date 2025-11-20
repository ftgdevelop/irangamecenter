import React, { useEffect, useState } from "react";
import { CloseIcon } from "@mantine/core";

interface AlertProps {
  children: React.ReactNode;
  closable?: boolean;
  autoClose?: boolean;
  duration?: number;
}

const Alert: React.FC<AlertProps> = ({
  children,
  closable = false,
  autoClose = false,
  duration = 4000,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      
      const timeOut = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => clearTimeout(timeOut);
    }
  }, [autoClose, duration]);

  if (!visible) return null;

  return (
    <div className="relative w-full max-w-md mx-auto bg-[#192A39]  text-[#fe1940] rounded-[5px] shadow-md p-4 flex items-center gap-2 overflow-hidden">
      
        {closable && (
          <button
            onClick={() => setVisible(false)}
            className="text-white hover:text-white/50 font-bold text-lg"
          >
            <CloseIcon size="24"/>
          </button>
        )}

        <div className="flex-1">{children}</div>

        <div style={{animationDuration: `${duration}ms`}} className={`absolute bottom-0 right-0 h-0.5 transition-all bg-gradient-to-r from-[#fe1940] to-[#fe4d6b] shrinkNimation`} />
    </div>
  );
};

export default Alert;