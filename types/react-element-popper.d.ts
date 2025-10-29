declare module "react-element-popper" {
  import { ReactNode, CSSProperties } from "react";

  interface PopperProps {
    children?: ReactNode;
    targetRef?: React.RefObject<HTMLElement>;
    placement?: string;
    offset?: [number, number];
    strategy?: "absolute" | "fixed";
    style?: CSSProperties;
    className?: string;
  }

  const Popper: React.FC<PopperProps>;

  export default Popper;
}

declare module "react-element-popper/animations/transition";
declare module "react-element-popper/animations/opacity";