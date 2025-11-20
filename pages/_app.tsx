import Layout from "@/components/shared/layout/Layout";
import { store } from "@/redux"; 
import '@mantine/core/styles.css';
import '@/styles/rmdp.scss';
import "@/styles/globals.scss";
import { createTheme, MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

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

        <Layout>
          <Component {...pageProps} />
        </Layout>

      </Provider>
    </MantineProvider>
  );
}