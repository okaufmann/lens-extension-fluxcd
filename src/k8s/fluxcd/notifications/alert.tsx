import { Renderer } from '@k8slens/extensions'

const { KubeApi } = Renderer.K8sApi

const KubeObject = Renderer.K8sApi.KubeObject
const KubeObjectStore = Renderer.K8sApi.KubeObjectStore

export class Alert extends KubeObject {
  static readonly kind = 'Alert'
  static readonly namespaced = true
  static readonly apiBase = '/apis/notification.toolkit.fluxcd.io/v1beta2/alerts'
}

export class AlertApi extends KubeApi<Alert> {}
export const alertApi = new AlertApi({ objectConstructor: Alert })
export class AlertStore extends KubeObjectStore<Alert> {
  api: Renderer.K8sApi.KubeApi<Alert> = alertApi
}
export const alertStore = new AlertStore()

Renderer.K8sApi.apiManager.registerStore(alertStore)
