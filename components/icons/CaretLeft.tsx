type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const CaretLeft: React.FC<Props> = props => {
    return (
        <svg className={props.className || "fill-current"} viewBox="0 -960 960 960">
            <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
    )
}

export default CaretLeft;