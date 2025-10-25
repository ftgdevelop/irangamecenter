/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getAllForSiteMap } from "@/actions/commerce";
import { dateDiplayFormat } from "@/helpers";

type VideosData = {
  slug?: string;
  name?: string;
  galleries?: {
    id: number,
    filePath: string,
    thumbnail: string,
    fileTitleAttribute?: string;
    fileAltAttribute?: string;
    creationTime?: string;
    duration?: number;
    category?: string;
    tags?: string;
  }[];
}[];

function creareSiteMap(items:VideosData){

  let contents = "";

  if(items.length){
    for(let i = 0 ; i < items.length ; i++ ){

      const videos = items[i]?.galleries;
      
      let videosPart = "";
      if(videos?.length){
        for(let j = 0 ; j < videos.length ; j++ ){
          const video = videos[j];

          const tags : string[] = video.tags?.split(",") || [];
          let tagsPart = "";
          
          if(tags.length){
            for (const tag of tags) {
              tagsPart += `
               <video:tag><![CDATA[${tag}]]></video:tag>
              `
            }
          }

          let timePart = "";
          if(video.creationTime){
            timePart = `
              <video:publication_date>${dateDiplayFormat({
                date: video.creationTime,
                format:"ISO",
                locale:"en"
              })}</video:publication_date>
            `
          }

          videosPart += `
            <video:video>
              <video:thumbnail_loc>${video.thumbnail}</video:thumbnail_loc>
              <video:content_loc>${video.filePath}</video:content_loc>
              <video:title><![CDATA[${video.fileTitleAttribute}]]></video:title>
              <video:description><![CDATA[${video.fileAltAttribute}]]></video:description>
              <video:duration>${video.duration}</video:duration>
              <video:category><![CDATA[${video.category}]]></video:category>
              ${timePart}
              ${tagsPart}
              <video:family_friendly>yes</video:family_friendly>
            </video:video>
          `;
        }
      }

      contents += `
          <url>
            <loc>${process.env.SITE_NAME}/product/${items[i]?.slug}</loc>
            ${videosPart}
          </url>    
      `;
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${contents}
    </urlset>`;
}

function SiteMap() {
}

export const getServerSideProps = async ({ res, query }:{res:any, query:any}) => {

  const pageQuery = query.page?.split("videoSitemap-")?.[1]?.split(".")?.[0] || 1;

  let sitemap :any;

  if(process.env.PROJECT_SERVER_ECOMMERCE){
    
    const videosResponse: any = await getAllForSiteMap({
      type:"Video",
      MaxResultCount:100,
      SkipCount: (+pageQuery-1) * 100
    });

    sitemap = creareSiteMap(videosResponse?.data?.result?.items || []);
  }else{
    sitemap = creareSiteMap([]);
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