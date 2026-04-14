export interface BlogDetailType {
  page: {
    metas?: {
      [name:string]: string;
    };
    title?: string;
    richSnippet?: string;
  };
  content?: string;
  creationTime?: string;
  lastModificationTime?: string;
  slug?: string;
  status?: string;
  title?: string;
  excerpt?:string;
  readTime?: number;
  author?: {
    name?: string;
    slug?: string;
    description?: string;
    avatars?: {
      size24?: string;
      size48?: string;
      size96?: string;
    };
    avatar?: string;
    id: number;
  },
  postMainMediaUrl?: string;
  categories?: {
      name?: string;
      slug?: string;
      id: number;
      //parent?: any;
    }[];  
  tags?: {
      id: number;
      count: number;
      description?: string;
      link?: string;
      name?: string;
      slug?: string;
      taxonomy?: string;
    }[];
  id: number;

}

export interface BlogListItemType {
    creationTime:string;
    lastModificationTime?:string;
    slug?:string;
    status?:string;
    title?:string;
    excerpt?:string;
    readTime?: number;
    author: {
        name?: string;
        slug?: string;
        description?: string;
        avatar?: string;
        // "avatars": {
        //     "size24": "https://secure.gravatar.com/avatar/f4a33df6c2cec457945831e2a30bb0a5b3c8510461d8cbd33a0b6dbdb7f8c4c7?s=24&d=mm&r=g",
        //     "size48": "https://secure.gravatar.com/avatar/f4a33df6c2cec457945831e2a30bb0a5b3c8510461d8cbd33a0b6dbdb7f8c4c7?s=48&d=mm&r=g",
        //     "size96": "https://secure.gravatar.com/avatar/f4a33df6c2cec457945831e2a30bb0a5b3c8510461d8cbd33a0b6dbdb7f8c4c7?s=96&d=mm&r=g"
        // },
        id: number;
    },
    postMainMediaUrl?: string;
    categories?: {
        name?:string;
        slug?:string;
        id:number;
        //"parent": null,
    }[]    
    tags?: {
            id:number;
            count:number;
            description?: string;
            link?: string;
            name?: string;
            slug?: string;
            taxonomy?: string;
        }[];
    id: number;
}