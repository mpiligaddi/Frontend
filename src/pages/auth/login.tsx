import { AuthLayout } from '@/components/common';
import { LoginForm } from '@/components/auth';
import type { Page } from '@/typings/page';
import { redirectIfAuth } from '@/lib/auth';

const Login: Page = () => {
  return <LoginForm />;
};

Login.Layout = AuthLayout;

export const getServerSideProps = redirectIfAuth();

export default Login;
