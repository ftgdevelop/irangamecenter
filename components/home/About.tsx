import Image from "next/image";
import Markdown from 'react-markdown';

type Props = {
    description : string;
}

const About:React.FC<Props> = props => {
    return (
        <div className="p-3">
            <div className="flex gap-4 py-5">
                <Image src="/logo2.svg" alt="irangamecenter" width={50} height={50} />
                <div>
                    <strong className="block text-xl font-bold">
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

export default About;