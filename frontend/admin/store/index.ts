import { MutationTree, ActionTree, ActionContext } from "vuex";
import { Context as AppContext } from "@nuxt/types";
import { RootState, Person } from "~/types";

export const state = () => ({
  loading: false,
  editVisible: false,
})

export const mutations = {
  updateLoading (state, value) {
    state.loading = value
  },
  showEditor (state, value) {
    state.editVisible = value
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
