/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getBlogs } from "@/actions/blog";
import { NextPage } from "next";
import { BlogItemType } from "@/types/blog";
import Contacts from "@/components/shared/Contacts";
import BreadCrumpt from "@/components/shared/BreadCrumpt";
import BlogListItem from "@/components/blog/BlogListItem";
import Pagination from "@/components/shared/Pagination";
import { useRouter } from "next/router";

const Blogs: NextPage<any> = ({ page, posts, totalPages }: { page?: string, posts?: BlogItemType[], totalPages: number }) => {

    const router = useRouter();
    const routerQuery: any = useRouter().query;

    return (
        <>
            <BreadCrumpt
                wrapperClassName="bg-[#192a39] px-4 py-3"
                textColorClass="text-neutral-300"
                items={[{ label: "وبلاگ", link: "" }]}
            />

            <div className="px-4">
                {posts?.map(post => (
                    <BlogListItem
                        key={post.id}
                        data={post}
                        wrapperClassName="mb-4"
                    />
                ))}

               {totalPages > 1 && <Pagination
                    totalItems={totalPages * 10}
                    currentPage={page ? +page : 1}
                    onChange={p => { router.push({ query: { ...routerQuery, page: p } }) }}

                />}
            </div>

            <Contacts />

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

    const page = context.query?.page || 1;

    const blogs: any = await getBlogs({
        per_page: 10,
        page: page
    })

    return (
        {
            props: {
                posts: blogs?.data || null,
                totalPages: +blogs?.headers?.['x-wp-totalpages'] || null,
                page: page
            }
        }
    )
}


export default Blogs;