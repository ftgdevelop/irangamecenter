/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getBlogs } from "@/actions/blog";

function creareSiteMap(total: number) {

  let contents = "";

  if (total) {

    for (let i = 0; i < total; i++) {
      contents += `
          <sitemap>
            <loc>${process.env.SITE_NAME}/sitemaps/blogs/blogSitemap-${i + 1}.xml</loc>
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

  if (process.env.PROJECT_SERVER_BLOG) {
    const postsResponse: any = await getBlogs({
      per_page:100,
      page:1
    });
    sitemap = creareSiteMap(+postsResponse?.headers?.['x-wp-totalpages'] || 0);
  } else {
    sitemap = creareSiteMap(0);
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