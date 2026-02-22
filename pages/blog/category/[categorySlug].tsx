/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getBlogs, GetCategories } from "@/actions/blog";
import { NextPage } from "next";
import { BlogItemType } from "@/types/blog";
import Contacts from "@/components/shared/Contacts";
import Breadcrumb from "@/components/shared/Breadcrumb";
import BlogListItem from "@/components/blog/BlogListItem";
import Pagination from "@/components/shared/Pagination";
import { useRouter } from "next/router";

const Category: NextPage<any> = ({ page, posts, totalPages, categoryName }: { page?: string, posts?: BlogItemType[], totalPages: number, categoryName?: string }) => {

    const router = useRouter();
    const routerQuery: any = useRouter().query;

    return (
        <>
            <Breadcrumb
                wrapperClassName="mb-4"
                items={[
                    // { label: "وبلاگ", link: "/blogs" },
                    {label:categoryName ||"دسته بندی نامشخص", link:""}
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
                    {totalPages > 1 && <Pagination
                        totalItems={totalPages * 10}
                        currentPage={page ? +page : 1}
                        onChange={p => { router.push({ query: { ...routerQuery, page: p } }) }}
                        wrapperClassName="lg:max-w-[380px] mx-auto"
                    />}
                </div>
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

    const categoriesResponse: any = await GetCategories();

    const categorySlug = context.query.categorySlug;
    const categoryId = categoriesResponse?.data?.find((c:any) => c.slug === categorySlug )?.id;

    const [blogs, categories] = await Promise.all<any>([
        getBlogs({
            per_page: 10,
            page: page,
            category: categoryId
        }),
        GetCategories()
    ]);

    const categoryName = categories?.data?.find((c:any) => +c.id === +categoryId)?.name;

    return (
        {
            props: {
                posts: blogs?.data || null,
                totalPages: +blogs?.headers?.['x-wp-totalpages'] || null,
                page: page,
                categoryName: categoryName || null
            }
        }
    )
}


export default Category;