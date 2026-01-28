/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getProducts } from "@/actions/commerce";
import { escapeXml } from "@/helpers";
import { ProductItem } from "@/types/commerce";

function createSiteMap(items: ProductItem[]) {

  let contents = "";

  for (const product of items) {
    const lastmod = product.releaseDate
      ? new Date(product.releaseDate).toISOString()
      : new Date().toISOString();

    contents += `
  <url>
    <loc>${process.env.SITE_NAME}/product/${product.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${
      product.filePath
        ? `
    <image:image>
      <image:loc>${product.filePath}</image:loc>
      <image:title>${escapeXml(product.name) || escapeXml(product.slug)}</image:title>
    </image:image>`
        : ""
    }
  </url>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${contents}
</urlset>`;
}

function SiteMap() {
}

export const getServerSideProps = async ({ res, query }:{res:any, query:any}) => {

  const pageQuery = query.page?.split("productSitemap-")?.[1]?.split(".")?.[0] || 1;

  let sitemap :any;

  if(process.env.PROJECT_SERVER_ECOMMERCE){
    
    const response: any = await getProducts({
      maxResultCount:100,
      skipCount: (+pageQuery-1) * 100,      
    });

    sitemap = createSiteMap(response?.data?.result?.pagedResult?.items || []);
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