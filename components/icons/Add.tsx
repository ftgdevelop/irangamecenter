type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const Add: React.FC<Props> = props => {
    return (
        <svg
            viewBox="0 -960 960 960"
            className={props.className || "fill-current"}
            width={props.width || 24}
            height={props.height || 24}
        >
            <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z" />
        </svg>
    )
}

export default Add;