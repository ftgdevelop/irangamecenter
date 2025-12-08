/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getBlogs } from "@/actions/blog";
import { NextPage } from "next";
import { BlogItemType } from "@/types/blog";
import Contacts from "@/components/shared/Contacts";
import BreadCrumpt from "@/components/shared/BreadCrumpt";
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
            <BreadCrumpt
                wrapperClassName="bg-[#e8ecf0] dark:bg-[#192a39] px-4 py-3 mb-4"
                textColorClass="text-neutral-800 dark:text-neutral-300"
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

                <button
                    ref={loadMoreWrapper}
                    type="button"
                    className="text-sm text-white dark:text-[#ca54ff] bg-[#ca54ff] dark:bg-[#161b39] w-full px-5 py-3 flex rounded-full justify-center gap-3"
                    onClick={addItems}
                >
                    <Add />
                    مطالب بیشتر
                </button>

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