type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const SortIcon: React.FC<Props> = props => {
    return (
        <svg
            viewBox="0 0 24 24"
            className={props.className || "fill-current"}
        >
            <path d="M22.2,7.5H1.8C1.4,7.5,1,7.1,1,6.6s0.4-0.8,0.8-0.8h20.3c0.5,0,0.8,0.4,0.8,0.8S22.6,7.5,22.2,7.5z"/>
            <path d="M18.8,13.1H5.2c-0.5,0-0.8-0.4-0.8-0.8c0-0.5,0.4-0.8,0.8-0.8h13.5c0.5,0,0.8,0.4,0.8,0.8
                C19.6,12.7,19.2,13.1,18.8,13.1z"/>
            <path d="M14.3,18.8H9.7c-0.5,0-0.8-0.4-0.8-0.8c0-0.5,0.4-0.8,0.8-0.8h4.5c0.5,0,0.8,0.4,0.8,0.8
                C15.1,18.4,14.7,18.8,14.3,18.8z"/>
        </svg>

    )
}

export default SortIcon;