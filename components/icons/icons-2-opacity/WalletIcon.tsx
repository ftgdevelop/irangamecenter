type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const WalletIcon: React.FC<Props> = props => {
    return (
        <svg viewBox="0 0 40 40" className={props.className || "fill-none"} >
            <path className="opacity-40 stroke-15" d="M21.9,18.4H10.8" />
            <path className="opacity-40 stroke-15" d="M1.5,18.4V9.8C1.5,6,4.6,3,8.4,3h10.4c3.8,0,6.9,2.4,6.9,6.2" />
            <path className="stroke-15" d="M30.3,20.4c-0.9,0.9-1.4,2.3-1,3.7c0.5,1.7,2.2,2.8,4,2.8H35v2.7c0,4.1-3.3,7.4-7.4,7.4H8.9 c-4.1,0-7.4-3.3-7.4-7.4v-13c0-4.1,3.3-7.4,7.4-7.4h18.6c4.1,0,7.4,3.3,7.4,7.4v2.7h-2C31.9,19.3,31,19.7,30.3,20.4z"/>
            <path className="stroke-15" d="M38.7,21.1V25c0,1-0.9,1.9-1.9,1.9h-3.6c-2,0-3.8-1.5-4-3.5c-0.1-1.2,0.3-2.3,1.1-3c0.7-0.7,1.6-1.1,2.7-1.1 h3.8C37.8,19.3,38.7,20.1,38.7,21.1z"/>
        </svg>
    )
}

export default WalletIcon;