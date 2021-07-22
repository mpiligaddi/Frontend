import '@/assets/scss/trade-app.scss';
import '@/lib/firebase';
import 'react-multi-carousel/lib/styles.css';
import '@/assets/css/nprogress.css';

import { useEffect, FC } from 'react';
import type { AppProps } from 'next/app';
import type { Page } from '@/typings/page';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { UIProvider } from '@/components/ui';
import NProgress from 'nprogress';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from '@/config/theme';
import { BaseLayout } from '@/components/common';

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

NProgress.configure({
  showSpinner: false
});

const MyApp: FC<MyAppProps> = ({ Component, pageProps }) => {
  const Layout = Component.Layout || Noop;
  const getLayout = Component.getLayout;
  const router = useRouter();

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
      <ThemeProvider theme={theme}>
        <UIProvider>
          <Head>
            <title>Chek</title>
          </Head>
          <BaseLayout>
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
          </BaseLayout>
        </UIProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
