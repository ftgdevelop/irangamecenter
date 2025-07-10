/* eslint-disable  @typescript-eslint/no-explicit-any */

import { NextPage } from "next";
import { useEffect } from "react";
import { getProductBySlug } from "@/actions/commerce";


const DetailBlog: NextPage<any> = ({ slug}:
    {slug: string} ) => {

  useEffect(()=>{
    const fetchData = async () => {
      const response : any = await getProductBySlug(slug);
      console.log(response.data?.result)
    }
    
    fetchData();

  },[]);
    
    return (
        <>
        {slug}           
        </>
    )
}

export async function getServerSideProps(context: any) {
    return (
        {
            props: {
                slug: context.query.slug || null
            }
        }
    )
}


export default DetailBlog;