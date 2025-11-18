import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <meta name="viewport" content="width=device-width" />
      </Head>
      <body className="antialiased font-iranyekan bg-black" >
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
