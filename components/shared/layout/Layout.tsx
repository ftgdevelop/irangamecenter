import { PropsWithChildren } from "react";
import Header from "./header/Index";
import Footer from "./footer/Index";

type Props = {

}

const Layout: React.FC<PropsWithChildren<Props>> = props => {

    return (

        <div className="bg-[#011425] text-white max-w-lg mx-auto">
            <Header />
            <main className="min-h-screen">
                {props.children}
            </main>
            <Footer />
        </div>

    )
}
export default Layout;