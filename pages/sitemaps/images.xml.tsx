/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getAllForSiteMap } from "@/actions/commerce";

function createSiteMap(total: number) {

  let contents = "";

  if (total) {

    for (let i = 0; i < total; i++) {
      contents += `
          <sitemap>
            <loc>${process.env.SITE_NAME}/sitemaps/images/imageSitemap-${i + 1}.xml</loc>
          </sitemap>    
      `;
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${contents}    
      </sitemapindex>`;
  }

}

function SiteMap() {
}

export const getServerSideProps = async ({ res }: { res: any }) => {

  let sitemap: any;

  if (process.env.PROJECT_SERVER_ECOMMERCE) {
    const response: any = await getAllForSiteMap({
      type:"Image",
      SkipCount:0,
      MaxResultCount:5
    });
    sitemap = createSiteMap(Math.ceil(+response?.data?.result?.totalCount/100 || 0));
  } else {
    sitemap = createSiteMap(0);
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