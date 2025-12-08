type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const Cart: React.FC<Props> = props => {
    return (
        <svg viewBox="0 0 40 40" className={props.className || "fill-none"} >
            <path className="stroke-15" d="M13.2,9.6h13.7c6.5,0,7.1,3,7.5,6.7l1.7,14.3c0.6,4.7-0.9,8.5-7.5,8.5H11.5c-6.7,0-8.1-3.8-7.5-8.5l1.7-14.3 C6.1,12.6,6.7,9.6,13.2,9.6z" />
            <path className="opacity-40 stroke-15" d="M12.4,12.4V5.8c0-2.8,1.9-4.8,4.8-4.8h5.7c2.9,0,4.8,1.9,4.8,4.8v6.6" />
            <path className="opacity-40 stroke-15" d="M36,29.6H12.4" />
        </svg>
    )
}

export default Cart;