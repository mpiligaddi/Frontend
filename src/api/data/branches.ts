import { useMemo } from 'react';
import { useMutation, useQuery, UseQueryOptions } from 'react-query';
import { Branch, Report } from '@/lib/types';
import firebase from 'firebase/app';
import { useCoverages } from '.';
import branchesJson from '@/data/branches';

interface Config {
  chain?: string;
  reported?: boolean;
  revised?: boolean;
  reports?: Report[];
  all?: boolean;
  clientId?: number;
  options?: UseQueryOptions<Branch[]>;
}

export const useBranches = ({
  chain,
  reported,
  revised,
  reports,
  clientId,
  options,
  all
}: Config) => {
  const coverages = useCoverages();
  const key = useMemo(
    () =>
      all
        ? { all }
        : { chain, reported, clientId, reports: reports?.length, revised },
    [all, reported, clientId, chain, reports, revised]
  );

  const getBranches = async (): Promise<Branch[]> => {
    if (all) {
      return branchesJson;
    }

    const clientCoverages = coverages.data?.filter(
      coverage => coverage.clientId === clientId
    );
    const branchesIds = clientCoverages?.map(c => c.branchId);

    let branches: Branch[] = [];

    branchesJson.forEach(b => {
      if (branchesIds?.includes(b.ID)) {
        branches.push(b);
      }
    });

    if (!chain) return branches;

    if (chain) {
      branches = branches.filter(branch => branch.chainId === chain);
    }

    if (!reported) return branches;

    let reportsBranchsIds: string[];

    if (revised) {
      reportsBranchsIds = reports!
        .filter(report => report.revised)
        .map(report => report.branchId);
    } else {
      reportsBranchsIds = reports!.map(report => report.branchId);
    }

    const onlyWithReports = branches.filter(branch =>
      reportsBranchsIds.includes(branch.ID)
    );

    return onlyWithReports;
  };

  return useQuery(['branches', key], getBranches, {
    enabled: all ? true : false || !coverages.isLoading,
    keepPreviousData: true,
    ...options
  });
};

interface UpdateData {
  id: string;
  chainId: string;
  chainName: string;
  name: string;
  ID: string;
  address: string;
  zoneId: string;
}

export const useUpdateBranch = () => {
  const updateBranch = async ({ id, ...data }: UpdateData) => {
    await firebase.firestore().collection('branches').doc(id).update(data);

    return {
      id,
      ...data
    };
  };

  return useMutation(updateBranch);
};
