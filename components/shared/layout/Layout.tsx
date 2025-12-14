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
import PageLoadingBar from "./PageLoadingBar";
import { setMode, setProgressLoading } from "@/redux/stylesSlice";
import { addDeviceId, setGeneralCartInfo, setGeneralCartLoading } from "@/redux/cartSlice";
import { GetCookieDeviceId } from "@/helpers/order";
import { useCartApi } from "@/actions/cart";
import { GetCookieMode } from "@/helpers";

type Props = {
    className?: string;
}

const Layout: React.FC<PropsWithChildren<Props>> = props => {

    const router = useRouter();

    const dispatch = useAppDispatch();

    const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
    const userLoading = useAppSelector(state => state.authentication.getUserLoading);

    const isBodyScrollable = useAppSelector(state => state?.styles?.bodyScrollable);
    const lastScrollPosition = useAppSelector(state => state?.styles?.lastScrollPosition);
    const deviceId = useAppSelector((state) => state.cart.deviceId);

    const reduxMode = useAppSelector(state => state.styles.mode);

    const {getCart} = useCartApi(); 
    
    useEffect(()=>{
        const id = GetCookieDeviceId();
        if(id){
            dispatch(addDeviceId(id));
        }

        const cookieMode = GetCookieMode();

        const isSystemDark = window?.matchMedia('(prefers-color-scheme: dark)').matches;
        if(cookieMode==="dark"){
            dispatch(setMode("dark"));
        }else if (cookieMode === "light"){
            dispatch(setMode("light"));
        }else if(isSystemDark){
            dispatch(setMode("dark"));
        }else{
            dispatch(setMode("light"));
        }

    },[]);

    useEffect(()=>{

        const root = document.documentElement;

        if(reduxMode === "dark"){
            root.classList.add('dark');
        }else {
            root.classList.remove('dark');
        }        

    },[reduxMode]);

    useEffect(() => {
        const getGeneralCartData = async () => {
            dispatch(setGeneralCartLoading(true));
            const response: any = await getCart();
            if(response?.result){
                dispatch(setGeneralCartInfo(response.result));
            }
            dispatch(setGeneralCartLoading(false));
        }

        if(!userLoading){            
            getGeneralCartData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deviceId, userLoading]);

    useEffect(() => {
        if (isBodyScrollable && lastScrollPosition) {
            window.scrollTo({
                top: lastScrollPosition,
                left: 0,
                behavior: "instant"
            });
        }
    }, [isBodyScrollable, lastScrollPosition]);

    const loading = useAppSelector(state => state.styles.progressLoading);
    const addLoading = (href: string) => {
        if (href !== router.asPath) {
            dispatch(setProgressLoading(true));
        }
    }

    const removeLoading = () => { dispatch(setProgressLoading(false)) }

    useEffect(() => {

        removeLoading();

        document.querySelectorAll('a').forEach(item => {
            
            const target = item.getAttribute('target');

            if (!target || target.toLowerCase() !== '_blank'){
                item.addEventListener('click', () => { addLoading(item.getAttribute("href") || "") })
            }
        });

        return (() => {
            document.querySelectorAll('a').forEach(item => {
                item.removeEventListener('click', () => { addLoading("") })
            });
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.asPath]);

    const headerType2ParamsFromRedux = useAppSelector(state => state.pages.headerType2Params);

    let showHeader = true;
    let showFooter = true;
    let showFixedNav = true;
    let hasInternalFixedFooter = false;
    let headerType2Params: {
        title: string;
        backUrl?: string;
        backToPrev?: boolean;
        withShare?: boolean;
        withLogo?: boolean;
        hasCartLink?: boolean;
    } | undefined = undefined;

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
        ].includes(router.pathname)) {
        showFooter = false;
        showHeader = false;
        showFixedNav = false;
    }

    if (router.pathname === "/profile") {
        showHeader = false;
        showFooter = false;
    }

    if (router.pathname === "/terms") {
        headerType2Params = {
            backUrl: "/",
            title: "قوانین و مقررات"
        };
        showFooter = false;
        showFixedNav = false;
    }
    if (router.pathname === "/about") {
        headerType2Params = {
            backUrl: "/",
            title: ""
        };
        showHeader = true;
        showFooter = true;
        showFixedNav = false;
    }
    if (router.pathname === "/contact") {
        headerType2Params = {
            backUrl: "/",
            title: ""
        };
        showHeader = true;
        showFooter = false;
        showFixedNav = false;
    }

    if (router.pathname.startsWith("/faq")) {
        headerType2Params = {
            backUrl: "/",
            title: "سوالات متداول"
        };
        showFooter = false;
        showFixedNav = false;
    }

    if (router.pathname.startsWith("/orders")) {
        headerType2Params = {
            backUrl: "/",
            title: "سفارش های من"
        };
        showFooter = false;
        showFixedNav = false;
    }

    if (router.pathname.startsWith("/blog/")) {
        headerType2Params = {
            title: "",
            withShare: true,
            withLogo: true,
            backUrl: "/blogs"
        };
        showFooter = true;
        showHeader = true;
        showFixedNav = false;
    }

    if (router.pathname === "/blogs") {
        showFooter = true;
        showHeader = true;
        showFixedNav = false;
    }

    if (router.pathname.startsWith("/product/")) {
        headerType2Params = {
            title: "",
            withShare: true,
            withLogo: true,
            backUrl: "/products",
            hasCartLink: true
        };
        showFooter = true;
        showHeader = true;
        showFixedNav = false;
        hasInternalFixedFooter = true;
    }

    if (router.pathname === "/categories"){
        headerType2Params = {
            title: "",
            withShare: false,
            withLogo: true,
            backUrl: "/"
        };
        showFooter = false;
        showHeader = true;
        showFixedNav = true;
    }
    if (router.pathname === '/cart') {
        headerType2Params = {
            title: "",
            withLogo: true,
            backToPrev: true
        };
        showFooter = false;
        showHeader = true;
        showFixedNav = false;
        hasInternalFixedFooter = true;
    }
    if (router.pathname === '/payment') {
        headerType2Params = {
            title: "",
            withLogo: true,
            backUrl: "/cart",
        };
        showFooter = false;
        showHeader = true;
        showFixedNav = false;
        hasInternalFixedFooter = true;
    }
    if (router.pathname === '/confirm') {
        headerType2Params = {
            title: "",
            withLogo: true,
            backUrl: "/cart",
        };
        showFooter = false;
        showHeader = true;
        showFixedNav = false;
        hasInternalFixedFooter = false;
    }
    
    if (router.pathname === '/checkout') {
        headerType2Params = {
            title: "",
            withLogo: true,
            backUrl: "/cart",
        };
        showFooter = false;
        showHeader = true;
        showFixedNav = false;
        hasInternalFixedFooter = false;
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
        }else{
            dispatch(setReduxUser({
                isAuthenticated: false,
                user: {},
                getUserLoading: false
            }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchBalance = async () => {

            const token = localStorage?.getItem('Token');
            if (!token) return;

            dispatch(setReduxBalance({ balance: undefined, loading: true, currency:"" }));
            const response: any = await getUserBalance(token);
            if (response.data?.result?.amount !== null) {
                dispatch(setReduxBalance({ balance: response?.data?.result?.amount, loading: false, currency: response?.data?.result?.currencyType }))
            } else {
                dispatch(setReduxBalance({ balance: undefined, loading: false,  currency:"" }));
            }
        }
        if (isAuthenticated) {
            fetchBalance();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    let headerType2 = headerType2Params;
    if (headerType2ParamsFromRedux.backUrl) {
        headerType2 = headerType2ParamsFromRedux;
    }

    let mainHeightClass : string = "";
    if(showFooter){
         mainHeightClass = "";
    }else if (showFixedNav || hasInternalFixedFooter){
        if(showHeader){
            mainHeightClass = "min-h-screen-nav-header";
        }else{
            mainHeightClass = "min-h-screen-nav";
        }
    }else if(showHeader){
        mainHeightClass = "min-h-screen-header";
    }else{
          mainHeightClass = "min-h-screen";
    }
    return (
        <>
            <Error />
            <Notification />
            <div className={`bg-[#fafafa] text-[#333333] dark:bg-[#011425] dark:text-white md:max-w-lg mx-auto ${isBodyScrollable ? "" : "overflow-hidden h-screen"}`}>
                <PageLoadingBar active={loading} />
                {showHeader && <>
                    <Header type2Params={headerType2} />
                    <div className="mt-[84px]" />
                </>}
                <main 
                    className={mainHeightClass}
                    style={{
                        position: (!isBodyScrollable && lastScrollPosition) ?"relative": "static",
                        top: -lastScrollPosition+"px"
                    }}
                >
                    {props.children}
                </main>
                {showFooter && <Footer />}
                {showFixedNav && <FooterNavigation />}
            </div>
        </>


    )
}
export default Layout;