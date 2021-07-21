import { useMe } from '@/api/user';
import { FC } from 'react';

const BaseLayout: FC = ({ children }) => {
  const user = useMe();
  if (user.isIdle || user.isLoading) return <p>Loading...</p>;

  return <>{children}</>;
};

export default BaseLayout;
