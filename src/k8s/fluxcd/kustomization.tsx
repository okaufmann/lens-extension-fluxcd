import { Renderer } from '@freelensapp/extensions'

const { KubeApi } = Renderer.K8sApi

const KubeObject = Renderer.K8sApi.KubeObject
const KubeObjectStore = Renderer.K8sApi.KubeObjectStore

export class Kustomization extends KubeObject {
  static readonly kind = 'Kustomization'
  static readonly namespaced = true
  static readonly apiBase = '/apis/kustomize.toolkit.fluxcd.io/v1beta1/kustomizations'
}

export class KustomizationApi extends KubeApi<Kustomization> {}
export const kustomizationApi = new KustomizationApi({ objectConstructor: Kustomization })
export class KustomizationStore extends KubeObjectStore<Kustomization> {
  api = kustomizationApi
}
export const kustomizationStore = new KustomizationStore()
Renderer.K8sApi.apiManager.registerStore(kustomizationStore)
