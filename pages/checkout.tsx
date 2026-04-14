import CheckoutSection from "@/components/cart/CheckoutSection";
import Steps from "@/components/payment/Steps";
import { useAppDispatch } from "@/hooks/use-store";
import { setHeaderParams } from "@/redux/pages";
import { useEffect } from "react";

export default function CheckoutPage() {
    
  const dispatch = useAppDispatch();

    useEffect(()=>{
  
      dispatch(setHeaderParams({
        headerParams:{
          logo: true,
          backLink:"/cart"
        }
      }));
  
      return(()=>{
        dispatch(setHeaderParams({headerParams: undefined}));
      })
  
    },[]);

  return (
    <>
      <Steps activeStepKey="checkout" />
      <CheckoutSection />
    </>
  );
}