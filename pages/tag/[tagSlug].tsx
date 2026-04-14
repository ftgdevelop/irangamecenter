/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getBlogsList, GetTagBySlug } from "@/actions/blog";
import { NextPage } from "next";
import { BlogListItemType } from "@/types/blog";
import Breadcrumb from "@/components/shared/Breadcrumb";
import BlogListItem from "@/components/blog/BlogListItem";
import Pagination from "@/components/shared/Pagination";
import { useRouter } from "next/router";

type Props = {
    posts?:BlogListItemType[];
    total: number;
    tagName?: string;
    tagSlug?: string;
    page: number;
}

const Tag: NextPage<Props> = props => {

    const router = useRouter();
    const routerQuery: any = useRouter().query;

    const {page, posts, tagName, total} = props;

    return (
        <>
            <Breadcrumb
                wrapperClassName="mb-4"
                items={[
                    { label: tagName || "برچسب نامشخص", link: "" }
                ]}
            />

            <div className="px-4 lg:grid lg:grid-cols-3 lg:gap-3 lg:py-10 max-w-[1200px] mx-auto">
                {posts?.map(post => (
                    <BlogListItem
                        key={post.id}
                        data={post}
                        wrapperClassName="mb-4"
                    />
                ))}
                <div className="lg:col-span-3">

                    {total > 10 && <Pagination
                        totalItems={total * 10}
                        currentPage={page ? +page : 1}
                        onChange={p => { router.push({ query: { ...routerQuery, page: p } }) }}
                        wrapperClassName="lg:max-w-[380px] mx-auto"

                    />}
                </div>

            </div>

        </>
    )
}

export async function getServerSideProps(context: any) {

    if (!process.env.PROJECT_SERVER_BLOG) {
        return (
            {
                props: {
                    moduleDisabled: true
                },
            }
        )
    }


        const tagSlug = context.query.tagSlug;
        const page = context.query?.page || 1;
    
        const [blogs, tag] = await Promise.all<any>([
            getBlogsList({
                MaxResultCount:10,
                SkipCount:(page -1) * 10,
                Tags:[tagSlug]
            }),
            GetTagBySlug(tagSlug)
        ]);
    
        const tagName = tag?.data?.result?.name;



    return (
        {
            props: {
                posts: blogs?.data?.result?.items || null,
                total: blogs?.data?.result?.totalCount || null,
                tagName: tagName || null,
                tagSlug: tagSlug || null,
                page: page
            }
        }
    )
}


export default Tag;