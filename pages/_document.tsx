import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N6VRBVVG');`,
          }}
        />  

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://irangamecenter.com/#organization",
                  "name": "Iran Game Center",
                  "url": "https://irangamecenter.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://irangamecenter.com/logo.svg",
                    "width": 512,
                    "height": 512
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://irangamecenter.com/#website",
                  "url": "https://irangamecenter.com",
                  "name": "Iran Game Center",
                  "publisher": {
                    "@id": "https://irangamecenter.com/#organization"
                  }
                }
              ]
            })
          }}
        />

      </Head>
      <body className="antialiased font-iranyekan bg-white dark:bg-black" >
         
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N6VRBVVG"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <Main />
        <div>
          <div id="menu_portal" className="fixed top-0 left-0 right-0 z-[20]" />
          <div id="fixed_bottom_portal" />
          <div id="modal_portal" className="relative z-[20]" />
          <div id="error_modal_portal" className="relative z-[20]" />
          <div id="notification_modal_portal" className="relative z-[20]" />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
