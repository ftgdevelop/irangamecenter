type Props = {
    className?:string;
    type?:"button" | "image";
    dark?: boolean;
}

const Skeleton : React.FC<Props> = props => {
    return(
        <div className={`${props.type === "button" ? "h-12" : props.type === "image" ? "" : "h-4"} bg-neutral-100 ${props.dark?"dark:bg-[#263542]":""} rounded relative overflow-hidden ${props.className}`}>
            <span className={`block absolute top-0 right-0 h-full w-full animate-skeleton bg-gradient-to-r from-transparent from-5% via-neutral-300/50 ${props.dark?"dark:via-neutral-300/10":""} via-50% to-transparent to-95%`} />
        </div>
    )
}

export default Skeleton;