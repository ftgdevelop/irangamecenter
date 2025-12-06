import Markdown from "react-markdown";
import Accordion from "./Accordion";
import parse from 'html-react-parser';

type Props = {
    items: {
        id: number;
        Question?: string;
        Answer?: string;
    }[];
    answerParse:"parse"|"markDown"
}
const FAQ: React.FC<Props> = props => {
    return (
        <div className="px-4">
            {props.items.map((item, index) => (
                <Accordion
                    key={item.id}
                    title={item.Question}
                    content={props.answerParse === "markDown" ? (<Markdown>{item.Answer}</Markdown>) : parse(item.Answer||"")}
                    WrapperClassName={`border-b border-black/15 dark:border-white/15 py-2 ${index ? "" : "border-t"}`}
                />
            ))}
        </div>
    )
}

export default FAQ;