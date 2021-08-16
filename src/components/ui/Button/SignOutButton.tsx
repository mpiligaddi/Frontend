import { FC } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { useLogout } from '@/hooks/api';
import { useRouter } from 'next/router';

type SignOutButtonProps = {
  className?: string;
  onClick(): void;
};

const SignOutButton: FC<SignOutButtonProps> = ({ className, onClick }) => {
  const router = useRouter();
  const { mutateAsync } = useLogout();

  const logout = async () => {
    onClick();

    try {
      await mutateAsync();

      await router.push('/auth/login');
    } catch (err) {
      console.log('Ocurrió un error al momento de cerrar sesión.', err);
    }
  };
  return (
    <MenuItem className={className} onClick={logout}>
      Cerrar sesión
    </MenuItem>
  );
};

export default SignOutButton;
