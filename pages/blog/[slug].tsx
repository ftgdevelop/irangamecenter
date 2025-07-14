/* eslint-disable  @typescript-eslint/no-explicit-any */

import { GetBlogPostDetails, GetCategories, GetTagName, GetUsers, getBlogs } from "@/actions/blog";
import { NextPage } from "next";
import { BlogItemType, CategoriesObjectType } from "@/types/blog";
import Head from "next/head";
import Image from "next/image";
import { dateDiplayFormat, toPersianDigits } from "@/helpers";
import parse from 'html-react-parser';
import Link from "next/link";
import BlogsCarousel from "@/components/blog/BlogsCarousel";
import Contacts from "@/components/shared/Contacts";
import { useEffect, useState } from "react";
import UserCircle from "@/components/icons/UserCircle";
import BreadCrumpt from "@/components/shared/BreadCrumpt";


const DetailBlog: NextPage<any> = ({ post, allCategories, moduleDisabled, tags , relatedPosts}:
    {post: BlogItemType, allCategories: CategoriesObjectType[], moduleDisabled?: boolean, tags?:{label:string, id:number, slug: string}[] , relatedPosts?: BlogItemType[]} ) => {

    const [users, setUsers] = useState<{ id:number, name: string}[] | undefined>();

    useEffect(()=>{
        const fetchUsers = async () => {
            const response: any = await GetUsers();
            setUsers(response.data);
            
        }
        fetchUsers();
    },[]);

    const authorName = users?.find(user => user.id === post?.author)?.name;

    if (moduleDisabled) {
        return (
            <div> NotFound ----------</div>
            // <NotFound />
        )
    }

    //data={post.title?.rendered} page="بلاگ" category={[post.categories_names[0], post?.categories[0]]} />

    const PostTitle : string = post?.title?.rendered || ""

    const {content, date, acf} = post;

    const categories = post.categories.map(item => {
        const catObject = allCategories.find(c => c.id === item);
        return catObject;
    });
    
    return (
        <>
            <Head>
                <title>{PostTitle}</title>
            </Head>

            <BreadCrumpt 
                items={[
                    {label:"وبلاگ", link:"/blogs"},
                    {label: post.title.rendered || "", link:""}
                ]}
                wrapperClassName="bg-[#192a39] px-4 py-3"
                textColorClass="text-neutral-300"                
            />
            

            <div className="px-5 mb-4">
                {!!post?.jetpack_featured_media_url && <Image
                    src={post.jetpack_featured_media_url}
                    alt={post.title.rendered}
                    width={750}
                    height={750}
                    className="w-full h-auto block object-cover mb-3"
                />}
                
                <h2 className="font-bold text-xl mb-3">{post.title?.rendered}</h2>
                
                <div className="flex gap-3 flex-wrap">

                    {!!date && <div className="block border border-white/15 p-4 rounded-xl text-xs">
                        انتشار
                        <b className="block font-semibold mt-2 text-sm">
                            {toPersianDigits(dateDiplayFormat({
                                date: date,
                                format:"timeAgo",
                                locale:"fa"
                            }))}
                        </b>
                    </div>}

                    {!!categories.length && (
                        <Link
                            className="block border border-white/15 p-4 rounded-xl text-xs"
                            href={`/category/${categories[0]?.slug}`}
                        >
                            دسته بندی
                            <b className="block font-semibold mt-2 text-sm">
                                {categories[0]?.name}
                            </b>
                        </Link>
                    )}

                    {!!acf?.time_read && <div className="block border border-white/15 p-4 rounded-xl text-xs">
                        مدت مطالعه
                        <b className="block font-semibold mt-2 text-sm">
                            {acf.time_read}
                        </b>
                    </div>}

                </div>

                 {!!content?.rendered && (
                    <div className="inserted-content">
                        {parse(content.rendered)}
                    </div>
                )}

                {!!authorName && (
                    <div className="flex items-center gap-1 my-8">
                        <UserCircle className="w-6 h-6 fill-current" />
                        <span className="text-sm">
                            نویسنده مقاله: {authorName}
                        </span>
                    </div>
                )}

                {!!tags?.length && (
                    <>
                    <h4 className="text-lg font-semibold mb-4 mt-8 text-[#ffefb2]"> تگ های مرتبط </h4>
                    <div className="flex gap-2 flex-wrap">
                        {tags.map(tag => (
                            <Link
                                key={tag.id}
                                href={`/tag/${tag.slug}`}
                                className="bg-[#161b3b] text-[#a93aff] font-semibold p-4 text-xs rounded-xl block"
                            >
                                #{tag.label}
                            </Link>
                        ))}
                    </div>
                    
                    </>
                )}

            </div>
            {!!relatedPosts && <BlogsCarousel 
                blogs={relatedPosts}
                title="مطالب مشابه"
            />}

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

    const [BlogPost, Categories] = await Promise.all<any>([
        GetBlogPostDetails(context.query.slug),
        GetCategories()
    ]) ;

    const tags : {
        label: string;
        id: number;
        slug: string;
    }[] = [];

    const tagsIds = BlogPost?.data?.[0]?.tags;

    const relatedPosts = [];

    if(tagsIds?.length){
        for(let i=0 ; i < tagsIds.length ; i++){
            const response: any = await GetTagName(tagsIds[i]);
            if(response.data){
                tags.push({
                    id:response.data.id,
                    label: response.data.name,
                    slug: response.data.slug
                })
            }
        }
    }

    const categories = BlogPost?.data?.[0]?.categories;
    if(categories?.length){
        for(let i=0 ; i < categories.length ; i++){
            const response: any = await getBlogs({category:categories[i]});
            if(response.data){
                relatedPosts.push(...response.data)
            }
        } 
    }

    return (
        {
            props: {
                post: BlogPost?.data?.[0] || null,
                allCategories: Categories?.data || null,
                tags : tags || null,
                relatedPosts : relatedPosts.filter(post => post.id !== BlogPost?.data?.[0]?.id) || null
            }
        }
    )
}


export default DetailBlog;