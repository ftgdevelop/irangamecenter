type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const CheckIcon: React.FC<Props> = props => {
    return (
        <svg className={props.className || ""} viewBox="0 -960 960 960"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
    )
}

export default CheckIcon;