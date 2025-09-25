import { useEffect, useState } from "react";
import ModalPortal from "./layout/ModalPortal";
import Image from "next/image";

const LoadingFull = () => {

    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <ModalPortal
            show={open}
            selector='modal_portal'
        >
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">

                <div className={`bg-black/75 backdrop-blur-sm absolute top-0 left-0 w-full h-screen transition-all ${open ? "opacity-100" : "opacity-0"}`} />

                <div className={`bg-[#192a39] text-white items-center p-5 max-w-80 w-10/12 justify-center flex flex-col rounded-2xl transition-all ${open ? "translate-x-0" : "-translate-x-full"}`}>
                    <Image src="/logo.svg" alt="irangamecenter" className="my-4 w-16 h-16" width={64} height={64} />
                    <div className="text-center">
                        <strong className="block text-lg font-bold">
                            ایران گیم سنتر
                        </strong>
                        <span className="text-sm">
                            فروشگاه آنلاین اکانت بازی
                        </span>
                    </div>
                    <div className="bg-[#101b25] border-black border aspect-square pt-1 mb-6 p-.5 mt-4">
                        <Image src="/images/loading.gif" className="h-18 w-18 -mt-2" alt="loading" width={96} height={96} />
                    </div>
                </div>

            </div>
        </ModalPortal>
    )
}

export default LoadingFull;