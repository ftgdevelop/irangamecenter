type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const Wallet: React.FC<Props> = props => {
    return (
        <svg
            viewBox="0 0 40 40"
            className={props.className || "fill-current"}
        >
            <path d="M28.8,39H11.2C5.1,39,1,34.9,1,28.8V20c0-5.4,3.4-9.4,8.6-10c0.5-0.1,1-0.1,1.6-0.1h17.7c0.4,0,1,0,1.5,0.1
	C35.6,10.5,39,14.5,39,20v8.8C39,34.9,34.9,39,28.8,39z M11.2,12.5c-0.4,0-0.8,0-1.2,0.1C6,13.1,3.7,15.9,3.7,20v8.8
	c0,4.6,3,7.5,7.5,7.5h17.7c4.6,0,7.5-3,7.5-7.5V20c0-4.1-2.4-7-6.3-7.4c-0.4-0.1-0.8-0.1-1.2-0.1H11.2z"/>
            <path d="M9.7,12.6c-0.4,0-0.8-0.2-1.1-0.5c-0.3-0.4-0.3-0.9-0.1-1.4C8.8,10.1,9.3,9.5,9.8,9l5.7-5.8
	c2.9-2.9,7.7-2.9,10.6,0l3.1,3.1c1.3,1.3,2.1,3,2.2,4.9c0,0.4-0.1,0.8-0.4,1.1s-0.7,0.4-1.1,0.3c-0.4-0.1-0.7-0.1-1.1-0.1H11.2
	c-0.4,0-0.8,0-1.2,0.1C9.9,12.6,9.8,12.6,9.7,12.6z M12.7,9.8h15.8c-0.2-0.6-0.6-1.1-1.1-1.6L24.3,5c-1.9-1.9-5-1.9-6.9,0L12.7,9.8z
	"/>
            <path d="M37.7,29.3h-5.3c-2.7,0-4.9-2.2-4.9-4.9s2.2-4.9,4.9-4.9h5.3c0.7,0,1.3,0.6,1.3,1.3s-0.6,1.3-1.3,1.3h-5.3
	c-1.2,0-2.2,1-2.2,2.2c0,1.2,1,2.2,2.2,2.2h5.3c0.7,0,1.3,0.6,1.3,1.3S38.4,29.3,37.7,29.3z"/>
        </svg>

    )
}

export default Wallet;