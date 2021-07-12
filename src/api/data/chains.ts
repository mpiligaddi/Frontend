import { useQuery, UseQueryOptions } from 'react-query';
import firebase from 'firebase/app';
import { Chain, Report } from '@/lib/types';

interface Data {
  clientId?: string;
  reported?: boolean;
  reports?: Report[];
  options?: UseQueryOptions<Chain[]>;
}

export const useChains = ({ clientId, reported, reports, options }: Data) => {
  const getChains = async () => {
    const result = await firebase
      .firestore()
      .collection('chainsxclient')
      .where('clientId', '==', clientId)
      .get();

    //setchainsXClient(result.docs);

    const chainsXClient = result.docs.map(chain => ({
      ...(chain.data() as { chainId: string; clientId: string }),
      id: chain.id
    }));

    const chainsId = chainsXClient.map(obj => obj.chainId);

    const { docs: chainDocs } = await firebase
      .firestore()
      .collection('chains')
      .orderBy('name', 'asc')
      .get();

    const chains = chainDocs.map(doc => doc.data()) as Chain[];

    const chainsData: Chain[] = [];

    chains.forEach(chain => {
      if (chainsId.includes(chain.ID)) {
        chainsData.push(chain);
      }
    });

    if (!reported) return chainsData;

    const reportsChainIds = reports!
      .filter(report => report.revised)
      .map(report => report.chainId);

    const onlyWithReports = chainsData.filter(chain =>
      reportsChainIds.includes(chain.ID)
    );

    return onlyWithReports;
  };

  return useQuery(['chains', { clientId, reported }], getChains, {
    enabled: reported ? !!clientId && !!reports : !!clientId,
    keepPreviousData: true,
    ...options
  });
};
