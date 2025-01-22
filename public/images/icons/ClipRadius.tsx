type Props = {
    className?: string;
}

const ClipRadius: React.FC<Props> = props => {
    return (
        <svg viewBox="0 0 32 32" className={`${props.className || "fill-current w-10 h-10"}`}>
            <path d="M 0 0 V 32 H 32 A 32 32  0 0 1 0 0" />
        </svg>
    )
}

export default ClipRadius;