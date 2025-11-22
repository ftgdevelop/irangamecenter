import ResultSection from "@/components/cart/ResultSection";
import Steps from "@/components/payment/Steps";

export default function ResultPage() {
  return (
    <>
      <Steps activeStepKey="result" />
      <ResultSection />
    </>
  );
}