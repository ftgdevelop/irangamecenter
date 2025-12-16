import Layout from "@/components/shared/layout/Layout";
import { store } from "@/redux"; 
import '@mantine/core/styles.css';
import '@/styles/rmdp.scss';
import "@/styles/globals.scss";
import { createTheme, MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {

  const theme = createTheme({});

  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <Head>
          <title> Iran Game Center </title>
          <meta name="robots" content="noindex,nofollow" />

          <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N6VRBVVG');
            `,
          }}
        />
        {/* End Google Tag Manager */}

        <Layout>
          <Component {...pageProps} />
        </Layout>

      </Provider>
    </MantineProvider>
  );
}