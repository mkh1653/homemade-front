import { Specialty } from "@/src/lib/schemas/specialty";

export enum SelectedAction {
  NONE = "NONE",
  DELETE = "DELETE",
  EDIT = "EDIT",
  CREATE = "CREATE",
}

export interface SpecialtyState {
  limit: number;
  page: number;
  filter: {
    name?: string;
    description?: string;
    isActive?: boolean | undefined;
    createdAt?: {};
    updatedAt?: {};
  };
  search: string;
  selected: {
    action: SelectedAction;
    specialty: Specialty | null;
  };
  loading: boolean;
}

export const initialState: SpecialtyState = {
  search: "",
  limit: 50,
  page: 1,
  filter: {},
  selected: {
    action: SelectedAction.NONE,
    specialty: null,
  },
  loading: false,
};

export type ACtion =
  | { type: ActionsType.SET_FILTER; payload: SpecialtyState["filter"] }
  | { type: ActionsType.SET_LIMIT; payload: SpecialtyState["limit"] }
  | { type: ActionsType.SET_PAGE; payload: SpecialtyState["page"] }
  | { type: ActionsType.SET_SEARCH; payload: SpecialtyState["search"] }
  | { type: ActionsType.SET_SELECTED; payload: SpecialtyState["selected"] }
  | { type: ActionsType.SET_LOADING; payload: SpecialtyState["loading"] };

export enum ActionsType {
  SET_FILTER = "SET_FILTER",
  SET_SEARCH = "SET_SEARCH",
  SET_LIMIT = "SET_LIMIT",
  SET_PAGE = "SET_PAGE",
  SET_SELECTED = "SET_SELECTED",
  SET_LOADING = "SET_LOADING",
}

export const reducer = (state: SpecialtyState, action: ACtion) => {
  switch (action.type) {
    case ActionsType.SET_SEARCH:
      return { ...state, search: action.payload };
    case ActionsType.SET_FILTER:
      return { ...state, filter: action.payload };
    case ActionsType.SET_LIMIT:
      return { ...state, limit: action.payload };
    case ActionsType.SET_PAGE:
      return { ...state, page: action.payload };
    case ActionsType.SET_SELECTED:
      return { ...state, selected: action.payload };
    case ActionsType.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
