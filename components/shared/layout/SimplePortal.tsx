import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type PortalInterface = {
  children: React.ReactNode;
  selector: string;
};

const SimplePortal = ({ children, selector }: PortalInterface) => {

  const ref = useRef<Element | null>(null);
  
  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);

  return ref.current ? createPortal(children, ref.current) : null;
};

export default SimplePortal;