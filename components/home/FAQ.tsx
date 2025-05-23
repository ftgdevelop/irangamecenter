import Markdown from "react-markdown";
import Accordion from "../shared/Accordion";

type Props = {
    items: {
        id: number;
        Question?: string;
        Answer?: string;
    }[];
}
const FAQ: React.FC<Props> = props => {
    return (
        <div className="px-3">
            {props.items.map((item, index) => (
                <Accordion
                    key={item.id}
                    title={item.Question}
                    content={<Markdown>{item.Answer}</Markdown>}
                    WrapperClassName={`border-b border-white/15 py-2 ${index ? "" : "border-t"}`}
                />
            ))}
        </div>
    )
}

export default FAQ;