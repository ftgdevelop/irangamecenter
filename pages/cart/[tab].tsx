import CartPage from "@/components/cart/CartPage";

export default function CartTabPage() {
  return <CartPage />;
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: "cart" } },
      { params: { tab: "profile" } },
      { params: { tab: "payment" } },
      { params: { tab: "confirmation" } },
    ],
    fallback: false,
  };
};

export const getStaticProps = async () => {
  return { props: {} };
};