type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const UserIcon: React.FC<Props> = props => {
    return (
        <svg viewBox="0 0 40 40" className={props.className || "fill-none"} >
            <path className="opacity-40 stroke-15" d="M20.2,21.5c-0.1,0-0.3,0-0.5,0c-3.3-0.1-6-2.9-6-6.2c0-3.4,2.8-6.2,6.2-6.2c3.4,0,6.2,2.8,6.2,6.2 C26.2,18.6,23.6,21.4,20.2,21.5z"/>
            <path className="opacity-40 stroke-15" d="M32.8,34c-3.4,3.1-7.9,5-12.8,5s-9.4-1.9-12.8-5c0.2-1.8,1.3-3.5,3.4-4.9c5.2-3.5,13.7-3.5,18.9,0 C31.5,30.5,32.6,32.2,32.8,34z"/>
            <path className="stroke-15" d="M20,39c10.5,0,19-8.5,19-19S30.5,1,20,1S1,9.5,1,20S9.5,39,20,39z"/>
        </svg>
    )
}

export default UserIcon;