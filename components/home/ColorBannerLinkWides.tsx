import ColorBannerLinkWideItem from "./ColorBannerLinkWideItem";

const ColorBannerLinkWides = () => {
    const items : {
        imageUrl?: string;
        title: string;
        subtitle?: string;
        url: string;
        bg: string;
    }[] =[
        {
            title:"گوکل پلی",
            imageUrl:"/images/categories/google-play.png",
            subtitle:"گیفت کارت",
            url:"#",
            bg:"#dfe0e2"
        },
        {
            title:"پلی استیشن",
            imageUrl:"/images/categories/ps.png",
            subtitle:"گیفت کارت",
            url:"#",
            bg:"#f7ccd5"
        },
        {
            title:"ایکس باکس",
            imageUrl:"/images/categories/Xbox.png",
            subtitle:"گیفت کارت",
            url:"#",
            bg:"#e7f3e7"
        },
        {
            title:"استیم",
            imageUrl:"/images/categories/steam.png",
            subtitle:"گیفت کارت",
            url:"#",
            bg:"#cccccc"
        }
    ];

    return (
        <div className="p-3">
            {items.map(item => (
                <ColorBannerLinkWideItem 
                    key={item.title}
                    {...item}
                    wrapperClassName="mb-4"
                />
            ))}
        </div>
    )
}

export default ColorBannerLinkWides;