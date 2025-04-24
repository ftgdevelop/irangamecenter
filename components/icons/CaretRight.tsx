type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const CaretRight: React.FC<Props> = props => {
    return (
        <svg viewBox="0 -960 960 960" className={props.className || "fill-current"}>
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
        </svg>
    )
}

export default CaretRight;