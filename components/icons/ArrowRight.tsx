type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const ArrowRight: React.FC<Props> = props => {
    return (
        <svg
            viewBox="0 0 40 40"
            className={props.className || "fill-current"}
        >
            <path d="M33.3,21.1l-9.8,9.8c-0.4,0.4-0.4,1.1,0,1.6c0.4,0.4,1.1,0.4,1.6,0l11.6-11.6c0.2-0.2,0.3-0.5,0.3-0.8
			c0-0.3-0.1-0.6-0.3-0.8L25,7.6c-0.4-0.4-1.1-0.4-1.6,0s-0.4,1.1,0,1.6l9.8,9.8H4.8c-0.6,0-1.1,0.5-1.1,1.1c0,0.6,0.5,1.1,1.1,1.1
			H33.3z"/>
        </svg>

    )
}

export default ArrowRight;