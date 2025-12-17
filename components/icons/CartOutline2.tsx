type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const CartOutline2: React.FC<Props> = props => {
    return (
        <svg
            viewBox="0 0 42 42"
            className={props.className || "stroke-current"}
        >
            <path d="M14.7 11.375H27.3C33.25 11.375 33.845 14.1575 34.2475 17.5525L35.8225 30.6775C36.33 34.9825 35 38.5 28.875 38.5H13.1425C7.00004 38.5 5.67004 34.9825 6.19504 30.6775L7.77004 17.5525C8.15504 14.1575 8.75004 11.375 14.7 11.375Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 14V7.875C14 5.25 15.75 3.5 18.375 3.5H23.625C26.25 3.5 28 5.25 28 7.875V14M35.7175 29.8025H14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    )
}

export default CartOutline2;