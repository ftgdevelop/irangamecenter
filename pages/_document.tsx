import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head>
      </Head>
      <body className="antialiased font-iranyekan bg-white dark:bg-black" >
        
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N6VRBVVG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}        

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
