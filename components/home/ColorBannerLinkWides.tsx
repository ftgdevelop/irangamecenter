import ColorBannerLinkWideItem from "./ColorBannerLinkWideItem";

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

const ColorBannerLinkWides : React.FC<Props> = props => {
    
    return (
        <div className="p-3">
            {props.items.map((item,index) => {
                let bg ="";
                switch (index%4){
                    case 1:
                        bg="#f7ccd5"
                        break;
                    case 2:
                        bg="#e7f3e7"
                        break;
                    case 3:
                        bg="#cccccc"
                        break;
                    default:
                        bg="#dfe0e2"
                }
                return (
                    <ColorBannerLinkWideItem 
                        key={item.title}
                        {...item}
                        wrapperClassName="mb-4"
                        bg={bg}
                    />
                )
            })}
        </div>
    )
}

export default ColorBannerLinkWides;