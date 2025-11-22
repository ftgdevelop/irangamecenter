import PaymentSection from "@/components/cart/PaymentSection";
import Steps from "@/components/payment/Steps";

export default function PaymentPage() {
  return (
    <>
      <Steps activeStepKey="payment" />
      <PaymentSection />
    </>
  );
}