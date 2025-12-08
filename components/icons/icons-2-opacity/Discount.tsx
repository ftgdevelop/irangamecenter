type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const Discount: React.FC<Props> = props => {
    return (
        <svg viewBox="0 0 40 40" className={props.className || "fill-none"} >
            <path className="stroke-15" d="M34.3,20.9c0-2.6,2.1-4.7,4.7-4.7v-1.9c0-7.6-1.9-9.5-9.5-9.5h-19C2.9,4.8,1,6.7,1,14.3v0.9 
    c2.6,0,4.7,2.1,4.7,4.7S3.6,24.7,1,24.7v0.9c0,7.6,1.9,9.5,9.5,9.5h19c7.6,0,9.5-1.9,9.5-9.5C36.4,25.7,34.3,23.6,34.3,20.9z"/>
            <path className="opacity-40 stroke-15" d="M14.3,25.2l11.4-11.4"/>
            <path className="opacity-40 stroke-2 round-linecap" d="M25.7,25.2L25.7,25.2"/>
            <path className="opacity-40 stroke-2 round-linecap" d="M14.3,14.8L14.3,14.8"/>
        </svg>
    )
}

export default Discount;