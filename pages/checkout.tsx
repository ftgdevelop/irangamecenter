import CheckoutSection from "@/components/cart/CheckoutSection";
import Steps from "@/components/payment/Steps";

export default function CheckoutPage() {
  return (
    <>
      <Steps activeStepKey="checkout" />
      <CheckoutSection />
    </>
  );
}