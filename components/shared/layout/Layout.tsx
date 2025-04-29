/* eslint-disable  @typescript-eslint/no-explicit-any */

import { PropsWithChildren, useEffect } from "react";
import Header from "./header/Index";
import Footer from "./footer/Index";
import { useRouter } from "next/router";
import Error from "../Error";
import Notification from "../Notification";
import { setReduxBalance, setReduxUser } from "@/redux/authenticationSlice";
import { getCurrentUserProfile } from "@/actions/identity";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import FooterNavigation from "./footer/FooterNavigation";
import { getUserBalance } from "@/actions/payment";

type Props = {
    className?: string;
}

const Layout: React.FC<PropsWithChildren<Props>> = props => {

    const router = useRouter();

    const dispatch = useAppDispatch();

    const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

    let showHeader = true;
    let showFooter = true;
    let showFixedNav = true;

    if (
        [
            "/login",
            "/profile/edit",
            "/profile/change-password",
            "/profile/forget-password",
            "/profile/wallet",
            "/profile/wallet/charge",
            "/profile/wallet/faq",
            "/profile/wallet/transactions"
        ].includes(router.pathname)){
        showFooter = false;
        showHeader = false;
        showFixedNav = false;
    }

    if (router.pathname === "/profile"){
        showHeader = false;
        showFooter = false;
    }

    useEffect(() => {
        const token = localStorage?.getItem('Token');
        if (token) {
            const getUserData = async () => {
                dispatch(setReduxUser({
                    isAuthenticated: false,
                    user: {},
                    getUserLoading: true
                }));

                const response: any = await getCurrentUserProfile(token);

                if (response && response.status === 200) {
                    dispatch(setReduxUser({
                        isAuthenticated: true,
                        user: response.data?.result,
                        getUserLoading: false
                    }));
                } else {
                    dispatch(setReduxUser({
                        isAuthenticated: false,
                        user: {},
                        getUserLoading: false
                    }));
                }

            }
            getUserData();
        }
    }, []);

    useEffect(()=>{
        const fetchBalance = async () => {
            
            const token = localStorage?.getItem('Token');
            if(!token) return;

            dispatch(setReduxBalance({ balance: undefined, loading: true }));
            const response: any = await getUserBalance(token);
            if (response.data?.result?.amount !== null) {
                dispatch(setReduxBalance({ balance: response?.data?.result?.amount, loading: false }))
            } else {
                dispatch(setReduxBalance({ balance: undefined, loading: false }));
            } 
        }
        if(isAuthenticated){
            fetchBalance();
        }
    },[isAuthenticated]);

    return (
        <>
            <Error />
            <Notification />
            <div className="bg-[#011425] text-white max-w-lg mx-auto">
                {showHeader && <Header />}
                <main className={showFixedNav ? "min-h-screen-nav" : "min-h-screen"}>
                    {props.children}
                </main>
                {showFooter && <Footer />}
                {showFixedNav && <FooterNavigation />}
            </div>
        </>


    )
}
export default Layout;