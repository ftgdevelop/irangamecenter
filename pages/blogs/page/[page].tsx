/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getBlogsList } from "@/actions/blog";
import { NextPage } from "next";
import { BlogListItemType } from "@/types/blog";
import Breadcrumb from "@/components/shared/Breadcrumb";
import BlogListItem from "@/components/blog/BlogListItem";
import { useRouter } from "next/router";
import Link from "next/link";
import CaretRight from "@/components/icons/CaretRight";
import CaretLeft from "@/components/icons/CaretLeft";

type Props = {
    total: number;
    page?: number;
    posts?: BlogListItemType[];

}

//TODO %%%%%%%%%%%%%   check this page. TODO

const Blogs: NextPage<Props> = props => {

    const {page, total, posts} = props;

    const router = useRouter();
    
    if(!page || page === 1 || (total && total < page+5)){
        router.push("/blogs");
    }

    if (total)

        return (
            <>
                <Breadcrumb
                    wrapperClassName="mb-4"
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

                    {total > 6 && (
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
                                <span> {total - 5} </span>
                            </div>

                            {page && page < (+total - 5) ? (
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

    const blogs: any = await  getBlogsList({
        MaxResultCount:10,
        SkipCount: (page+4)*10
    })

    return (
        {
            props: {
                total: blogs?.data?.result?.totalCount || 0,
                posts: blogs?.data?.result?.items || null,
                page: +page,

            }
        }
    )
}


export default Blogs;