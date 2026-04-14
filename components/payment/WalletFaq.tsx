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
        <>
            {props.items.map((item, index) => (
                <Accordion
                    key={item.key}
                    title={item.title}
                    content={item.content}
                    WrapperClassName={`max-lg:border-b border-neutral-300 dark:border-white/15 py-2 ${index ? "lg:border-t" : "max-lg:border-t"}`}
                />
            ))}
        </>
    )
}

export default WalletFaq;