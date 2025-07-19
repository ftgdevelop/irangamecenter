/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getBlogs } from "@/actions/blog";
import { NextPage } from "next";
import { BlogItemType } from "@/types/blog";
import Contacts from "@/components/shared/Contacts";
import BreadCrumpt from "@/components/shared/BreadCrumpt";
import BlogListItem from "@/components/blog/BlogListItem";
import { useRouter } from "next/router";
import Link from "next/link";
import CaretRight from "@/components/icons/CaretRight";
import CaretLeft from "@/components/icons/CaretLeft";

const Blogs: NextPage<any> = ({ page, posts, totalPages }: { page?: number, posts?: BlogItemType[], totalPages: number }) => {

    const router = useRouter();
    
    if(!page || page === 1 || (totalPages && totalPages < page+5)){
        router.push("/blogs");
    }

    if (totalPages)

        return (
            <>
                <BreadCrumpt
                    wrapperClassName="bg-[#192a39] px-4 py-3 mb-4"
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

                    {totalPages > 6 && (
                        <div className="flex justify-between items-center bg-[#1a1e3b] rounded-full p-2">

                            {page && page > 1 ? (
                                <Link
                                    href={page > 2 ? `/blogs/page/${page - 1}` : "/blogs"}
                                    className={`w-10 h-10 flex justify-center items-center rounded-full bg-[#011425] active:from-[#a93aff] active:bg-gradient-to-t active:to-[#fe80ff]`}
                                >
                                    <CaretRight className="w-4 h-4 fill-current" />
                                </Link>
                            ) : (
                                <span className="w-10 h-10 flex justify-center items-center rounded-full text-white/25" >
                                    <CaretRight className="w-4 h-4 fill-current" />
                                </span>
                            )}

                            <div className="bg-[#011425] rounded-full px-5 py-2 text-sm font-semibold">
                                <span className="text-[#d35cfe]"> {page} </span>
                                از
                                <span> {totalPages - 5} </span>
                            </div>

                            {page && page < (+totalPages - 5) ? (
                                <Link
                                    href={`/blogs/page/${page + 1}`}
                                    className={`w-10 h-10 flex justify-center items-center rounded-full bg-[#011425] active:from-[#a93aff] active:bg-gradient-to-t active:to-[#fe80ff]`}
                                >
                                    <CaretLeft className="w-4 h-4 fill-current" />
                                </Link>
                            ) : (
                                <span className="w-10 h-10 flex justify-center items-center rounded-full text-white/25" >
                                    <CaretLeft className="w-4 h-4 fill-current" />
                                </span>
                            )}
                        </div>
                    )}
                </div >

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
        page: page + 5
    })

    let blogsFirstPageItems: any;
    if (!blogs?.data) {
        blogsFirstPageItems = await getBlogs({
            per_page: 10,
            page: page
        });
    }

    return (
        {
            props: {
                posts: blogs?.data || null,
                totalPages: +blogs?.headers?.['x-wp-totalpages'] || +blogsFirstPageItems?.headers?.['x-wp-totalpages'] || null,
                page: +page,

            }
        }
    )
}


export default Blogs;