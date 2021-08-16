import { ensureAuth } from '@/lib/auth';

export default function Home() {
  return <h1>Hello World</h1>;
}

export const getServerSideProps = ensureAuth();
