/* eslint-disable  @typescript-eslint/no-explicit-any */

import { GetCategories } from "@/actions/blog";

function creareSiteMap(categoriesData:any){

  let postsXML = "";
  
  if(categoriesData){
    for (let i = 0; i < categoriesData.length; i++) {
      const category = categoriesData[i];

      const postUrl = `${process.env.SITE_NAME}/category/${category.slug}/`;
      postsXML += `
        <url>
          <loc>${postUrl}</loc>
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

export const getServerSideProps = async ({ res }:{res:any}) => {

  let sitemap :any;

  if(process.env.PROJECT_SERVER_BLOG){
    const categoriesResponse = await GetCategories();

    sitemap = creareSiteMap(categoriesResponse?.data );
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