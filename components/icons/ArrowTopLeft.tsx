type Props = {
    className?: string;
    color?: string;
}

const ArrowTopLeft: React.FC<Props> = props => {
    return (
        <svg
            viewBox="0 0 60 60"
            className={props.className || ""}
        >
            <path d="M6.3,10v33.2c0,1.5-1.2,2.6-2.6,2.6c-1.5,0-2.6-1.2-2.6-2.6V3.6c0-0.7,0.3-1.4,0.8-1.9C2.3,1.3,2.9,1,3.6,1
	h39.5c1.5,0,2.6,1.2,2.6,2.6s-1.2,2.6-2.6,2.6H10l48.2,48.2c1,1,1,2.7,0,3.7c-1,1-2.7,1-3.7,0L6.3,10z"/>
        </svg>

    )
}

export default ArrowTopLeft;