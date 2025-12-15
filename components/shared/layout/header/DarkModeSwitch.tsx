import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { setMode } from "@/redux/stylesSlice";
import Image from "next/image";

const DarkModeSwitch = () => {

    const dispatch = useAppDispatch();

    const reduxMode = useAppSelector(state => state.styles.mode);

    const clickHandle = ()=>{
        const newMode = reduxMode === "dark" ? "light" : "dark";
        dispatch(setMode(newMode));

        const date = new Date();
        date.setMonth(date.getMonth() + 6);
        document.cookie = `mode=${newMode}; expires=${date.toUTCString()}; path=/`;

    }

    return(
        <button
            type="button"
            onClick={clickHandle}
            className="flex gap-2 items-center text-sm"
        >
            {reduxMode === "dark"? "تاریک" : "روشن"} 
            <span className={`flex items-center w-12 rounded-full border border-neutral-500 dark:border-white p-px bg-[#011425]`}>
                <span className={`transition-all w-0 ${reduxMode === "dark"?"grow":"grow-0"}`} />
                <span className="bg-white rounded-full relative block w-6 h-6 shrink-0 grow-0">
                    <Image src="/images/icons/moon.svg" alt="تاریک" className={`${reduxMode === "dark"?"opacity-100":"opacity-0"} transition-all w-4 h-4 absolute top-1/2 left-1/2 -mt-2 -ml-2`} width={25} height={25} />
                    <Image src="/images/icons/sun.svg" alt="تاریک" className={`${reduxMode === "dark"?"opacity-0":"opacity-100"} transition-all w-4 h-4 absolute top-1/2 left-1/2 -mt-2 -ml-2`} width={25} height={25} />
                </span>
            </span>
        </button>
    )
}

export default DarkModeSwitch;