type Props = {
    className?: string;
}
export const DownCaretThick: React.FC<Props> = props => {
    return (
        <svg className={props.className || ""} viewBox="0 0 24.7 24.7">
            <path d="M12.4,19.1l-12-12L2.5,5l9.9,9.9L22.2,5l2.1,2.2L12.4,19.1z" />
        </svg>
    );
}