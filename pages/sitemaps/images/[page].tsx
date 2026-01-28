/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getAllForSiteMap } from "@/actions/commerce";

type ImageData = {
  slug?: string;
  galleries?: {
    filePath: string,
    id: number,
    fileTitleAttribute?: string;
    fileAltAttribute?: string;
  }[];
}[];

function createSiteMap(items:ImageData){

  let contents = "";

  if(items.length){
    for(let i = 0 ; i < items.length ; i++ ){

      const images = items[i]?.galleries;
     
      let imagesPart = "";
      if(images?.length){
        for(let j = 0 ; j < images.length ; j++ ){
          imagesPart += `
          <image:image>
            <image:loc>${images[j]?.filePath}</image:loc>
            <image:caption>${images[j]?.fileAltAttribute||""}</image:caption>
            <image:title>${images[j]?.fileTitleAttribute||""}</image:title>
          </image:image>
          `;
        }
      }

      contents += `
          <url>
            <loc>${process.env.SITE_NAME}/product/${items[i]?.slug}</loc>
            ${imagesPart}
          </url>    
      `;
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${contents}
    </urlset>`;
}

function SiteMap() {
}

export const getServerSideProps = async ({ res, query }:{res:any, query:any}) => {

  const pageQuery = query.page?.split("imageSitemap-")?.[1]?.split(".")?.[0] || 1;

  let sitemap :any;

  if(process.env.PROJECT_SERVER_ECOMMERCE){
    
    const response: any = await getAllForSiteMap({
      type:"Image",
      MaxResultCount:100,
      SkipCount: (+pageQuery-1) * 100
    });

    sitemap = createSiteMap(response?.data?.result?.items || []);
  }else{
    sitemap = createSiteMap([]);
  }

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {
    }
  }

}

export default SiteMap;