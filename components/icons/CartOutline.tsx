type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const CartOutline: React.FC<Props> = props => {
    return (
        <svg
            viewBox="0 0 24 24"
            className={props.className || "stroke-current"}
        >
            <path d="M8.40002 6.5H15.6C19 6.5 19.34 8.09 19.57 10.03L20.47 17.53C20.76 19.99 20 22 16.5 22H7.51002C4.00002 22 3.24002 19.99 3.54002 17.53L4.44002 10.03C4.66002 8.09 5.00002 6.5 8.40002 6.5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 8V4.5C8 3 9 2 10.5 2H13.5C15 2 16 3 16 4.5V8M20.41 17.03H8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    )
}

export default CartOutline;