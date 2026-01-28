import { useRouter } from "next/router";
import CloseSimple from "../icons/CloseSimple";
import { useEffect, useState } from "react";
import Loading from "../icons/Loading";

type Props = {
    brandName?: string;
    categoryName?: string;
}
const BackOrderFilterTag: React.FC<Props> = props => {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const slugs: string[] = (router?.query?.slugs as string[]) || [];

    useEffect(() => {
        setLoading(false);
    }, [router.asPath]);

    const activeFilterColor = "text-white bg-gradient-orange"

    const isActive = slugs?.find(x => x.includes("onBackOrder"));
    
    return (
        <button
            type="button"
            className={`inline-flex gap-2 items-center justify-between rounded-full px-5 h-10 text-2xs select-none ${isActive ? activeFilterColor : "bg-[#e8ecf0] dark:bg-[#192a39]"}`}
            onClick={() => {
                setLoading(true);
                const otherSlugs = slugs?.filter(item => !(item.includes("onBackOrder")));
                const segments = [props.brandName ? `/brand/${props.brandName}` : props.categoryName? `/category/${props.categoryName}` : "/products", ...(otherSlugs || [])];

                if (!(slugs?.find(x => x.includes("onBackOrder")))) {
                    segments.push("onBackOrder")
                }

                const newUrl = segments.join("/");
                router.push({
                    pathname: newUrl,
                });

            }}
        >
            پیش فروش

            {loading ? (
                <Loading className="w-6 h-6 fill-current animate-spin" />
            ) : isActive ? (
                <CloseSimple className="w-6 h-6 fill-current" />
            ) : null}
        </button>
    )
}

export default BackOrderFilterTag;