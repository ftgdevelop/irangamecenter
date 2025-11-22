import CartPage from "@/components/cart/CartPage";
import { GetStaticProps, GetStaticPaths } from "next";

type CartTab = "cart" | "profile" | "payment" | "confirmation";

interface CartPageProps {
  tab: CartTab;
}

export default function CartTabPage(props: CartPageProps) {  
  return <CartPage tab={props.tab} />;
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [
    { params: { tab: "cart" } },
    { params: { tab: "profile" } },
    { params: { tab: "payment" } },
    { params: { tab: "confirmation" } },
  ],
  fallback: false,
});

export const getStaticProps: GetStaticProps<CartPageProps> = ({ params }) => {
  return {
    props: {
      tab: params?.tab as CartTab,
    },
  };
};