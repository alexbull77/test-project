import { types } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

export const Repository = types.model("RepositoryModel", {
    id: types.optional(types.identifier, () => uuidv4()),
    name: "",
    description: types.maybeNull(types.string),
    url: "",
    stargazers: 0,
    forks: 0,
    primaryLanguage: types.maybeNull(types.string),
})

// {
//     "node": {
//         "name": "coding-interview-university",
//         "description": "A complete computer science study plan to become a software engineer.",
//         "url": "https://github.com/jwasham/coding-interview-university",
//         "stargazers": {
//             "totalCount": 254683
//         },
//         "forks": {
//             "totalCount": 61655
//         },
//         "primaryLanguage": null
//     }
// },
