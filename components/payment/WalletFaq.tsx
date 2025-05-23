import Accordion from "../shared/Accordion";

type Props = {
    items:{
        content: React.ReactNode;
        title: React.ReactNode;
        key: number;   
    }[]
}

const WalletFaq: React.FC<Props> = props => {
    return (
        <div className="px-3">
            {props.items.map((item, index) => (
                <Accordion
                    key={item.key}
                    title={item.title}
                    content={item.content}
                    WrapperClassName={`border-b border-white/15 py-2 ${index ? "" : "border-t"}`}
                />
            ))}
        </div>
    )
}

export default WalletFaq;