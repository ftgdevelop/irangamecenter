import Router from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { setBodyScrollable } from "@/redux/stylesSlice";
import { setReduxError } from "@/redux/errorSlice";
import ModalPortal from "./layout/ModalPortal";
import Image from "next/image";

const Error: React.FC = () => {

    const storedError = useAppSelector(state => state.error);

    const dispatch = useAppDispatch();

    useEffect(()=>{
        if(storedError?.isVisible){
            dispatch(setBodyScrollable(false));
        }else{
            dispatch(setBodyScrollable(true));
        }
    },[storedError?.isVisible, dispatch]);

    const closeHandler = () => {
        dispatch(setReduxError({
            title: "",
            message: "",
            isVisible: false,
            closeErrorLink: "",
            closeButtonText: ""
        }));
    }

    const backTo = (target: string) => {
        Router.push(target);
        closeHandler();
    }

    return (
        <ModalPortal
            show={storedError.isVisible}
            selector='error_modal_portal'
        >
            <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">

                <div className="bg-white max-sm:h-screen sm:rounded-xl px-5 pt-10 pb-12 w-full max-w-md text-center">
                    <Image src="/images/icons/error.svg" alt="error" className="w-10 h-10 mx-auto mb-4" width={60} height={60} />

                    <h5 className="text-red-500 text-lg sm:text-2xl font-bold mb-1">
                        {storedError.title || "خطا"}
                    </h5>

                    <div className="text-neutral-500 mb-4 md:mb-7 leading-7 text-center">
                        {storedError.message}
                    </div>

                    {storedError.closeErrorLink ? (
                        <button type="button" className="max-w-full w-32 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white h-12 px-5 rounded-full" onClick={() => { backTo(storedError.closeErrorLink!) }}>
                            {storedError.closeButtonText || "صفحه اصلی"}
                        </button>
                    ) : (
                        <button type="button" className="max-w-full w-32 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white h-12 px-5 rounded-full" onClick={closeHandler}>
                            بستن
                        </button>
                    )}

                </div>

            </div>
        </ModalPortal>

    )
}

export default Error;