type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const Refresh: React.FC<Props> = props => {
    return (
        <svg
            viewBox="0 0 24 24"
            className={props.className || "fill-current"}
            width={props.width || 24}
            height={props.height || 24}
        >
            <path d="M12,21.5c2.7,0,4.9-0.9,6.7-2.8s2.8-4.1,2.8-6.7s-0.9-4.9-2.8-6.7s-4-2.8-6.7-2.8c-1.3,0-2.7,0.3-3.9,0.8
	S5.8,4.8,5,5.8V2.5H2.5v8.3h8.3V8.4h-5c0.6-1.1,1.5-2,2.6-2.6s2.3-1,3.6-1c2,0,3.7,0.7,5,2.1c1.3,1.3,2.1,3,2.1,5s-0.7,3.7-2.1,5
	c-1.3,1.3-3,2.1-5,2.1c-1.5,0-2.9-0.4-4.1-1.3s-2.1-2-2.6-3.4H2.8c0.5,2.1,1.7,3.7,3.4,5.1C7.9,20.7,9.9,21.5,12,21.5z"/>
        </svg>
    )
}

export default Refresh;