type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const WalletSearch: React.FC<Props> = props => {
    return (
        <svg viewBox="0 0 40 40" className={props.className || "fill-none"} >
            <path className="stroke-15" d="M20,39h9.5c5.7,0,9.5-3.8,9.5-9.5V20c0-5.1-3.2-8.9-8-9.5c-0.4,0-0.9,0-1.5,0h-19c-0.6,0-0.9,0-1.5,0.2 C4,11.3,1,14.9,1,20c0,0.6,0,1.3,0,1.9" />
            <path className="opacity-40 stroke-15" d="M31,10.5c-0.4,0-0.9,0-1.5,0h-19c-0.6,0-0.9,0-1.5,0.2c0.2-0.6,0.6-0.9,1.1-1.5l6.1-6.3c2.7-2.7,6.8-2.7,9.5,0 l3.4,3.4C30.3,7.5,30.8,9,31,10.5z" />
            <path className="opacity-40 stroke-15" d="M39,21h-5.7c-2.1,0-3.8,1.7-3.8,3.8s1.7,3.8,3.8,3.8H39" />
            <path className="stroke-15" d="M8.2,37.9c3.4,0,6.1-2.7,6.1-6.1s-2.7-6.1-6.1-6.1c-3.4,0-6.1,2.7-6.1,6.1S4.9,37.9,8.2,37.9z" />
            <path className="stroke-15" d="M1,39l1.9-1.9" />
        </svg>
    )
}

export default WalletSearch;