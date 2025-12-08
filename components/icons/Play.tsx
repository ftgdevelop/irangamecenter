type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const Play: React.FC<Props> = props => {
    return (
        <svg
            viewBox="0 -960 960 960"
            className={props.className || "fill-current"}
            width={props.width || 24}
            height={props.height || 24}
        >
            <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/>
        </svg>
    )
}

export default Play;