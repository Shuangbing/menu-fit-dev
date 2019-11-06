import { MutationTree, ActionTree, ActionContext } from "vuex";
import { Context as AppContext } from "@nuxt/types";
import { RootState, Person } from "~/types";
import localRandomData from "~/static/random-data.json";

export const state = () => ({
  loading: false
})

export const mutations = {
  updateLoading (state, value) {
    state.loading = value
  }
}

interface Actions<S, R> extends ActionTree<S, R> {
  nuxtServerInit (actionContext: ActionContext<S, R>, appContext: AppContext): void
}

export const actions: Actions<RootState, RootState> = {
  async nuxtServerInit({ commit }, context) {
    // If you serve the site statically with `nuxt generate`, you can't use HTTP requests for local
  }
}
