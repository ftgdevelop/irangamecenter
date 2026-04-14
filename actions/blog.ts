/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Blog, ServerAddress } from '@/enum/url';
import axios from 'axios';

export const getBlogsList = async (options: 
  {
    MaxResultCount:number;
    SkipCount: number; 
    Tags?: string[]; 
    Categories?: string[]; 
    Search?: string 
  }
) => {

  const url = `${ServerAddress.Type}${ServerAddress.Blog}${Blog.getPosts}`;

  const queries = [`MaxResultCount=${options.MaxResultCount}`,`SkipCount=${options.SkipCount}`];

  if (options.Categories?.length) {
    for (const category of options.Categories) 
    queries.push(`Categories=${category}`);
  } 
  
  if (options.Tags?.length) {
    for (const tag of options.Tags) 
    queries.push(`Tags=${tag}`);
  }

  if (options.Search) {
    queries.push(`Search=${options.Search}`)  
  }


  let q: string = '';
  if (queries.length) {
    q = queries.join("&");
    q = "?" + q;
  }

    try {
      const response = await axios.get(
          url+q
        )
        return response
    } catch (error) {
        return error
    }

}

export const GetBlogDetail = async (slug : string) => {
    try {
      const res = await axios.get(`${ServerAddress.Type}${ServerAddress.Blog}${Blog.getPost}?slug=${slug}`);
      return res;
    } catch (error : any) {
      console.log("error", error);
      return error.response
    }
};

export const GetCategoryBySlug = async (slug : string) => {
    try {
      const res = await axios.get(`${ServerAddress.Type}${ServerAddress.Blog}${Blog.getCategory}?Slug=${slug}`);
      return res;
    } catch (error : any) {
      console.log("error", error);
      return error.response
    }
};

export const GetTagBySlug = async (slug : string) => {
    try {
      const res = await axios.get(`${ServerAddress.Type}${ServerAddress.Blog}${Blog.getTag}?Slug=${slug}`);
      return res;
    } catch (error : any) {
      console.log("error", error);
      return error.response
    }
};

export const GetSimilarPosts = async (slug : string) => {
    try {
      const res = await axios.get(`${ServerAddress.Type}${ServerAddress.Blog}${Blog.getSimilarPosts}?Slug=${slug}`);
      return res;
    } catch (error : any) {
      console.log("error", error);
      return error.response
    }
};

