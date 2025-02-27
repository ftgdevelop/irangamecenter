type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const CloseSimple: React.FC<Props> = props => {
    return (
        <svg
            className={props.className || "fill-current"}
            viewBox="0 -960 960 960"
        >
            <path d="M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z"/>
        </svg>

    )
}

export default CloseSimple;