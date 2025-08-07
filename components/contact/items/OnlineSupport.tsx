import ModalPortal from "@/components/shared/layout/ModalPortal";
import { ServerAddress } from "@/enum/url";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
    icon?: string;
    label?: string;
    items?:{        
        Description?: string;
        Name?: string;
        Value?: string;
        icon?:{
            url?: string;
        };
        id:number;
        url?:string;
        backgroundColorCode?: string;
    }[];
}

const OnlineSupport : React.FC<Props> = props => {

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


    return(
        <>
        <button
            onClick={()=>{setOpen(true)}}
            type="button"
            className="text-right font-semibold text-sm text-white justify-between min-h-20 flex w-full mb-3 py-4 px-5 items-center bg-gradient-to-t from-[#01212e] to-[#102c33] rounded-xl gap-4"
        >
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

            <div className="py-2.5 px-5 rounded-full bg-gradient-to-t from-[#028d7e] to-[#99feac] text-white text-xs">
                فعال
            </div>

        </button>
        
        <ModalPortal
            show={open}
            selector='modal_portal'
        >
            <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen">

                <div className="relative w-full md:max-w-lg md:mx-auto h-screen">

                    <div className="bg-black/50 backdrop-blur-sm absolute top-0 left-0 right-0 bottom-0" onClick={() => { setSlideIn(false) }} />

                    <div className={`flex flex-col gap-6 items-center p-5 py-10 bg-[#192a39] text-white rounded-2xl absolute transition-all left-5 right-5 ${slideIn ? "bottom-5" : "-bottom-[80vh]"}`}>

                        <div className="bg-[#011425] p-3 rounded-full" >
                            <Image 
                                src="/images/icons/onlineSupportIcon.svg"
                                alt="پشتیبانی آنلاین"
                                width={48}
                                height={48}
                                className="w-12 h-12"
                            />
                        </div>

                        {props.items?.map(item => {
                            
                            const iconUrl = item.icon?.url ? `${ServerAddress.Type}${ServerAddress.Strapi}/${item.icon.url}` : "";
                            const icon = iconUrl ? (
                                <Image 
                                    src={iconUrl}
                                    alt={item.Name || ""}
                                    width={150}
                                    height={32}
                                    className="w-auto h-8"
                                />
                            ) :null; 

                            return(
                                <Link
                                    key={item.id}
                                    href={item.url || "#"}
                                    className={`block py-3 px-4 min-h-14 w-full text-center bg-[#a93aff] rounded-full flex items-center ${icon?" justify-between":" justify-center"}`}
                                    style={{backgroundColor:item.backgroundColorCode || "#bbb"}}
                                >
                                    {item.Name||""}
                                    {icon}
                                </Link>
                            )
                        })}

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

export default OnlineSupport;