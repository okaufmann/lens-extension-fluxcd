import { Renderer } from '@k8slens/extensions'

const { KubeApi } = Renderer.K8sApi

const KubeObject = Renderer.K8sApi.KubeObject
const KubeObjectStore = Renderer.K8sApi.KubeObjectStore

export class Receiver extends KubeObject {
  static readonly kind = 'Receiver'
  static readonly namespaced = true
  static readonly apiBase = '/apis/notification.toolkit.fluxcd.io/v1beta2/receivers'
}

export class ReceiverApi extends KubeApi<Receiver> {}
export const receiverApi = new ReceiverApi({ objectConstructor: Receiver })
export class ReceiverStore extends KubeObjectStore<Receiver> {
  api: Renderer.K8sApi.KubeApi<Receiver> = receiverApi
}
export const receiverStore = new ReceiverStore()

Renderer.K8sApi.apiManager.registerStore(receiverStore)
