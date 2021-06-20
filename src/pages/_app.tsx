import { useEffect, FC } from 'react';
import type { AppProps } from 'next/app';

import '@/assets/scss/trade-app.scss';
import { ThemeProvider } from '@material-ui/core';
import theme from '@/config/theme';
import '@/lib/firebase';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};
export default MyApp;
