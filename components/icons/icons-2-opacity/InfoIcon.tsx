type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const InfoIcon: React.FC<Props> = props => {
    return (
        <svg viewBox="0 0 40 40" className={props.className || "fill-none"} >
            <path className="stroke-15 round-linecap" d="M20,39c10.5,0,19-8.5,19-19S30.5,1,20,1S1,9.6,1,20S9.6,39,20,39z"/>
            <path className="opacity-40 stroke-15 round-linecap" d="M20,12.4v9.5"/>
            <path className="opacity-40 stroke-2 round-linecap" d="M20,27.6L20,27.6"/>
        </svg>
    )
}

export default InfoIcon;