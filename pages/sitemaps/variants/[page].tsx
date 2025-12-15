/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getAllVariants } from "@/actions/commerce";

function creareSiteMap(variantData:any){

  let postsXML = "";
  
  if(variantData){

    for (let i = 0; i < variantData.length; i++) {
      const variant = variantData[i];

      const variantUrl = `${process.env.SITE_NAME}/variant/${variant.id}`;
      
      postsXML += `
        <url>
          <loc>${variantUrl}</loc>
          <priority>0.7</priority>
        </url>`;
    }
  }

  if (!postsXML) {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    </urlset>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${postsXML}
    </urlset>`;
}

function SiteMap() {
}

export const getServerSideProps = async ({ res, query }:{res:any, query:any}) => {

  const pageQuery = query.page?.split("variantsSitemap-")?.[1]?.split(".")?.[0] || 1;

  let sitemap :any;

  if(process.env.PROJECT_SERVER_ECOMMERCE){
    
    const response: any = await getAllVariants({
      MaxResultCount:100,
      SkipCount: (+pageQuery-1) * 100 
    });

    sitemap = creareSiteMap(response?.data?.result?.items || [] );
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