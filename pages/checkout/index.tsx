import CartLayout, { CartRoutes } from "@/components/cart/CartLayout";

export default function CheckoutPage() {
  return <CartLayout tab={CartRoutes.CHECKOUT} />;
}