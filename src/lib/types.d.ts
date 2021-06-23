export interface User {
  role: string;
  ID: string;
  displayName: string;
  email: string;
  key: string;
}

export interface ReportCategory {
  ID: string;
  name: string;
  withoutStock: boolean;
  badCategory: boolean;
  clientId: number;
  id: string;
  images: {
    revised?: boolean;
    isDeleted?: boolean;
    comment: string;
    favorite?: boolean;
    name: string;
    type: string;
    uri: string;
  }[];
}

export interface Report {
  id: string;
  branchId: string;
  chainId: string;
  clientId: string;
  createdAt: Date;
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
