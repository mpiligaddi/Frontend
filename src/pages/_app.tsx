import '@/assets/scss/trade-app.scss';
import '@/lib/firebase';

import { useEffect, FC } from 'react';
import type { AppProps } from 'next/app';
import type { Page } from '@/typings/page';
import Head from 'next/head';

import { ThemeProvider } from '@material-ui/core';
import theme from '@/config/theme';

type MyAppProps = AppProps & {
  Component: Page;
};

const Noop: FC = ({ children }) => <>{children}</>;

const MyApp: FC<MyAppProps> = ({ Component, pageProps }) => {
  const Layout = Component.Layout ?? Noop;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Chek</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
