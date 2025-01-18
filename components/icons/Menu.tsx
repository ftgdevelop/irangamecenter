type Props = {
    width?: number;
    height?: number;
}

const Menu: React.FC<Props> = props => {
    return (
        <svg
            width={props.width || 24}
            height={props.height || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
        </svg>
    )
}

export default Menu;