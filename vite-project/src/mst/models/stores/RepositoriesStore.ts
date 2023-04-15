import { log } from "console"
import { applySnapshot, flow, types } from "mobx-state-tree"
import { createContext, useContext } from "react"
import { GET_REPOSITORIES, GET_TOP_REPOSITORIES } from "../../../graphql/query"
import { client } from "../../../main"
import { Repository } from "../RepositoryModel"
import { IRepositoryModelSnapshotIn } from "./types/Interfaces"

export const RepositoriesStore = types
    .model("RepositoriesStore", {
        repositories: types.optional(types.array(Repository), []),
        isLoading: false,
        error: types.maybeNull(types.string),
    })
    .actions((self) => ({
        fetchTopRepositories: flow(function* ($count: number = 20) {
            self.isLoading = true
            try {
                const { loading, error, data } = yield client.query({
                    query: GET_TOP_REPOSITORIES,
                    variables: {
                        count: $count,
                    },
                })
                if (loading) {
                    // do something while loading
                } else if (error) {
                    // self.error = error.message
                } else {
                    const _repositories: IRepositoryModelSnapshotIn[] = []
                    data.search.edges.map((edge) => {
                        const node = edge.node
                        _repositories.push({
                            id: node.id,
                            name: node.name,
                            description: node.description,
                            url: node.url,
                            primaryLanguage: node.primaryLanguage
                                ? node.primaryLanguage.name
                                : null,
                            forks: node.forks ? node.forks.totalCount : 0,
                            stargazers: node.stargazers
                                ? node.stargazers.totalCount
                                : 0,
                        })
                    })
                    console.log(_repositories)

                    applySnapshot(self.repositories, _repositories)
                }
            } catch (e) {
                if (e instanceof Error) {
                    self.error = e.message
                }
                console.log(e)
            } finally {
                self.isLoading = false
            }
        }),
    }))

export const store = RepositoriesStore.create({})

export const ContextRootStore = createContext(store)

export const useRootStore = () => useContext(ContextRootStore)
