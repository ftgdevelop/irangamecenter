import { useRouter } from "next/router";
import CloseSimple from "../icons/CloseSimple";
import { useEffect, useState } from "react";
import Loading from "../icons/Loading";

type Props = {
    branName?: string;
}
const BackOrderFilterTag: React.FC<Props> = props => {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const slugs: string[] = (router?.query?.slugs as string[]) || [];

    useEffect(() => {
        setLoading(false);
    }, [router.asPath]);

    const activeFilterColor = "bg-gradient-to-t from-[#fe4c69] to-[#ff9a90]"

    const isActive = slugs?.find(x => x.includes("onBackOrder"));
    return (
        <button
            type="button"
            className={`inline-flex gap-2 items-center justify-between rounded-full px-5 py-2.5 text-2xs select-none ${isActive ? activeFilterColor : "bg-[#192a39]"}`}
            onClick={() => {
                setLoading(true);
                const otherSlugs = slugs?.filter(item => !(item.includes("onBackOrder")));
                const segments = [props.branName ? `/brand/${props.branName}` :"/products", ...(otherSlugs || [])];

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