type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const Password: React.FC<Props> = props => {
    return (
        <svg viewBox="0 0 40 40" className={props.className || "fill-none"} >
            <path className="opacity-40 stroke-15" d="M18.1,34.3h-6.7c-1.2,0-2.2,0-3.2-0.2c-5-0.6-6.3-2.9-6.3-9.3v-9.5c0-6.4,1.3-8.8,6.3-9.3 c0.9-0.1,2-0.2,3.2-0.2H18"/>
            <path className="stroke-15" d="M25.7,5.8h2.8c1.2,0,2.2,0,3.2,0.2c5,0.6,6.3,2.9,6.3,9.3v9.5c0,6.4-1.3,8.8-6.3,9.3c-0.9,0.1-2,0.2-3.2,0.2 h-2.8"/>
            <path className="stroke-15" d="M25.7,1v38"/>
            <path className="opacity-40 stroke-2 round-linecap" d="M18.3,20L18.3,20"/>
            <path className="opacity-40 stroke-2 round-linecap" d="M10.7,20L10.7,20"/>
        </svg>
    )
}

export default Password;