import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type PortalInterface = {
  children: React.ReactNode;
  selector: string;
};

const SimplePortal = ({ children, selector }: PortalInterface) => {

  const ref = useRef<Element | null>(null);

  const [show, setShow] = useState<boolean>(false);
  
  useEffect(() => {
    ref.current = document.getElementById(selector);
    setShow(true);
  }, [selector]);

  return show && ref.current ? createPortal(children, ref.current) : null;
};

export default SimplePortal;