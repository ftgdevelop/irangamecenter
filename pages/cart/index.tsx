import CartLayout, { CartRoutes } from "@/components/cart/CartLayout";

export default function CartPage() {
  return <CartLayout tab={CartRoutes.CART} />;
}