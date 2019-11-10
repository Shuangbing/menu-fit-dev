import { MutationTree, ActionTree, ActionContext } from "vuex";
import { Context as AppContext } from "@nuxt/types";
import { RootState } from "../types";

export const state = (): RootState => ({
  loading: false,
  authenticated: false,
  cartVisible: false,
  allergyVisible: false
})

export const mutations: MutationTree<RootState> = {
  updateLoading(state, value: boolean) {
    state.loading = value
  },
  setAuth(state, value: boolean) {
    state.authenticated = value
  },
  setCartVisible(state, value: boolean) {
    state.cartVisible = value
  },
  setAllergyVisible(state, value: boolean) {
    state.allergyVisible = value
  }
}

interface Actions<S, R> extends ActionTree<S, R> {
  nuxtServerInit(actionContext: ActionContext<S, R>, appContext: AppContext): void
}

export const actions: Actions<RootState, RootState> = {
  async nuxtServerInit({ commit }, context) {

  }
}
