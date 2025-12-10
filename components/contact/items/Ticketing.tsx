import Image from "next/image";
import Link from "next/link";

type Props = {
    url?: string;
    icon?: string;
    label?: string;
}

const Ticketing : React.FC<Props> = props => {
    return(
        <Link
            prefetch={false}
            className="font-semibold text-sm mb-3 text-white flex py-4 min-h-20 px-5 items-center bg-gradient-to-t from-[#01212e] to-[#102c33] rounded-xl gap-4"
            href={props.url||"#"}
        >
            {!!props.icon && <Image 
                src={props.icon}
                alt={props.label||""}
                width={36}
                height={36}
                className="w-9 h-9"
            />}
            
            {props.label}

        </Link>
    )
}

export default Ticketing;