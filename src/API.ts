/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateStockInput = {
  Date: string,
  StockSymbol: string,
  Open: number,
  Close: number,
  High: number,
  Low: number,
  Volume: number,
  OpenInt: number,
};

export type Stock = {
  __typename: "Stock",
  Date: string,
  StockSymbol: string,
  Open: number,
  Close: number,
  High: number,
  Low: number,
  Volume: number,
  OpenInt: number,
};

export type UpdateStockInput = {
  Date: string,
  StockSymbol: string,
  Open?: number | null,
  Close?: number | null,
  High?: number | null,
  Low?: number | null,
  Volume?: number | null,
  OpenInt?: number | null,
};

export type DeleteStockInput = {
  Date: string,
  StockSymbol: string,
};

export type TableStockFilterInput = {
  Date?: TableStringFilterInput | null,
  StockSymbol?: TableStringFilterInput | null,
  Open?: TableFloatFilterInput | null,
  Close?: TableFloatFilterInput | null,
  High?: TableFloatFilterInput | null,
  Low?: TableFloatFilterInput | null,
  Volume?: TableIntFilterInput | null,
  OpenInt?: TableIntFilterInput | null,
};

export type TableStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type TableFloatFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
};

export type TableIntFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
};

export type StockConnection = {
  __typename: "StockConnection",
  items?:  Array<Stock | null > | null,
  nextToken?: string | null,
};

export type CreateStockMutationVariables = {
  input: CreateStockInput,
};

export type CreateStockMutation = {
  createStock?:  {
    __typename: "Stock",
    Date: string,
    StockSymbol: string,
    Open: number,
    Close: number,
    High: number,
    Low: number,
    Volume: number,
    OpenInt: number,
  } | null,
};

export type UpdateStockMutationVariables = {
  input: UpdateStockInput,
};

export type UpdateStockMutation = {
  updateStock?:  {
    __typename: "Stock",
    Date: string,
    StockSymbol: string,
    Open: number,
    Close: number,
    High: number,
    Low: number,
    Volume: number,
    OpenInt: number,
  } | null,
};

export type DeleteStockMutationVariables = {
  input: DeleteStockInput,
};

export type DeleteStockMutation = {
  deleteStock?:  {
    __typename: "Stock",
    Date: string,
    StockSymbol: string,
    Open: number,
    Close: number,
    High: number,
    Low: number,
    Volume: number,
    OpenInt: number,
  } | null,
};

export type GetStockQueryVariables = {
  StockSymbol: string,
  Date: string,
};

export type GetStockQuery = {
  getStock?:  {
    __typename: "Stock",
    Date: string,
    StockSymbol: string,
    Open: number,
    Close: number,
    High: number,
    Low: number,
    Volume: number,
    OpenInt: number,
  } | null,
};

export type ListStocksQueryVariables = {
  filter?: TableStockFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStocksQuery = {
  listStocks?:  {
    __typename: "StockConnection",
    items?:  Array< {
      __typename: "Stock",
      Date: string,
      StockSymbol: string,
      Open: number,
      Close: number,
      High: number,
      Low: number,
      Volume: number,
      OpenInt: number,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateStockSubscriptionVariables = {
  Date?: string | null,
  StockSymbol?: string | null,
  Open?: number | null,
  Close?: number | null,
  High?: number | null,
};

export type OnCreateStockSubscription = {
  onCreateStock?:  {
    __typename: "Stock",
    Date: string,
    StockSymbol: string,
    Open: number,
    Close: number,
    High: number,
    Low: number,
    Volume: number,
    OpenInt: number,
  } | null,
};

export type OnUpdateStockSubscriptionVariables = {
  Date?: string | null,
  StockSymbol?: string | null,
  Open?: number | null,
  Close?: number | null,
  High?: number | null,
};

export type OnUpdateStockSubscription = {
  onUpdateStock?:  {
    __typename: "Stock",
    Date: string,
    StockSymbol: string,
    Open: number,
    Close: number,
    High: number,
    Low: number,
    Volume: number,
    OpenInt: number,
  } | null,
};

export type OnDeleteStockSubscriptionVariables = {
  Date?: string | null,
  StockSymbol?: string | null,
  Open?: number | null,
  Close?: number | null,
  High?: number | null,
};

export type OnDeleteStockSubscription = {
  onDeleteStock?:  {
    __typename: "Stock",
    Date: string,
    StockSymbol: string,
    Open: number,
    Close: number,
    High: number,
    Low: number,
    Volume: number,
    OpenInt: number,
  } | null,
};
