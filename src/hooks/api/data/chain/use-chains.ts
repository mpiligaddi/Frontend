import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import firebase from 'firebase/app';
import { Chain, Report } from '@/lib/types';
import chainsJson from '@/data/chains';

interface Data {
  clientId?: string;
  reported?: boolean;
  revised?: boolean;
  all?: boolean;
  reports?: Report[];
  options?: UseQueryOptions<Chain[]>;
}

export const useChains = ({
  clientId,
  reported,
  revised,
  reports,
  options,
  all
}: Data) => {
  const key = useMemo(
    () =>
      all ? { all } : { reported, clientId, reports: reports?.length, revised },
    [all, reported, clientId, reports, revised]
  );

  const getChains = async () => {
    if (all) {
      return chainsJson;
    }

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

    console.log(reports);

    const chainsData: Chain[] = [];

    chains.forEach(chain => {
      if (chainsId.includes(chain.ID)) {
        chainsData.push(chain);
      }
    });

    if (!reported) return chainsData;

    let reportsChainIds: string[];

    if (revised) {
      reportsChainIds = reports!
        .filter(report => report.revised)
        .map(report => report.chainId);
    } else {
      reportsChainIds = reports!.map(report => report.chainId);
    }

    const onlyWithReports = chainsData.filter(chain =>
      reportsChainIds.includes(chain.ID)
    );

    return onlyWithReports;
  };

  return useQuery(['chains', key], getChains, {
    enabled: all
      ? true
      : false || reported
      ? !!clientId && !!reports
      : !!clientId,
    keepPreviousData: true,
    ...options
  });
};