/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getBlogsList, GetCategoryBySlug } from "@/actions/blog";
import { NextPage } from "next";
import { BlogListItemType } from "@/types/blog";
import Breadcrumb from "@/components/shared/Breadcrumb";
import BlogListItem from "@/components/blog/BlogListItem";
import Pagination from "@/components/shared/Pagination";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
    data?:BlogListItemType[];
    total?: number;
    categoryName?: string;
    categorySlug?: string;
    page: number;
}

const Category: NextPage<Props> = props => {

    const router = useRouter();
    const routerQuery: any = useRouter().query;

    const [total, setTotal]= useState<number>(props.total || 0 );
    const [data, setData] = useState<BlogListItemType[] | undefined>(props.data);

    useEffect(()=>{
        
        const fetchData = async (categorySlug:string) => {
            const response : any = await getBlogsList({
                MaxResultCount:10,
                SkipCount:(props.page -1) * 10,
                Categories:[categorySlug]
            });

            if(response.data?.result){
                setData(response.data.result.items);
                setTotal(response.data.result.totalCount)
            }            
        }
        if(props.categorySlug){
            fetchData(props.categorySlug);
        }
    },[props.categorySlug, props.page]);

    return (
        <>
            <Breadcrumb
                wrapperClassName="mb-4"
                items={[
                    //{ label: "وبلاگ", link: "/blogs" },
                    {label:props.categoryName ||"دسته بندی نامشخص", link:""}
                ]}
            />

            <div className="px-4 lg:grid lg:grid-cols-3 lg:gap-3 lg:py-10 max-w-[1200px] mx-auto">
                {data?.map(post => (
                    <BlogListItem
                        key={post.id}
                        data={post}
                        wrapperClassName="mb-4"
                    />
                ))}
                <div className="lg:col-span-3">                    
                    {total > 10 && <Pagination
                        totalItems={total}
                        currentPage={props.page}
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

    const categorySlug = context.query.categorySlug;
    const page = context.query?.page || 1;

    const [blogs, category] = await Promise.all<any>([
        getBlogsList({
            MaxResultCount:10,
            SkipCount:(page -1) * 10,
            Categories:[categorySlug]
        }),
        GetCategoryBySlug(categorySlug)
    ]);

    const categoryName = category?.data?.result?.name;

    return (
        {
            props: {
                posts: blogs?.data?.result?.items || null,
                totalPages: blogs?.data?.result?.totalCount || null,
                categoryName: categoryName || null,
                categorySlug: categorySlug || null,
                page: page
            }
        }
    )
}


export default Category;