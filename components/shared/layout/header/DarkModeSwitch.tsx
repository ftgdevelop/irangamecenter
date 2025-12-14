import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { setMode } from "@/redux/stylesSlice";

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
        >
             {reduxMode === "dark"? "تاریک" : "روشن"} 
        </button>
    )
}

export default DarkModeSwitch;