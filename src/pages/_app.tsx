import '@/assets/scss/trade-app.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '@/lib/firebase';
import 'react-multi-carousel/lib/styles.css';

import { useEffect, FC } from 'react';
import type { AppProps } from 'next/app';
import type { Page } from '@/typings/page';
import Head from 'next/head';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { UIProvider } from '@/components/ui';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from '@/config/theme';

type MyAppProps = AppProps & {
  Component: Page;
};

const Noop: FC = ({ children }) => <>{children}</>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 1000 * 60 * 60 * 24
    }
  }
});

const MyApp: FC<MyAppProps> = ({ Component, pageProps }) => {
  const Layout = Component.Layout || Noop;
  const getLayout = Component.getLayout;

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
        <UIProvider>
          <Head>
            <title>Chek</title>
          </Head>
          {getLayout ? (
            getLayout(
              <>
                <Component {...pageProps} />
                <ReactQueryDevtools />
              </>
            )
          ) : (
            <Layout>
              <Component {...pageProps} />
              <ReactQueryDevtools />
            </Layout>
          )}
        </UIProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
