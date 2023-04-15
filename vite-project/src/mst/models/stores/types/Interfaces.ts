import { Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree"
import { Owner } from "../../OwnerModel"
import { Repository } from "../../RepositoryModel"
import { RepositoriesStore } from "../RepositoriesStore"

export interface IRepositoriesStore
    extends Instance<typeof RepositoriesStore> {}
export interface IRepositoriesStoreSnapshotIn
    extends SnapshotIn<typeof RepositoriesStore> {}
export interface IRepositoriesStoreSnapshotOut
    extends SnapshotOut<typeof RepositoriesStore> {}

export interface IRepositoryModel extends Instance<typeof Repository> {}
export interface IRepositoryModelSnapshotIn
    extends SnapshotIn<typeof Repository> {}
export interface IRepositoryModelSnapshotOut
    extends SnapshotOut<typeof Repository> {}
