/* eslint-disable  @typescript-eslint/no-explicit-any */

import { GetAllTags } from "@/actions/blog";

function creareSiteMap(tagsData:any){
  
  let postsXML = "";
  
  if(tagsData){
    for (let i = 0; i < tagsData.length; i++) {
      const tag = tagsData[i];

      const postUrl = `${process.env.SITE_NAME}/tag/${tag.slug}/`;
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
    const tagsResponse = await  GetAllTags();

    sitemap = creareSiteMap(tagsResponse?.data );
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