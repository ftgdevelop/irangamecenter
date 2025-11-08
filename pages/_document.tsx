import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <meta name="viewport" content="width=device-width" />
      <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <body className="antialiased font-iranyekan bg-black" >
        <Main />
        <div id="menu_portal" className="fixed top-0 left-0 right-0 z-[20]" />
        <div id="fixed_bottom_portal" />
        <div id="modal_portal" className="relative z-[20]" />
        <div id="error_modal_portal" className="relative z-[20]" />
        <div id="notification_modal_portal" className="relative z-[20]" />
        <NextScript />
      </body>
    </Html>
  );
}
