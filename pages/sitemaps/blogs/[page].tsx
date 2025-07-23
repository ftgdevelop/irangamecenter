/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getBlogs } from "@/actions/blog";

function creareSiteMap(postsData:any){
  let latestPost = 0;
  let postsXML = "";
  
  if(postsData){
    for (let i = 0; i < postsData.length; i++) {
      const post = postsData[i];

      const postDate = Date.parse(post.modified);
      if (!latestPost || postDate > latestPost) {
        latestPost = postDate;
      }

      const postUrl = `${process.env.SITE_NAME}/blog/${post.slug}/`;
      postsXML += `
        <url>
          <loc>${postUrl}</loc>
          <lastmod>${post.modified.substring(0, 10)}</lastmod>
          <changefreq>Daily</changefreq>
          <priority>0.7</priority>
        </url>`;
    }
  }

  if (!postsXML) {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    </sitemapindex>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${postsXML}
    </sitemapindex>`;
}

function SiteMap() {
}

export const getServerSideProps = async ({ res, query }:{res:any, query:any}) => {

  const pageQuery = query.page?.split("blogSitemap-")?.[1]?.split(".")?.[0] || 1;

  let sitemap :any;

  if(process.env.PROJECT_SERVER_BLOG){
    
    const postsResponse: any = await getBlogs({
      per_page:100,
      page:+pageQuery
    });

    sitemap = creareSiteMap(postsResponse?.data );
  }else{
    sitemap = creareSiteMap(undefined);
  }

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {
    }
  }

}

export default SiteMap;