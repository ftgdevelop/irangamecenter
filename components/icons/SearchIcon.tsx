type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const SearchIcon: React.FC<Props> = props => {
    return (
        <svg viewBox="0 0 42 42" className={props.className || "fill-current"}>
            <g>
                <path d="M19.6,38.1C9.9,38,2.2,30.3,2.2,20.6c0-9.7,7.7-17.4,17.4-17.4c9.6,0,17.4,7.8,17.4,17.5 C37,30.4,29.3,38.1,19.6,38.1z M19.5,5.2C10.9,5.2,4.2,12,4.2,20.6c0,8.6,6.9,15.6,15.4,15.5c8.7,0,15.4-6.9,15.4-15.6    C35,12,28.1,5.1,19.5,5.2z" />
                <path className="fill-[#ff163e]" d="M38.8,38.7c0,0.5-0.2,0.8-0.5,1c-0.3,0.2-0.7,0.2-1-0.1c-1.3-1.3-2.5-2.5-3.8-3.8c-0.3-0.4-0.2-0.8,0.1-1.1    c0.3-0.3,0.7-0.6,1.1-0.3c1.5,1.2,2.8,2.6,4.1,4C38.8,38.5,38.8,38.6,38.8,38.7z" />
            </g>
        </svg>

    )
}

export default SearchIcon;