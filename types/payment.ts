export type GetTransactionParams = {
    reserveId?: number;
    CreationTimeFrom?: string;
    CreationTimeTo?: string;
    Type?: string[];
    CurrencyType: "IRR" | "USD" | "EUR";
    SkipCount: number;
    MaxResultCount: number;
}

export type GatewayItem = {
  id: number;
  name?: string;
  displayName?: string;
  isEnabled: boolean;
  image?: {
    path?: string;
    titleAttribute?: string;
    altAttribute?: string;
  };
  form: {
    elements: [];
  };
};

export type GatewayGroupItem = {
  keyword: string;
  category: "Group" | string;
  name?: string;
  title?: string;
  description?: string;
  image?: {
    path?: string;
    titleAttribute?: string;
    altAttribute?: string;
  };
  gateways: GatewayItem[];
};

