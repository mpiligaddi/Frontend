import { createContext, useState, useContext, useEffect, FC } from 'react';
import { useClient } from '@/api/user/client';
import firebase from 'firebase/app';
import coveragesJSON from '@/data/coverage';
import branchesJSON from '@/data/branches';
import { Report, Branch, Chain, Category } from '@/lib/types';

const noop = () => {};

const ClientsFiltersContext = createContext({
  branch: {} as Branch,
  category: {} as Category,
  chain: {} as Chain,
  chains: [] as Chain[],
  reports: [] as Report[],
  branches: [] as Branch[],
  categories: [] as Category[],
  branchesXChain: [] as Branch[],
  branchesXClient: [] as Branch[],
  branchesWithReports: [] as Branch[],
  chainsWithReports: [] as Chain[],
  coverageXClient: [],
  coverages: [],
  reportsXClient: [] as Report[],
  setBranch: noop,
  setCategory: noop,
  setChain: noop,
  setBranchesXClient: noop,
  setBranchesXChain: noop
});

const ClientsFiltersProvider: FC = ({ children }) => {
  const { client } = useClient();
  const [chain, setChain] = useState('');
  //const [client, setClient] = useState(clientID);
  const [branch, setBranch] = useState('');
  const [category, setCategory] = useState('');
  const [chainsWithReports, setChainsWithReports] = useState([]);
  const [chains, setChains] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chainsXClient, setchainsXClient] = useState([]);
  const [branchesXChain, setBranchesXChain] = useState([]);
  const [branchesXClient, setBranchesXClient] = useState([]);
  const [categoriesXClient, setCategoriesXClient] = useState([]);
  const [reportsXClient, setReportsXClient] = useState([]);
  const [reportsXChain, setReportsXChain] = useState([]);
  const [branchesWithReports, setBranchesWithReports] = useState([]);
  const [frequencyReport, setFrequencyReport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [coverages, setCoverages] = useState(coveragesJSON);
  const [reports, setReports] = useState([]);

  const getChains = async () => {
    //setAllBranches([]);
    setIsLoading(true);
    if (!client) return;
    try {
      const result = await firebase
        .firestore()
        .collection('chainsxclient')
        .where('clientId', '==', client)
        .get();

      //setchainsXClient(result.docs);

      const chainsXClient = result.docs.map(chain => ({
        ...chain.data(),
        id: chain.id
      }));

      setchainsXClient(chainsXClient);
      //console.log(chainsXClient)

      const chainsId = chainsXClient.map(obj => obj.chainId);

      const { docs: chainDocs } = await firebase
        .firestore()
        .collection('chains')
        .orderBy('name', 'asc')
        .get();

      const chains = chainDocs.map(doc => doc.data());

      const chainsData = [];

      chains.forEach(chain => {
        if (chainsId.includes(chain.ID)) {
          chainsData.push(chain);
        }
      });

      const reportsChainIds = reportsXClient
        .filter(report => report.revised)
        .map(report => report.chainId);

      const onlyWithReports = chainsData.filter(chain =>
        reportsChainIds.includes(chain.ID)
      );

      setChains(chainsData);
      setChainsWithReports(onlyWithReports);
      setIsLoading(false);
    } catch (error) {
      console.error(`getChains. Ocurrió el error: ${error}`);
    }
  };

  const getBranches = async () => {
    try {
      const result = await firebase
        .firestore()
        .collection('branches')
        .where('chainId', '==', chain)
        .orderBy('name', 'asc')
        .get();
      const branches = result.docs.map(branch => {
        return { ...branch.data(), id: branch.id };
      });

      setBranches(branches);
    } catch (error) {
      console.error(`getBranches. Ocurrió el error: ${error}`);
    }
  };

  const getCoveragexClient = async () => {
    setIsLoading(true);
    try {
      const cov = coverages.filter(c => c.clientId == client);
      setCoverageXClient(cov);
      setIsLoading(false);
    } catch (error) {
      console.error(`getCoveragexClient. Ocurrió el error: ${error}`);
    }
  };

  const getCoverages = () => {
    return coveragesJSON;
  };

  /* const getBranchesxChain = () => {
    if (branchesXClient) {
      branchesXClient.docs.map(branch => {
        return { ...branch.data(), id: branch.id };
      });
      let BranchXClient = data.filter(b => b.branchId == clientID);
      setBranchesXChain(BranchXClient);
    }
  }; */

  /* const getReportsxChain = async () => {
    if (chain) {
      setReportsXChain(() =>
        reportsXClient.filter(
          report => report.branchId.substr(0, 3) == `${chain}`
        )
      );
    }
  }; */

  const getBranchesxClient = async () => {
    setIsLoading(true);
    try {
      const result = coverages.filter(c => c.clientId == client);
      const ids = result.map(bxc => bxc.branchId);

      const totalbranches = getAllBranches();
      let branchesxclient = [];
      totalbranches.forEach(b => {
        if (ids.includes(b.ID)) {
          branchesxclient.push(b);
        }
      });
      //console.log('branchesxclient', branchesxclient)
      setBranchesXClient(branchesxclient);

      setIsLoading(false);
    } catch (error) {
      console.error(`getBranchesxClient. Ocurrió el error: ${error}`);
    }
  };

  const getCategoriesxClient = async () => {
    try {
      const result = await firebase
        .firestore()
        .collection('categories')
        .where('clientId', '==', `${client}`)
        .get();
      const cxc = result.docs.map(c => {
        return { ...c.data(), id: c.id };
      });
      setCategoriesXClient(cxc);
    } catch (error) {
      console.error(`getCategoriesxClient. Ocurrió el error: ${error}`);
    }
  };

  const getAllBranches = () => {
    //setAllBranches(branchesJSON);
    return branchesJSON;
  };

  const getReportsxClient = async () => {
    setIsLoading(true);
    try {
      if (client) {
        const result = await firebase
          .firestore()
          .collection('reports')
          .where('clientId', '==', `${client}`)
          //.where("createdAt", ">", new Date(Date.now() - 60 * 60 * 1000))
          .orderBy('createdAt', 'asc')
          .get();

        const reports = result.docs.map(report => ({
          ...report.data(),
          id: report.id
        }));

        setReportsXClient(reports);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(`getReportsxClient. Ocurrió el error: ${error}`);
    }
  };

  const getReportsxChain = async () => {
    setIsLoading(true);

    if (chain) {
      setReportsXChain(() =>
        reportsXClient.filter(
          report => report.branchId.substr(0, 3) == `${chain.ID}`
        )
      );
      setIsLoading(false);
    }
  };

  const getReports = async () => {
    if (!chain.ID || !branch.ID) return;

    let reports = reportsXClient.filter(report => {
      if (chain.ID && !branch.ID && report.chainId === chain.ID) return true;
      else if (
        chain.ID &&
        branch.ID &&
        report.chainId === chain.ID &&
        report.branchId === branch.ID
      )
        return true;
      else return false;
    });

    if (category.ID) {
      reports = reports.map(report => {
        const categories = report.categories.filter(c => c.ID === category.ID);

        return {
          ...report,
          categories
        };
      });
    }

    setReports(reports);
  };

  const getBranchesxChain = () => {
    if (branchesXClient) {
      const reportsBranchsIds = reportsXClient
        .filter(report => report.revised)
        .map(report => report.branchId);

      if (!chain.ID) return setBranchesXChain(branchesXClient);
      const branchesxchain = branchesXClient.filter(
        b => b.chainId == `${chain.ID}`
      );

      const onlyWithReports = branchesxchain.filter(branch =>
        reportsBranchsIds.includes(branch.ID)
      );

      setBranchesWithReports(onlyWithReports);
      setBranchesXChain(branchesxchain);
    }
  };

  const getCategories = async () => {
    setIsLoading(true);
    try {
      if (client) {
        const result = await firebase
          .firestore()
          .collection('categories')
          .where('clientId', '==', +client)
          .get();
        const categories = result.docs.map(c => {
          return { ...c.data(), id: c.id };
        });
        setCategories(categories);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(`getCategories. Ocurrió el error: ${error}`);
    }
  };

  useEffect(() => {
    if (reportsXClient) {
      getChains();
      getBranchesxChain();
    }
  }, [reportsXClient]);

  // useEffect(() => {
  //   if (client) {
  //     getChains();
  //     getBranchesxClient();
  //     getCategoriesxClient();
  //     console.log(chains, branchesXClient, categoriesXClient);
  //   }
  // }, []);

  useEffect(() => {
    getAllBranches();
  }, []);

  useEffect(() => {
    if (client) {
      getCategories();
      getBranchesxClient();
      getReportsxClient();
    }
  }, [client]);

  useEffect(() => {
    if (chain) {
      getReportsxChain();
      getBranchesxChain();
    }
  }, [chain, client]);

  // useEffect(() => {
  //   if (chain) {
  //     getBranches();
  //     getReportsxChain();
  //     getBranchesxChain();
  //   }
  // }, [chain]);

  useEffect(() => {
    if (chain) {
      getReportsxChain();
      getBranchesxChain();
    }
  }, [chain, client]);

  useEffect(() => {
    if (reportsXClient) {
      getReports();
    }
  }, [client, chain, branch, reportsXClient, category]);

  /* useEffect(() => {
    getCategories();
    getBranchesxClient();
    
    // console.log({ chainsXClient });
        // console.log({ branchesXClient });
        // console.log({ branchesXChain });
      }, [client, chain, branch]); */

  return (
    <ClientsFiltersContext.Provider
      value={{
        //clientsData,
        chain,
        branch,
        category,
        //loading,
        getChains,
        getBranches,
        getBranchesxClient,
        getReportsxClient,
        getCategoriesxClient,
        branches,
        chains,
        categories,
        branchesXClient,
        branchesXChain,
        categoriesXClient,
        reportsXClient,
        reportsXChain,
        frequencyReport,
        setBranch,
        setCategory,
        setChain,
        setBranchesXClient,
        setBranchesXChain,
        setCategoriesXClient,
        setReportsXClient,
        setFrequencyReport,
        branchesWithReports,
        chainsWithReports,
        isLoading,
        chainsWithReports,
        branchesWithReports,
        reports
      }}
    >
      {children}
    </ClientsFiltersContext.Provider>
  );
};

export const useClientsFilters = () => useContext(ClientsFiltersContext);

export default ClientsFiltersProvider;
