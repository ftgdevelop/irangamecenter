/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getAllForSiteMap } from "@/actions/commerce";

type VideosData = {
  slug?: string;
  name?: string;
  galleries?: {
    id: number,
    filePath: string,
    thumbnail: string,
    // cdnPath: "https://igc1.storage.c2.liara.space/videos/products/122/elden-ring-official-trailer-2",
    // cdnThumbnail: "https://igc1.storage.c2.liara.space/videos/products/122/elden-ring-trailer-thumbnail-2.webp",
    // fileAltAttribute: null,
    // fileTitleAttribute: null,
    // fileUniqKey: "60fe571c-cf85-f011-bf76-000c29176f1e",
    // isActive: true,
    // mediaType: "Video",
    // thumbnailUniqKey: "6f0a4b15-cf85-f011-bf76-000c29176f1e",
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
          videosPart += `
            <video:video>
              <video:thumbnail_loc>${video.thumbnail}</video:thumbnail_loc>
              <video:content_loc>${video.filePath}</video:content_loc>
              <video:title>${items[i].name}</video:title>
              <video:description>توضیح کوتاه درباره ویدئو</video:description>
              <video:duration>120</video:duration>
              <video:publication_date>2023-05-01T08:00:00+00:00</video:publication_date>
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