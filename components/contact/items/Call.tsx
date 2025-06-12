import ModalPortal from "@/components/shared/layout/ModalPortal";
import { isWithinWorkingHours } from "@/helpers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
    icon?: string;
    label?: string;
    description?: string;
    InnerData? : {
        Name?: string;
        Value?: string;
        Description?: string;
    }
}

const Call : React.FC<Props> = props => {

    const [open, setOpen] = useState<boolean>(false);
    const [slideIn, setSlideIn] = useState<boolean>(true);

    useEffect(() => {
        if (open) {
            setSlideIn(true);
        }
    }, [open]);

    useEffect(() => {
        if (!slideIn) {
            setTimeout(() => { setOpen(false) }, 300)
        }
    }, [slideIn]);

    const isActive = isWithinWorkingHours();

    let callLink = "";
    if(props.InnerData?.Value?.startsWith('0')){
        callLink = "tel:+98"+ (props.InnerData.Value.slice(1));
    }

    return(
        <>
        <button
            onClick={()=>{setOpen(true)}}
            type="button"
            className={`text-right min-h-20 w-full mb-3 py-4 px-5 rounded-xl ${isActive?"bg-gradient-to-t from-[#01212e] to-[#102c33]":"bg-[#1a1e2e]"}`}
        >
            <div className="mb-4 flex justify-between gap-4 items-center font-semibold text-sm text-white">
                <div className="flex gap-4 items-center">
                    {!!props.icon && <Image 
                        src={props.icon}
                        alt={props.label||""}
                        width={36}
                        height={36}
                        className="w-9 h-9"
                    />}
                    
                    {props.label}
                </div>

                {isActive ? (
                <div className="py-2.5 px-5 rounded-full bg-gradient-to-t from-[#028d7e] to-[#99feac] text-white text-xs">
                    فعال
                </div>
                ):(
                <div className="py-2.5 px-5 rounded-full bg-gradient-to-tr from-[#df415a] to-[#ff9a90] text-white text-xs">
                    غیر فعال
                </div>
                )}
            </div>
            {props.description && <p className="text-xs w-full">{props.description}</p>}

        </button>
        
        <ModalPortal
            show={open}
            selector='modal_portal'
        >
            <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen">

                <div className="relative w-full lg:max-w-lg lg:mx-auto h-screen">

                    <div className="bg-black/50 backdrop-blur-sm absolute top-0 left-0 right-0 bottom-0" onClick={() => { setSlideIn(false) }} />

                    <div className={`flex flex-col gap-5 items-center p-5 py-10 bg-[#192a39] text-white rounded-2xl absolute transition-all left-5 right-5 ${slideIn ? "bottom-5" : "-bottom-[80vh]"}`}>

                        <div className="bg-[#011425] p-3 rounded-full" >
                            <Image 
                                src="/images/icons/callSupportIcon.svg"
                                alt="تماس تلفنی"
                                width={48}
                                height={48}
                                className="w-12 h-12"
                            />
                        </div>
                        
                        <strong className="text-2xl font-semibold"> {props.InnerData?.Value} </strong>

                        <p className="text-xs"> {props.InnerData?.Description} </p>                        
                        
                        {!!props.InnerData?.Value && (
                            <Link
                                className="block my-2 p-4 w-full text-center bg-[#a93aff] rounded-full"
                                href={callLink}
                            >
                                {props.InnerData?.Name} 
                            </Link>
                        )}

                        <button
                            type="button"
                            onClick={()=>{setSlideIn(false)}}
                            className="block p-4 w-full text-center rounded-full bg-[#011425]"
                        >
                            انصراف
                        </button>

                    </div>
                </div>

            </div>
        </ModalPortal>

        </>
    )
}

export default Call;