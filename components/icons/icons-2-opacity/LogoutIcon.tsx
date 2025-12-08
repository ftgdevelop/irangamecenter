type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const LogoutIcon: React.FC<Props> = props => {
    return (
        <svg viewBox="0 0 40 40" className={props.className || "fill-none"} >
            <g className="opacity-40 stroke-15">
                <path d="M33,26.1l6-6l-6-6" />
                <path d="M15,20.1h23.8" />
            </g>
            <path className="stroke-15" d="M19.7,38.7C9.4,38.7,1,31.7,1,20S9.4,1.3,19.7,1.3" />
        </svg>
    )
}

export default LogoutIcon;