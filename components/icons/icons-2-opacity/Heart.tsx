type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const Heart: React.FC<Props> = props => {
    return (
        <svg viewBox="0 0 40 40" className={props.className || "fill-none"} >
            <path className="stroke-15" d="M20,39c10.5,0,19-8.5,19-19S30.5,1,20,1S1,9.5,1,20S9.5,39,20,39z"/>
            <path className="opacity-40 stroke-15" d="M20.6,30.4c-0.3,0.1-0.9,0.1-1.3,0c-3-1-9.6-5.2-9.6-12.4c0-3.2,2.5-5.7,5.7-5.7c1.9,0,3.5,0.9,4.6,2.3 c1-1.4,2.7-2.3,4.6-2.3c3.2,0,5.7,2.6,5.7,5.7C30.3,25.1,23.6,29.3,20.6,30.4z"/>
        </svg>
    )
}

export default Heart;