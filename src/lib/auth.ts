import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import {
  GetServerSidePropsResult,
  GetServerSidePropsContext,
  GetServerSideProps
} from 'next';
import { client } from '@/lib/axios';
import { User } from './types';

type CustomGSSR = (
  ctx: GetServerSidePropsContext,
  client: QueryClient
) => Promise<GetServerSidePropsResult<Record<string, string>>>;

const roles: Record<string, string> = {
  backoffice: 'admin',
  client: 'client'
};

export const ensureAuth =
  (role?: string, gssr?: CustomGSSR): GetServerSideProps =>
  async ({ req }) => {
    if (!req.cookies.token) {
      return {
        props: {},
        redirect: {
          destination: '/auth/login'
        }
      };
    }

    const queryClient = new QueryClient();

    try {
      const user = await queryClient.fetchQuery('me', () =>
        client
          .get<{ user: User }>('/auth', {
            headers: req.headers
          })
          .then(res => res.data.user)
      );

      if (!user || !roles[user.role]) {
        return {
          props: {},
          redirect: {
            destination: '/auth/login'
          }
        };
      }

      if (user.role !== role && roles[user.role]) {
        return {
          props: {},
          redirect: {
            destination: `/${roles[user.role]}/dashboard`
          }
        };
      }
    } catch {
      return {
        props: {},
        redirect: {
          destination: '/auth/login'
        }
      };
    }

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    };
  };

export const redirectIfAuth =
  (): GetServerSideProps =>
  async ({ req }) => {
    if (!req.cookies.token) {
      return {
        props: {}
      };
    }

    const queryClient = new QueryClient();

    try {
      const user = await queryClient.fetchQuery('me', () =>
        client
          .get<{ user: User }>('/auth', {
            headers: req.headers
          })
          .then(res => res.data.user)
      );

      if (user && roles[user.role]) {
        return {
          props: {
            dehydratedState: dehydrate(queryClient)
          },
          redirect: {
            destination: `/${roles[user.role]}/dashboard`
          }
        };
      }
    } catch {
      return {
        props: {}
      };
    }

    return {
      props: {}
    };
  };
