import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head />
      <body className="antialiased font-iranyekan" >
        <Main />
        <div id="menu_portal" className="fixed top-0 left-0 right-0" />
        <div id="error_modal_portal" />
        <div id="notification_modal_portal" />
        <NextScript />
      </body>
    </Html>
  );
}
