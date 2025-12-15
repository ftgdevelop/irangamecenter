type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const InfoCircleOutline: React.FC<Props> = props => {
    return (
        <svg
            viewBox="0 0 24 24"
            className={props.className || "stroke-current"}
        >
            <path d="M12 8V13M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.9941 16H12.0031" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    )
}

export default InfoCircleOutline;