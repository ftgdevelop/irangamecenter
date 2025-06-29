type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const Home2: React.FC<Props> = props => {
    return (
        <svg
            viewBox="0 0 24 24"
            className={props.className || "fill-current"}
            width={props.width || 24}
            height={props.height || 24}
        >
            <path d="M12.2,19.1c-0.4,0-0.8-0.4-0.8-0.8v-3.1c0-0.4,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8v3.1
	            C13,18.7,12.6,19.1,12.2,19.1z"/>
            <path d="M18,23.1H6.3c-1.9,0-3.6-1.5-3.9-3.3L1,11.4c-0.2-1.3,0.4-3,1.4-3.8l7.2-5.8c1.4-1.1,3.6-1.1,5,0l7.2,5.8
	            c1,0.8,1.7,2.5,1.4,3.8L22,19.7C21.7,21.6,19.9,23.1,18,23.1z M12.2,2.6c-0.6,0-1.1,0.2-1.5,0.5L3.4,8.9c-0.6,0.5-1,1.6-0.9,2.3
	            l1.4,8.3c0.2,1.1,1.3,2,2.4,2H18c1.1,0,2.2-0.9,2.4-2l1.4-8.3c0.1-0.7-0.3-1.8-0.9-2.3l-7.2-5.8C13.3,2.7,12.7,2.6,12.2,2.6z"/>
        </svg>
    )
}

export default Home2;