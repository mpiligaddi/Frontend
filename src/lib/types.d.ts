import firebase from 'firebase/app';

type User = {
  role: 'sadmin' | 'admin' | 'client' | 'merchandiser';
  ID: string;
  displayName: string;
  email: string;
  key: string;
};

export type ReportType = 'revised' | 'all' | 'pendings' | 'favorites' | '';

export interface Chain {
  ID: string;
  name: string;
}

export interface Comercial {
  ID: string;
  name: string;
  email: string;
}

export interface OFC {
  categoryId: string;
  branchId: string;
  done: boolean;
}

export interface Coverage {
  id: string;
  clientId: number;
  branchId: string;
  frequency: number;
  intensity: number;
}

export interface Supervisor {
  ID: string;
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
  clientId: string;
  name: string;
  id: string;
  ID: string;
}

export interface Zone {
  ID: string;
  name: string;
  region: string;
  supervisorId: string;
}

export interface Format {
  id: string;
  name: string;
  chain: string;
}

export interface Client {
  id?: string;
  CUIT: string;
  ID: string;
  address: string;
  adminId: string;
  comercialId: string;
  companyName: string;
  contactName: string;
  control: string;
  name: string;
  periodReportId: 'FS' | 'FQ' | 'FM' | 'FV' | 'IN';
}

export interface Image {
  revised?: boolean;
  isDeleted?: boolean;
  comment: string;
  reason?: string;
  favorite?: boolean;
  name: string;
  type: string;
  uri: string;
}

export interface ReportCategory {
  ID: string;
  name: string;
  withoutStock: boolean;
  badCategory: boolean;
  clientId: number;
  id: string;
  images: Image[];
}

export interface Report {
  id: string;
  branchId: string;
  chainId: string;
  clientId: string;
  createdAt: firebase.firestore.Timestamp;
  createdBy: string;
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
  ID: string;
  address: string;
  chainId: string;
  chainName: string;
  locality: string;
  name: string;
  region: string;
  zoneId: string;
}
