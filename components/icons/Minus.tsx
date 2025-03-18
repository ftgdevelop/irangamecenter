type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const Minus: React.FC<Props> = props => {
    return (
        <svg
            viewBox="0 0 40 40"
            className={props.className || "fill-current"}
            width={props.width || 24}
            height={props.height || 24}
        >
            <path d="M36.9,22.1H3.1C2,22.1,1,21.2,1,20s1-2.1,2.1-2.1h33.8c1.2,0,2.1,1,2.1,2.1S38,22.1,36.9,22.1z" />
        </svg>
    )
}

export default Minus;