import Image from "next/image";
import Markdown from 'react-markdown';

type Props = {
    description : string;
    isInHome?: boolean;
}

const Intro:React.FC<Props> = props => {
    return (
        <div className="px-5">

            <div className={`flex gap-4 ${props.isInHome ? "py-5" : "mb-6 flex-col items-center justify-center"}`}>
                <Image src={props.isInHome ? "/logo2.svg" : "/logo.svg"} alt="irangamecenter" width={50} height={50} />
                <div className={props.isInHome?"":"text-center"}>
                    <strong className={`block font-bold ${props.isInHome?"text-xl":"text-2xl mb-2"}`}>
                        ایران گیم سنتر
                    </strong>
                    <span className="text-xs">
                        فروشگاه آنلاین اکانت بازی
                    </span>
                </div>
            </div>

            <div className="text-sm leading-6 text-justify mb-6">
                <Markdown>
                    {props.description}
                </Markdown>
            </div>
        </div>
    )
}

export default Intro;