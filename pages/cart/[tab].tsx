import CartPage, { CartRoutes, CartTab } from "@/components/cart/CartPage";
import { GetStaticProps, GetStaticPaths } from "next";


interface CartPageProps {
  tab: CartTab;
}

export default function CartTabPage(props: CartPageProps) {  
  return <CartPage tab={props.tab} />;
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [
    { params: { tab: CartRoutes.CART } },
    { params: { tab: CartRoutes.CHECKOUT } },
    { params: { tab: CartRoutes.PAYMENT } },
    { params: { tab: CartRoutes.RESULT } },
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