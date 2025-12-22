type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const Download: React.FC<Props> = props => {
    return (
        <svg
            viewBox="0 -960 960 960"
            className={props.className || "fill-current"}
        >
            <path d="M160-80v-80h640v80H160Zm320-160L200-600h160v-280h240v280h160L480-240Zm0-130 116-150h-76v-280h-80v280h-76l116 150Zm0-150Z"/>
        </svg>

    )
}

export default Download;