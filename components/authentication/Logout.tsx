import { useAppDispatch } from "@/hooks/use-store";
import { setReduxBalance, setReduxUser } from "@/redux/authenticationSlice";
import { useRouter } from "next/router";
import ArrowTopLeft from "../icons/ArrowTopLeft";
import Image from "next/image";

type Props = {
    closeModal?: () => void;
    className?: string;
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

        dispatch(setReduxBalance({ balance: undefined, loading: false }));

        localStorage.removeItem('Token');

        if (props.closeModal) {
            props.closeModal();
        }

        if (router.asPath.includes('/myaccount')) {
            router.replace("/");
        }

    }

    return (
        <button
            type="button"
            className="flex w-full gap-3 items-center pr-5 rounded-xl"
            onClick={logout}
        >
            <Image
                src="/images/icons/2color/logout-2.svg"
                alt="خروج از پروفایل"
                className="w-7 h-7 grow-0 shrink-0"
                width={28}
                height={28}
            />
            <div className="grow flex justify-between items-center px-3 py-5 text-sm text-red-500">
                خروج از پروفایل
                <ArrowTopLeft className="w-3.5 h-3.5 fill-current" />
            </div>
        </button>
    )
}

export default Logout;