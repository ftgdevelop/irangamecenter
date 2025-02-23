import { PropsWithChildren } from "react";
import Header from "./header/Index";
import Footer from "./footer/Index";
import { useRouter } from "next/router";
import Error from "../Error";

type Props = {
    className?: string;
}

const Layout: React.FC<PropsWithChildren<Props>> = props => {

    const router = useRouter();

    let showHeader = true;
    let showFooter = true;

    if (router.pathname === "/login") {
        showFooter = false;
        showHeader = false;
    }


    return (
        <>
            <Error />
            <div className="bg-[#011425] text-white max-w-lg mx-auto">
                {showHeader && <Header />}
                <main className="min-h-screen">
                    {props.children}
                </main>
                {showFooter && <Footer />}
            </div>
        </>


    )
}
export default Layout;