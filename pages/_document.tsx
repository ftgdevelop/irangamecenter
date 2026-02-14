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
              "@type": "Organization",
              "@id": "https://irangamecenter.com/#organization",
              "name": "ایران گیم سنتر",
              "alternateName": "Iran Game Center",
              "legalName": "[شرکت جستجو گشت رامان]",
              "url": "https://irangamecenter.com",
              "logo": "https://cdn.irangamecenter.com/images/logo/igc-logo.svg",
              "description": "ایران گیم سنتر، مرجع تخصصی خرید بازی‌های کنسول و PC، گیفت کارت و شارژ درون برنامه‌ای بازی‌های موبایل با تحویل سریع و پشتیبانی حرفه‌ای.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IR",
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "[+982182800104]",
                  "contactType": "customer service",
                  "areaServed": "IR",
                  "availableLanguage": ["Persian"]
                },
                {
                  "@type": "ContactPoint",
                  "email": "[info@irangamecenter.com]",
                  "contactType": "technical support",
                  "areaServed": "IR",
                  "availableLanguage": ["Persian", "English"]
                }
              ],
              "sameAs": [
                "https://t.me/irangamecenter_official",
                "https://www.instagram.com/irangamecenter_official",
                "https://x.com/irangamecenter",
                "https://www.aparat.com/irangamecenter.com"
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
