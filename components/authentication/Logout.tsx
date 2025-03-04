import { useAppDispatch } from "@/hooks/use-store";
import { setReduxBalance, setReduxUser } from "@/redux/authenticationSlice";
import { useRouter } from "next/router";

type Props = {
    closeModal?: () => void;
    className?:string;
}

const Logout: React.FC<Props> = props => {

    const dispatch = useAppDispatch();

    const router = useRouter();

    const logout = () => {

        dispatch(setReduxUser({
            isAuthenticated: false,
            user: {},
            getUserLoading: false
        }));

        dispatch(setReduxBalance({balance:undefined, loading:false}));

        localStorage.removeItem('Token');

        if (props.closeModal) {
            props.closeModal();
        }

         if (router.asPath.includes('/myaccount')){
             router.replace("/");
         }

    }

    return (
        <button
            className={`${props.className || "text-[#ff727c] font-semibold"}`}
            type='button'
            onClick={logout}
        >
            خروج از حساب کاربری
        </button>
    )
}

export default Logout;