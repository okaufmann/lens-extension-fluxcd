import { kustomizationApi } from './kustomization'
import { helmReleaseApi } from './helm/helmrelease'
import { gitRepositoryApi } from './sources/gitrepository'
import { helmRepositoryApi } from './sources/helmrepository'
import { imageRepositoryApi } from './image-automation/imagerepository'
import { helmChartApi } from './sources/helmchart'
import { bucketApi } from './sources/bucket'
import { ociRepositoryApi } from './sources/ocirepository'
import { imagePolicyApi } from './image-automation/imagepolicy'
import { imageUpdateAutomationApi } from './image-automation/imageupdateautomation'
import { alertApi } from './notifications/alert'
import { receiverApi } from './notifications/receiver'
import { providerApi } from './notifications/provider'

export const fluxcdObjects = [
  {
    kind: 'Kustomization',
    apiVersions: [
      'kustomize.toolkit.fluxcd.io/v1beta1',
      'kustomize.toolkit.fluxcd.io/v1beta2',
      'kustomize.toolkit.fluxcd.io/v1',
    ],
    api: kustomizationApi,
  },
  {
    kind: 'HelmRelease',
    apiVersions: ['helm.toolkit.fluxcd.io/v2beta1', 'helm.toolkit.fluxcd.io/v2'],
    api: helmReleaseApi,
  },
  {
    kind: 'GitRepository',
    apiVersions: [
      'source.toolkit.fluxcd.io/v1beta1',
      'source.toolkit.fluxcd.io/v1beta2',
      'source.toolkit.fluxcd.io/v1',
    ],
    api: gitRepositoryApi,
  },
  {
    kind: 'HelmChart',
    apiVersions: [
      'source.toolkit.fluxcd.io/v1beta1',
      'source.toolkit.fluxcd.io/v1beta2',
      'source.toolkit.fluxcd.io/v1',
    ],
    api: helmChartApi,
  },
  {
    kind: 'HelmRepository',
    apiVersions: [
      'source.toolkit.fluxcd.io/v1beta1',
      'source.toolkit.fluxcd.io/v1beta2',
      'source.toolkit.fluxcd.io/v1',
    ],
    api: helmRepositoryApi,
  },
  {
    kind: 'Bucket',
    apiVersions: [
      'source.toolkit.fluxcd.io/v1beta1',
      'source.toolkit.fluxcd.io/v1beta2',
      'source.toolkit.fluxcd.io/v1',
    ],
    api: bucketApi,
  },
  {
    kind: 'OCIRepository',
    apiVersions: [
      'source.toolkit.fluxcd.io/v1beta1',
      'source.toolkit.fluxcd.io/v1beta2',
      'source.toolkit.fluxcd.io/v1',
    ],
    api: ociRepositoryApi,
  },
  {
    kind: 'ImageRepository',
    apiVersions: ['image.toolkit.fluxcd.io/v1beta1', 'image.toolkit.fluxcd.io/v1beta2'],
    api: imageRepositoryApi,
  },
  {
    kind: 'ImagePolicy',
    apiVersions: ['image.toolkit.fluxcd.io/v1beta1', 'image.toolkit.fluxcd.io/v1beta2'],
    api: imagePolicyApi,
    suspend: false,
  },
  {
    kind: 'ImageUpdateAutomation',
    apiVersions: ['image.toolkit.fluxcd.io/v1beta1', 'image.toolkit.fluxcd.io/v1beta2'],
    api: imageUpdateAutomationApi,
  },
  {
    kind: 'Alert',
    apiVersions: ['notification.toolkit.fluxcd.io/v1beta1', 'notification.toolkit.fluxcd.io/v1beta2'],
    api: alertApi,
  },
  {
    kind: 'Provider',
    apiVersions: ['notification.toolkit.fluxcd.io/v1beta1', 'notification.toolkit.fluxcd.io/v1beta2'],
    api: providerApi,
    suspend: false,
  },
  {
    kind: 'Receiver',
    apiVersions: ['notification.toolkit.fluxcd.io/v1beta1', 'notification.toolkit.fluxcd.io/v1beta2'],
    api: receiverApi,
  },
]
