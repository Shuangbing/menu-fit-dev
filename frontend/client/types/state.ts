import { Person } from "~/types";

export interface RootState {
  loading: boolean,
  cartVisible: boolean,
  allergyVisible: boolean,
  authenticated: boolean,
}
