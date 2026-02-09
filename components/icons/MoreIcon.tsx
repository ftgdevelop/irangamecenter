type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const MoreIcon: React.FC<Props> = props => {
    return (
        <svg
            viewBox="0 0 32 32"
            className={props.className || "stroke-current"}
            width={props.width || 24}
            height={props.height || 24}
        >
            <path d="M12.89,26.89c0,1.71,1.4,3.11,3.11,3.11c1.71,0,3.11-1.4,3.11-3.11c0-1.71-1.4-3.11-3.11-3.11
	            C14.29,23.78,12.89,25.18,12.89,26.89z M12.89,5.11c0,1.71,1.4,3.11,3.11,3.11c1.71,0,3.11-1.4,3.11-3.11C19.11,3.4,17.71,2,16,2
	            C14.29,2,12.89,3.4,12.89,5.11z M12.89,16c0,1.71,1.4,3.11,3.11,3.11c1.71,0,3.11-1.4,3.11-3.11s-1.4-3.11-3.11-3.11
                C14.29,12.89,12.89,14.29,12.89,16z"/>
        </svg>
    )
}

export default MoreIcon;