export type Filter = {
  query: string;
  location: string;
  fullTimeOnly: boolean;
};

export const INITIAL_FILTER: Filter = {
  query: '',
  location: '',
  fullTimeOnly: false,
};
