import firebase from 'firebase/app';

export interface User {
  role: string;
  ID: string;
  displayName: string;
  email: string;
  key: string;
}

export interface Chain {
  id: string;
  ID: string;
  name: string;
}

export interface Category {
  clientId: string;
  name: string;
  id: string;
  ID: string;
}

export interface Client {
  CUIT: string;
  id: string;
  ID: string;
  address: string;
  adminId: string;
  comercialId: string;
  companyName: string;
  contactName: string;
  control: string;
  email: string;
  name: string;
  periodReportId: 'FS' | string;
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
  id: string;
  address: string;
  chainId: string;
  chainName: string;
  locality: string;
  name: string;
  region: string;
  zoneId: string;
}
