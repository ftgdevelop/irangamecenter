import BannerLinkWideItem from "./BannerLinkWideItem";

const BannerLinkWides = () => {
    const items : {
        imageUrl?: string;
        title: string;
        subtitle?: string;
        url: string;
    }[] =[
        {
            title:"اف سی 25",
            imageUrl:"/mock-images/banner-1.jpg",
            subtitle:"پلی استیشن 4 و 5",
            url:"#"
        },
        {
            title:"کلش رویال",
            imageUrl:"/mock-images/banner-2.jpg",
            subtitle:"خرید جم",
            url:"#"
        },
        {
            title:"فری فایر",
            imageUrl:"/mock-images/banner-3.jpg",
            subtitle:"خرید جم",
            url:"#"
        },
        {
            title:"نینتندو",
            subtitle:"گیفت کارت",
            url:"#"
        }
    ];

    return (
        <div className="p-3">
            {items.map(item => (
                <BannerLinkWideItem 
                    {...item}
                    wrapperClassName="mb-4"
                />
            ))}
        </div>
    )
}

export default BannerLinkWides;