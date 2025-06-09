import Image from "next/image";
import { ServerAddress } from "@/enum/url";

type Props = {
    items: {
        Description?: string;
        Image?:{
        url?: string;
        };
        Title?: string;
    }[];
}
const AboutIcons: React.FC<Props> = props => {
    return (
        <div className="px-3 grid grid-cols-2 gap-3.5 mb-10">
            {props.items.map(item=> (
                <div 
                    key={item.Title}
                    className="flex py-5 px-3 flex-col text-center min-h-28 items-center justify-center bg-gradient-to-t from-[#01212e] to-[#102c33] rounded-xl gap-3"
                >
                    {!!item.Image?.url && (
                        <Image 
                            src={ServerAddress.Type!+ServerAddress.Strapi+item.Image.url} 
                            alt={item.Title||""}
                            width={100}
                            height={100}
                            className="w-11 h-11 object-contain"
                        />
                    )}
                    
                    <h3 className="text-sm">
                        {item.Title}
                    </h3>

                    <p className="text-2xs text-[#2ac99f]">
                        {item.Description}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default AboutIcons;