import Image from "next/image";

type Props = {
    Image: string;
    Title: string;
    open: () => void;
}

const HightlightItemLink: React.FC<Props> = props => {
    return (
        <button
            className="inline-block text-center shrink-0"
            onClick={props.open}
        >
            <div
                className="inline-block mb-3 p-1 mx-auto bg-gradient-to-tr from-violet-600 from-10% via-green-300 via-50% to-red-500 to-90% rounded-full"
            >
                <Image
                    src={props.Image || "/images/default-game.png"}
                    alt={props.Title}
                    width={80}
                    height={80}
                    className="rounded-full bg-white block w-16 h-16"
                />
            </div>
            <div className="text-xs text-center w-20">
                {props.Title}
            </div>
        </button>
    )
}

export default HightlightItemLink;