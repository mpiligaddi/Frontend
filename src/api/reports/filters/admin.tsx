// @ts-nocheck

import {
  createContext,
  useState,
  useContext,
  useEffect,
  FC,
  SetStateAction,
  Dispatch
} from 'react';
import { useAdminClients } from '@/api/user/admin';
import branchesJSON from '@/data/branches';
import clientsJSON from '@/data/clients';
import coveragesJSON from '@/data/coverage';
import chainsJSON from '@/data/chains';
import zonesJSON from '@/data/zones';
import supervisorsJSON from '@/data/supervisors';
import adminsJSON from '@/data/admins';
import comercialsJSON from '@/data/comercials';
import {
  Report,
  Branch,
  Client,
  Chain,
  Zone,
  Supervisor,
  Admin,
  Comercial,
  Coverage
} from '@/lib/types';
import firebase from 'firebase/app';

const noop = () => {};

const AdminFiltersContext = createContext({
  loading: true,
  isLoading: false,
  chain: {} as Chain,
  client: '',
  reports: [] as Report[],
  branch: {} as Branch,
  category: { name: 'Todas' },
  chains: [],
  allBranches: [],
  categories: [],
  clientsData: [],
  branchesXChain: [],
  branchesXClient: [],
  coverageXClient: [],
  coverages: [],
  branchesWithReports: [],
  chainsWithReports: [],
  allClients: [],
  supervisors: [],
  zones: [],
  admins: [],
  comercials: [],
  OFC: [],
  OFCpendings: [],
  setChain: noop,
  setClient: noop,
  setBranch: noop,
  setCategory: noop,
  setBranchesXChain: noop,
  setBranchesXClient: noop,
  setReports: noop,
  setReportsXClient: noop as Dispatch<SetStateAction<Report[]>>
});

const AdminFiltersProvider: FC = ({ children }) => {
  const { clientsData, loading } = useAdminClients();
  const [chain, setChain] = useState<Chain>();
  const [client, setClient] = useState('');
  const [branch, setBranch] = useState({});
  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [chains, setChains] = useState([]);
  const [allBranches, setAllBranches] = useState<Branch[]>([]);
  const [allChains, setAllChains] = useState<Chain[]>([]);
  const [coverages, setCoverages] = useState<Coverage[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [comercials, setComercials] = useState<Comercial[]>([]);
  const [chainsWithReports, setChainsWithReports] = useState([]);
  const [coveragesXAdmin, setCoveragesXAdmin] = useState([]);
  const [coverageXClient, setCoverageXClient] = useState([]);
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [reports, setReports] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reportsXChain, setReportsXChain] = useState([]);
  const [chainsXClient, setChainsXClient] = useState([]);
  const [branchesXChain, setBranchesXChain] = useState([]);
  const [reportsXClient, setReportsXClient] = useState([]);
  const [frequencyReport, setFrequencyReport] = useState([]);
  const [branchesXClient, setBranchesXClient] = useState([]);
  const [categoriesXClient, setCategoriesXClient] = useState([]);
  const [branchesWithReports, setBranchesWithReports] = useState([]);
  const [completeReports, setCompleteReports] = useState([]);
  const [OFC, setOFC] = useState([]);
  const [OFCpendings, setOFCpendings] = useState([]);

  //////////////////////////////////
  //// gets from JSON documents ////
  //////////////////////////////////

  const getAllBranches = () => {
    setAllBranches(branchesJSON);
    return branchesJSON;
  };

  const getAllClients = () => {
    setAllClients(clientsJSON);
  };

  const getAllChains = () => {
    setAllChains(chainsJSON);
  };

  const getZones = () => {
    setZones(zonesJSON);
  };

  const getSupervisors = () => {
    setSupervisors(supervisorsJSON);
  };

  const getAdmins = () => {
    setAdmins(adminsJSON);
  };

  const getComercials = () => {
    setComercials(comercialsJSON);
  };

  const getCoverages = () => {
    return coveragesJSON;
  };

  ///////////////////////////////////
  //// gets with FIREBASE data  /////
  ///////////////////////////////////

  ///*** CADENAS, SUCURSALES Y COBERTURAS ***///

  const getCoveragesFirebase = async () => {
    const result = await firebase
      .firestore()
      .collection('coverages')
      .orderBy('clientId', 'asc')
      .get();

    const coverages = result.docs.map(br => ({
      ...br.data(),
      id: br.id
    })) as Coverage[];
    //console.log(coverages)
    setCoverages(coverages);

    return coverages;
  };

  // Busca las cadenas por cliente en la coleccion 'chainsxclient'
  // Busca entre los chainsXClient, cuales tienen reporte y setea ChainsWithReports
  // Setea chainsXClient, chains & chainsWithReport
  const getChains = async () => {
    //setAllBranches([]);
    setIsLoading(true);
    try {
      const result = await firebase
        .firestore()
        .collection('chainsxclient')
        .where('clientId', '==', client)
        .get();

      const chainsXClient = result.docs.map(chain => ({
        ...chain.data(),
        id: chain.id
      }));

      setChainsXClient(chainsXClient as any);

      const chainsId = chainsXClient.map((obj: any) => obj.chainId);

      const { docs: chainDocs } = await firebase
        .firestore()
        .collection('chains')
        .orderBy('name', 'asc')
        .get();

      const chains = chainDocs.map(doc => doc.data());

      const chainsData: any[] = [];

      chains.forEach(chain => {
        if (chainsId.includes(chain.ID)) {
          chainsData.push(chain);
        }
      });

      const reportsChainIds = reportsXClient.map((report: any) => report.chainId);

      const onlyWithReports = chainsData.filter(chain =>
        reportsChainIds.includes(chain.ID)
      );

      setChains(chainsData as any);
      setChainsWithReports(onlyWithReports as any);
      setIsLoading(false);
    } catch (error) {
      console.error(`getChains. Ocurrió el error: ${error}`);
    }
  };

  // Trae todas las sucursales contratadas por el cliente, segun coverage.
  // NO USA FIREBASE, es todo con data JSON
  const getBranchesxClient = () => {
    setIsLoading(true);
    try {
      const result = coverages.filter(c => c.clientId == +client);
      const ids = result.map(bxc => bxc.branchId);

      const totalbranches = getAllBranches();

      const branchesxclient: any[] = [];

      totalbranches.forEach(b => {
        if (ids.includes(b.ID)) {
          branchesxclient.push(b);
        }
      });
      //console.log('branchesxclient', branchesxclient)
      setBranchesXClient(branchesxclient as any);
      setIsLoading(false);
    } catch (error) {
      console.error(`getBranchesxClient. Ocurrió el error: ${error}`);
    }
  };

  // Requiere que ya se haya ejecutado antes el getBranchesXClient
  // Busca las sucursales por cada cadena. Si hay cadena seleccionada, trae solo las de esa cadena, sino trae todas las del cliente
  // Setea branchesXChain y branchesWithReports
  const getBranchesxChain = () => {
    if (branchesXClient) {
      const reportsBranchsIds = reportsXClient.map(report => report.branchId);

      if (!chain.ID) return setBranchesXChain(branchesXClient);

      const branchesxchain = branchesXClient.filter(
        (b: any) => b.chainId == `${chain.ID}`
      );

      const onlyWithReports = branchesxchain.filter((branch: any) =>
        reportsBranchsIds.includes(branch.ID)
      );

      setBranchesWithReports(onlyWithReports);
      setBranchesXChain(branchesxchain);
    }
  };

  // Setea CoveragesXAdmin, que sirve para obtener todos los coverages para un admin (para mostrar solo la informacion relacionada a ese Admin en la tabla CRUD 'Anexos')
  const getCoveragesXAdmin = async () => {
    setIsLoading(true);
    try {
      //let c = coverages.filter(b => b.chainId == `${chain}`);
      const ids = clientsData.map(c => c.ID);

      const totalcoverages = getCoveragesFirebase();
      const covxadmin: any[] = [];
      totalcoverages.forEach((c: any) => {
        if (ids.includes(c.clientId)) {
          covxadmin.push(b);
        }
      });
      setCoveragesXAdmin(covxadmin);
      setIsLoading(false);
    } catch (error) {
      console.error(`getCoveragesXAdmin. Ocurrió el error: ${error}`);
    }
  };

  // Setea CoveragesXClient, que sirve para obtener todos los datos de la cobertura acordada para un cliente

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

  ///*** REPORTES ***///

  // Busca en la coleccion de 'reports', todos los reportes que sean del cliente seleccionado
  // Setea reportsXClient
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

        const completeReports = reports.filter(r => r.isComplete == true);

        //console.log('completereports',completeReports)
        setCompleteReports(completeReports);

        setIsLoading(false);
      }
    } catch (error) {
      console.error(`getReportsxClient. Ocurrió el error: ${error}`);
    }
  };

  // Requiere que primero se ejecute getReportsxClient
  // Filtra entre los reportes del cliente aquellos que pertenezcan a la cadena seleccionada
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

  // Requiere que primero se ejecute getReportsxClient
  // Genera diferentes tipo de reportes segun si hay filtrado una cadena, una sucursal y una categoria
  // Setea reports
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

  // Busca en la coleccion 'clients' el cliente que esta seleccionado y trae el ID de la frecuencia que contrato.
  // Setea frequencyReport
  const getFrequency = async () => {
    setIsLoading(true);
    try {
      if (client) {
        const result = await firebase.firestore
          .collection('clients')
          .where('ID', '==', `${client}`)
          .get();

        const clients = result.docs.map(client => client.data());
        const freq = clients[0].periodReportId;
        setFrequencyReport(freq);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(`getFrequency. Ocurrió el error: ${error}`);
    }
  };

  // Busca en la coleccion 'categories' todas las categorias del cliente seleccionado
  // setea categories
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

  //console.log(branchesXChain)
  const getOFC = () => {
    setIsLoading(true);
    let OFCList = [];
    branchesXChain.forEach(bxc => {
      const reports = reportsXClient.filter(
        report => report.branchId === bxc.ID
      );

      categories.forEach(cat => {
        let done = false;
        if (reports) {
          reports.forEach(report => {
            const category = report.categories.find(
              category => category.ID === cat.ID && isArray(category.images)
            );
            if (category) {
              done = true;
            }
          });
        } else done = false;

        let ofc = {
          categoryId: cat.ID,
          branchId: bxc.ID,
          done
        };
        //console.log(ofc)
        OFCList.push(ofc);
      });
    });
    //console.log('OFC', OFCList);
    setOFC(OFCList);
    setIsLoading(false);
  };

  const getOFCpending = () => {
    const ofcPendings = OFC.filter(ofc => ofc.done === false);
    setOFCpendings(ofcPendings);
  };

  useEffect(() => {
    getAllClients();
    getAllBranches();
    getAllChains();
    getAdmins();
    getComercials();
    getCoveragesXAdmin;
  }, []);

  useEffect(() => {
    if (!loading && clientsData && !client) {
      setClient(clientsData[0].ID);
    }
  }, [clientsData, loading]);

  useEffect(() => {
    if (reportsXClient) {
      getChains();
      getBranchesxChain();
      getCoveragesXAdmin();
    }
  }, [reportsXClient]);

  useEffect(() => {
    if (client) {
      getFrequency();
      getCategories();
      getReportsxClient();
      getBranchesxClient();
      getCoveragexClient();
      getCoveragesXAdmin();
      getZones();
      getSupervisors();
    }
  }, [client, chain]);

  useEffect(() => {
    getOFCpending();
  }, [OFC]);

  useEffect(() => {
    if (chain) {
      getOFC();
    }
  }, [branchesXChain, branchesXClient]);

  useEffect(() => {
    if (chain) {
      getReportsxChain();
      getBranchesxChain();
    }
  }, [chain]);

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

  return (
    <AdminFiltersContext.Provider
      value={{
        chain,
        chains,
        client,
        branch,
        loading,
        category,
        allBranches,
        isLoading,
        categories,
        clientsData,
        reportsXChain,
        reportsXClient,
        branchesXChain,
        branchesXClient,
        frequencyReport,
        categoriesXClient,
        coverageXClient,
        coveragesXAdmin,
        chainsXClient,
        coverages,
        chainsWithReports,
        allClients,
        allChains,
        reports,
        zones,
        supervisors,
        admins,
        comercials,
        branchesWithReports,
        completeReports,
        OFC,
        OFCpendings,
        setChain,
        setClient,
        setBranch,
        setCategory,
        setBranchesXChain,
        setReportsXClient,
        setBranchesXClient,
        setFrequencyReport,
        setCategoriesXClient,
        setReports,
        setCoverages
      }}
    >
      {children}
    </AdminFiltersContext.Provider>
  );
};

export const useAdminFilters = () => useContext(AdminFiltersContext);

export default AdminFiltersProvider;
