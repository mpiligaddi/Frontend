import '@/assets/scss/trade-app.scss';
import 'react-multi-carousel/lib/styles.css';
import '@/assets/css/nprogress.css';

import { useEffect, FC, useState } from 'react';
import type { AppProps } from 'next/app';
import type { Page } from '@/typings/page';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { QueryClientProvider, QueryClient, setLogger } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';
import { UIProvider } from '@/components/ui';
import NProgress from 'nprogress';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from '@/config/theme';

type MyAppProps = AppProps & {
  Component: Page;
};

const Noop: FC = ({ children }) => <>{children}</>;

setLogger({
  error: error => {
    if (error.response) {
      console.log(error.response.data);
    }
  },
  log: console.log,
  warn: console.warn
});

NProgress.configure({
  showSpinner: false
});

const MyApp: FC<MyAppProps> = ({ Component, pageProps }) => {
  const Layout = Component.Layout || Noop;
  const getLayout = Component.getLayout;
  const router = useRouter();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            cacheTime: 1000 * 60 * 60 * 24
          }
        }
      })
  );

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const start = () => NProgress.start();
    const end = () => NProgress.done();

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
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
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
