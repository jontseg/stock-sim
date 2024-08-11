/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateStockInput = {
  Close: number,
  Date: string,
  High: number,
  Low: number,
  Open: number,
  OpenInt: number,
  StockSymbol: string,
  Volume: number,
};

export type Stock = {
  __typename: "Stock",
  Close: number,
  Date: string,
  High: number,
  Low: number,
  Open: number,
  OpenInt: number,
  StockSymbol: string,
  Volume: number,
};

export type DeleteStockInput = {
  Date: string,
  StockSymbol: string,
};

export type UpdateStockInput = {
  Close?: number | null,
  Date: string,
  High?: number | null,
  Low?: number | null,
  Open?: number | null,
  OpenInt?: number | null,
  StockSymbol: string,
  Volume?: number | null,
};

export type TableStockFilterInput = {
  Close?: TableFloatFilterInput | null,
  Date?: TableStringFilterInput | null,
  High?: TableFloatFilterInput | null,
  Low?: TableFloatFilterInput | null,
  Open?: TableFloatFilterInput | null,
  OpenInt?: TableIntFilterInput | null,
  StockSymbol?: TableStringFilterInput | null,
  Volume?: TableIntFilterInput | null,
};

export type TableFloatFilterInput = {
  attributeExists?: boolean | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type TableStringFilterInput = {
  attributeExists?: boolean | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type TableIntFilterInput = {
  attributeExists?: boolean | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
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
    Close: number,
    Date: string,
    High: number,
    Low: number,
    Open: number,
    OpenInt: number,
    StockSymbol: string,
    Volume: number,
  } | null,
};

export type DeleteStockMutationVariables = {
  input: DeleteStockInput,
};

export type DeleteStockMutation = {
  deleteStock?:  {
    __typename: "Stock",
    Close: number,
    Date: string,
    High: number,
    Low: number,
    Open: number,
    OpenInt: number,
    StockSymbol: string,
    Volume: number,
  } | null,
};

export type UpdateStockMutationVariables = {
  input: UpdateStockInput,
};

export type UpdateStockMutation = {
  updateStock?:  {
    __typename: "Stock",
    Close: number,
    Date: string,
    High: number,
    Low: number,
    Open: number,
    OpenInt: number,
    StockSymbol: string,
    Volume: number,
  } | null,
};

export type GetStockQueryVariables = {
  Date: string,
  StockSymbol: string,
};

export type GetStockQuery = {
  getStock?:  {
    __typename: "Stock",
    Close: number,
    Date: string,
    High: number,
    Low: number,
    Open: number,
    OpenInt: number,
    StockSymbol: string,
    Volume: number,
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
      Close: number,
      Date: string,
      High: number,
      Low: number,
      Open: number,
      OpenInt: number,
      StockSymbol: string,
      Volume: number,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateStockSubscriptionVariables = {
  Close?: number | null,
  Date?: string | null,
  High?: number | null,
  Open?: number | null,
  StockSymbol?: string | null,
};

export type OnCreateStockSubscription = {
  onCreateStock?:  {
    __typename: "Stock",
    Close: number,
    Date: string,
    High: number,
    Low: number,
    Open: number,
    OpenInt: number,
    StockSymbol: string,
    Volume: number,
  } | null,
};

export type OnDeleteStockSubscriptionVariables = {
  Close?: number | null,
  Date?: string | null,
  High?: number | null,
  Open?: number | null,
  StockSymbol?: string | null,
};

export type OnDeleteStockSubscription = {
  onDeleteStock?:  {
    __typename: "Stock",
    Close: number,
    Date: string,
    High: number,
    Low: number,
    Open: number,
    OpenInt: number,
    StockSymbol: string,
    Volume: number,
  } | null,
};

export type OnUpdateStockSubscriptionVariables = {
  Close?: number | null,
  Date?: string | null,
  High?: number | null,
  Open?: number | null,
  StockSymbol?: string | null,
};

export type OnUpdateStockSubscription = {
  onUpdateStock?:  {
    __typename: "Stock",
    Close: number,
    Date: string,
    High: number,
    Low: number,
    Open: number,
    OpenInt: number,
    StockSymbol: string,
    Volume: number,
  } | null,
};
