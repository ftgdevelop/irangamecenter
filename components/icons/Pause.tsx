type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const Pause: React.FC<Props> = props => {
    return (
        <svg
            viewBox="0 -960 960 960"
            className={props.className || "fill-current"}
            width={props.width || 24}
            height={props.height || 24}
        >
            <path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"/>
        </svg>
    )
}

export default Pause;