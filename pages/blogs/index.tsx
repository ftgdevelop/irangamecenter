/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getBlogs } from "@/actions/blog";
import { NextPage } from "next";
import { BlogItemType } from "@/types/blog";
import Contacts from "@/components/shared/Contacts";
import Breadcrumb from "@/components/shared/Breadcrumb";
import BlogListItem from "@/components/blog/BlogListItem";
import { useEffect, useRef, useState } from "react";
import Skeleton from "@/components/shared/Skeleton";
import Add from "@/components/icons/Add";

type Props = {
    posts?: BlogItemType[];
    totalPages: number;
}
const Blogs: NextPage<Props> = props => {

    const [posts, setPosts] = useState<BlogItemType[]>(props.posts || []);
    const [fetchMode, setFetchMode] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);


    const loadMoreWrapper = useRef<HTMLButtonElement>(null);

    const removeListener = () => {
        document.removeEventListener('scroll', checkIsInView);
        window.removeEventListener("resize", checkIsInView);
    }

    useEffect(() => {
        if (fetchMode) {
            if(posts.length < 20){
                addItems();
            }else{
               removeListener(); 
            }
        }
    }, [fetchMode, posts.length]);

    const addItems = async () => {

        const page = Math.ceil(posts.length / 10) + 1;

        if (page > props.totalPages) {
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
            <Breadcrumb
                wrapperClassName="mb-4 lg:mb-0"
                items={[{ label: "وبلاگ", link: "" }]}
            />

            <h3 className="py-10 hidden lg:block text-3xl font-bold border-b border-neutral-300 dark:border-white/15 text-center text-white"> وبلاگ </h3>

            <div className="px-4 lg:grid lg:grid-cols-3 lg:gap-3 lg:py-10 max-w-[1200px] mx-auto">
                {posts?.map(post => (
                    <BlogListItem
                        key={post.id}
                        data={post}
                        wrapperClassName="mb-4"
                    />
                ))}

                {!!loading && [1, 2, 3, 4, 5].map(item => (
                    <div className="flex gap-3 mb-4" key={item}>
                        <Skeleton
                            type="image"
                            className="w-18 h-18 aspect-square rounded-2xl"
                        />
                        <div className="grow">
                            <Skeleton className="h-4 w-full mt-5 mb-4" />
                            <Skeleton className="w-1/2" />
                        </div>
                    </div>
                ))}
                
                <div className="lg:col-span-3">
                    <button
                        ref={loadMoreWrapper}
                        type="button"
                        className="text-sm text-white dark:text-[#ca54ff] bg-[#ca54ff] dark:bg-[#161b39] w-full lg:max-w-[380px] mx-auto px-5 py-3 flex rounded-full justify-center gap-3"
                        onClick={addItems}
                    >
                        <Add />
                        مطالب بیشتر
                    </button>
                </div>

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