type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const Faq: React.FC<Props> = props => {
    return (
        <svg
            viewBox="0 0 24 24"
            className={props.className || "stroke-current"}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 16v.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export default Faq;