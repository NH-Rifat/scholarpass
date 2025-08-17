import { Institute, State } from "../../../../services/institutes";

// Transform institutes from API format to searchable select format
export const transformInstitutes = (institutes: Institute[]) => {
  return institutes.map((institute) => ({
    id: institute.id,
    name: institute.name,
    city: institute.city,
    state: institute.state,
    address: institute.address,
    verified: institute.verified,
  }));
};

// Transform states from API format to searchable select format
export const transformStates = (states: State[]) => {
  return states.map((state) => ({
    id: state.id,
    name: state.name,
    ticker: state.ticker,
  }));
};
