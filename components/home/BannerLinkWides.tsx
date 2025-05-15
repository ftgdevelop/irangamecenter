import BannerLinkWideItem from "./BannerLinkWideItem";

type Items = {
    imageUrl?: string;
    imageAlt?: string;
    imageTitle?: string;
    title: string;
    subtitle?: string;
    url: string;
}
type Props = {
    items : Items[]
}

const BannerLinkWides: React.FC<Props> = props => {
    return (
        <div className="p-3">
            {props.items?.map(item => (
                <BannerLinkWideItem 
                    key={item.title}
                    {...item}
                    wrapperClassName="mb-4"
                />
            ))}
        </div>
    )
}

export default BannerLinkWides;