import { AuthLayout } from '@/components/common';
import { LoginForm } from '@/components/auth';
import type { Page } from '@/typings/page';

const Login: Page = () => {
  return <LoginForm />;
};

Login.Layout = AuthLayout;

export default Login;
