import { useEffect, useRef, useState } from "react";

type Props = {
    content: React.ReactNode;
    title: React.ReactNode;
    WrapperClassName?: string;
    initiallyOpen?: boolean;
    updateContent?: string;
    withArrowIcon?: boolean;
}

const Accordion: React.FC<Props> = props => {

    const contentRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState<boolean>(props.initiallyOpen || false);

    const { content, title, WrapperClassName, withArrowIcon } = props;

    const toggle = () => { setOpen(prevState => !prevState) }

    useEffect(() => {
        if (open) {
            contentRef.current!.style.maxHeight = contentRef.current!.scrollHeight + "px";
        } else {
            contentRef.current!.style.maxHeight = "0";
        }
    }, [open, props.updateContent]);

    let expandIconClass = `w-4 h-4 before:absolute before:bg-white/50 before:w-px before:h-full before:left-1/2 before:top-0 before:transition-all ${open ? "before:opacity-0" : "before:opacity-100"}
            after:absolute after:bg-white/50 after:w-full after:h-px after:top-1/2 after:left-0`;

    if (withArrowIcon) {
        expandIconClass = `w-3 h-3 border block border-white border-r-transparent border-t-transparent transition-all ${open ? "rotate-45" : "-rotate-45"}`
    }

    return (
        <div className={`text-sm ${WrapperClassName || ""}`}>
            <div onClick={toggle} className={`leading-5 relative font-semibold select-none cursor-pointer py-2 pl-12`}>
                {title}
                <div className={`absolute left-0 top-2.5 ${expandIconClass}`} />
            </div>
            <div
                ref={contentRef}
                className="overflow-hidden transition-all duration-300"
            >
                <div className={`text-justify leading-6 text-xs py-3`}>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Accordion;