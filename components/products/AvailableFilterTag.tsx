import { useRouter } from "next/router";
import CloseSimple from "../icons/CloseSimple";
import { useEffect, useState } from "react";
import Loading from "../icons/Loading";

const AvailableFilterTag = () => {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const slugs: string[] = (router?.query?.slugs as string[]) || [];

    useEffect(() => {
        setLoading(false);
    }, [router.asPath]);

    const activeFilterColor = "bg-gradient-to-t from-[#fe4c69] to-[#ff9a90]"

    return (
        <button
            type="button"
            className={`inline-flex gap-2 items-center justify-between rounded-full px-5 py-2.5 text-2xs select-none ${slugs?.find(x => x.includes("onlyAvailable")) ? activeFilterColor : "bg-[#192a39]"}`}
            onClick={() => {
                setLoading(true);
                const otherSlugs = slugs?.filter(item => !(item.includes("onlyAvailable")));
                const segments = ["/products", ...(otherSlugs || [])];

                if (!(slugs?.find(x => x.includes("onlyAvailable")))) {
                    segments.push("onlyAvailable")
                }

                const newUrl = segments.join("/");
                router.push({
                    pathname: newUrl,
                });

            }}
        >
            فقط محصولات موجود

            {loading ? (
                <Loading className="w-6 h-6 fill-current animate-spin" />
            ) : (
                <CloseSimple className="w-6 h-6 fill-current" />
            )}
        </button>
    )
}

export default AvailableFilterTag;