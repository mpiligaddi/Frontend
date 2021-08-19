type User = {
  role: 'backoffice' | 'client' | 'merchandiser';
  id: string;
  name: string;
  email: string;
  key: string;
  client?: {
    id: string;
  };
  picture: null;
  supervisorId?: string;
};

export type ReportType = 'revised' | 'all' | 'pendings' | 'favorites' | '';

export interface Chain {
  id: string;
  name: string;
  formatId: null;
  products: any[];
  reports?: { id: string; revised: boolean }[];
}

export interface Comercial {
  id: string;
  name: string;
  email: string;
}

export interface OFC {
  categoryId: string;
  chainId: string;
  branchId: string;
  done: boolean;
}

export interface OQC {
  branchId: string;
  done: boolean;
}

export interface Coverage {
  id: string;
  clientId: string;
  branchId: string;
  branch: {
    chain: Chain;
  };
  frecuency: number;
  intensity: number;
}

export interface Supervisor {
  id: string;
  name: string;
  email: string;
  coordinatorId: string;
}

export interface Admin {
  ID: string;
  name: string;
  email: string;
}
export interface Category {
  name: string;
  id: string;
}

export interface Period {
  id: string;
  name: string;
  alias: string;
  type: {
    id: string;
    name: string;
    alias: string;
  };
  id: string;
}

export interface ProductChain {
  id: string;
  chainId: string;
  productId: string;
  product: {
    name: string;
    category: {
      id: string;
    };
  };
}

export interface Zone {
  id: string;
  name: string;
  region: string;
  supervisorId: string;
}

export interface Product {
  id: string;
  name: string;
  type: string;
  sku: string;
  chains?: {
    chain: Chain;
  }[];
  category?: Category;
}

export interface Format {
  id: string;
  name: string;
  chains: Chain[];
}

export interface Client {
  id: string;
  displayName: string;
  name: string;
  address: string;
  cuit: string;
  adminId: string;
  periods: {
    period: Period;
  }[];
  comercialId: string;
}

export interface Image {
  id: string;
  revised?: boolean;
  delete: boolean;
  comment: string;
  deleteReason?: string;
  photoReportId: string;
  favorite?: boolean;
  name: string;
  type: string;
  uri: string;
}

export interface ReportCategory {
  id: string;
  reportId: string;
  categoryId: string;
  category: Category;
  withoutStock: boolean;
  photos: Image[];
}

export interface Report {
  id: string;
  branchId: string;
  chainId: string;
  clientId: string;
  createdAt: string;
  creatorId: string;
  isComplete: boolean;
  revised: boolean;
  categories: ReportCategory[];
  realCategories?: ReportCategory[];
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface Branch {
  id: string;
  address: string;
  displayName: string;
  chainId: string;
  locality: string;
  name: string;
  reports: [];
  zoneId: string;
}
