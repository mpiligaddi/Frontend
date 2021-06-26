import '@/assets/scss/trade-app.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '@/lib/firebase';

import { useEffect, FC } from 'react';
import type { AppProps } from 'next/app';
import type { Page } from '@/typings/page';
import Head from 'next/head';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from '@/config/theme';

type MyAppProps = AppProps & {
  Component: Page;
};

const Noop: FC = ({ children }) => <>{children}</>;

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Chek</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
