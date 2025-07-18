/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getBlogs } from "@/actions/blog";
import { NextPage } from "next";
import { BlogItemType } from "@/types/blog";
import Contacts from "@/components/shared/Contacts";
import BreadCrumpt from "@/components/shared/BreadCrumpt";
import BlogListItem from "@/components/blog/BlogListItem";
import { useEffect, useRef, useState } from "react";
import Skeleton from "@/components/shared/Skeleton";
import CaretRight from "@/components/icons/CaretRight";
import Link from "next/link";
import CaretLeft from "@/components/icons/CaretLeft";

type Props = {
    posts?: BlogItemType[];
    totalPages: number;
}
const Blogs: NextPage<Props> = props => {

    const [posts, setPosts] = useState<BlogItemType[]>(props.posts || []);
    const [fetchMode, setFetchMode] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);


    const loadMoreWrapper = useRef<HTMLDivElement>(null);

    const removeListener = () => {
        document.removeEventListener('scroll', checkIsInView);
        window.removeEventListener("resize", checkIsInView);
    }

    useEffect(() => {
        if (fetchMode) {
            addItems();
        }
    }, [fetchMode, posts.length]);

    const addItems = async () => {

        const page = Math.ceil(posts.length / 10) + 1;

        if (page > 5 || page > props.totalPages) {
            removeListener();
            return;
        }
        setLoading(true);
        const blogs: any = await getBlogs({
            per_page: 10,
            page: page
        });
        if (blogs?.data) {
            setPosts(prevPosts => [...prevPosts, ...blogs?.data]);
            console.log(blogs?.data);
        } else {
            removeListener();
        }
        setLoading(false);
        setFetchMode(false);
    }

    const checkIsInView = () => {
        const targetTop = loadMoreWrapper.current?.getBoundingClientRect().top;
        const screenHeight = screen.height;
        if (targetTop && targetTop < (3 * screenHeight / 5) && !fetchMode) {
            setFetchMode(true);
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', checkIsInView);
        window.addEventListener("resize", checkIsInView);

        return (() => {
            document.removeEventListener('scroll', checkIsInView);
            window.removeEventListener("resize", checkIsInView);
        });
    }, []);


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

                {!!loading && [1, 2, 3, 4, 5].map(item => (
                    <div className="grid grid grid-cols-4 gap-3 mb-4" key={item}>
                        <Skeleton
                            type="image"
                            className="aspect-square rounded-large"
                        />
                        <div className="col-span-3">
                            <Skeleton className="h-4 w-full mt-5 mb-4" />
                            <Skeleton className="w-1/2" />
                        </div>
                    </div>
                ))}

                {props.totalPages > 5 && posts.length === 50 && <div className="flex justify-between items-center bg-[#1a1e3b] rounded-full p-2">
                    <span className="w-10 h-10 flex justify-center items-center rounded-full text-white/25" >
                        <CaretRight className="w-4 h-4 fill-current" />
                    </span>

                    <div className="bg-[#011425] rounded-full px-5 py-2 text-sm font-semibold">
                        <span className="text-[#d35cfe]"> 1 </span>
                        از
                        <span> {props.totalPages - 5} </span>
                    </div>
                    <Link
                        href="/blogs/page/2"
                        className={`w-10 h-10 flex justify-center items-center rounded-full bg-[#011425] active:from-[#a93aff] active:bg-gradient-to-t active:to-[#fe80ff]`}
                    >
                        <CaretLeft className="w-4 h-4 fill-current" />
                    </Link>
                </div>}

                <div ref={loadMoreWrapper} className="h-4" />
            </div>

            <Contacts />

        </>
    )
}

export async function getServerSideProps() {

    if (!process.env.PROJECT_SERVER_BLOG) {
        return (
            {
                props: {
                    moduleDisabled: true
                },
            }
        )
    }

    const blogs: any = await getBlogs({
        per_page: 10,
        page: 1
    })

    return (
        {
            props: {
                posts: blogs?.data || null,
                totalPages: +blogs?.headers?.['x-wp-totalpages'] || null
            }
        }
    )
}


export default Blogs;