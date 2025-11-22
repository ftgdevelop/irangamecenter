import CartLayout, { CartRoutes } from "@/components/cart/CartLayout";

export default function PaymentPage() {
  return <CartLayout tab={CartRoutes.PAYMENT} />;
}