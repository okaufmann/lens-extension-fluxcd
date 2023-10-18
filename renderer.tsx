import { Renderer } from "@k8slens/extensions";
import React from "react"

import { FluxcdObjectReconcileMenuItem, FluxcdObjectReconcileMenuItemProps } from "./src/menus/fluxcd-object-reconcile-menu-item";
import { FluxcdObjectSuspendResumeMenuItem, FluxCdObjectSuspendResumeMenuItemProps } from "./src/menus/fluxcd-object-suspend-resume-menu-item";
import { FluxCDDashboard } from './src/pages/dashboard'
import { FluxCDHelmReleases } from './src/pages/sources/helmreleases'
import { FluxCDKustomizations } from './src/pages/kustomizations'
import { FluxCDGitRepositories } from './src/pages/sources/gitrepositories'
import { FluxCDHelmRepositories } from './src/pages/sources/helmrepositories'
import { FluxCDHelmCharts } from './src/pages/sources/helmcharts'
import { FluxCDOCIRepositories } from './src/pages/sources/ocirepositories'
import { FluxCDImageRepositories } from './src/pages/imageautomation/imagerepositories'
import { FluxCDImagePolicies } from './src/pages/imageautomation/imagepolicies'
import { FluxCDImageUpdateAutomations } from './src/pages/imageautomation/imageupdateautomations'
import { FluxCDAlerts } from './src/pages/notifications/alerts'
import { FluxCDProviders } from './src/pages/notifications/providers'
import { FluxCDReceivers } from './src/pages/notifications/receivers'
import { FluxCDBuckets } from './src/pages/sources/buckets'
import { FluxCDKustomizationDetails } from './src/components/fluxcd-kustomization-details'
import { Kustomization, kustomizationApi } from './src/k8s/fluxcd/kustomization'
import { helmReleaseApi } from "./src/k8s/fluxcd/helm/helmrelease";
import { gitRepositoryApi } from "./src/k8s/fluxcd/sources/gitrepository";
import { helmRepositoryApi } from "./src/k8s/fluxcd/sources/helmrepository";
import { imageRepositoryApi } from "./src/k8s/fluxcd/image-automation/imagerepository";
import { helmChartApi } from "./src/k8s/fluxcd/sources/helmchart";
import { bucketApi } from "./src/k8s/fluxcd/sources/bucket";

const {
  Component: {
    Icon,
  }
} = Renderer;

type IconProps = Renderer.Component.IconProps;

export function FluxCDIcon(props: IconProps) {
  return <Icon {...props} material="pages" />;
}

const fluxcdObjects = [
  { kind: "Kustomization", apiVersions: ["kustomize.toolkit.fluxcd.io/v1beta1", "kustomize.toolkit.fluxcd.io/v1beta2", "kustomize.toolkit.fluxcd.io/v1"], api: kustomizationApi },
  { kind: "HelmRelease", apiVersions: ["helm.toolkit.fluxcd.io/v2beta1"], api: helmReleaseApi },
  { kind: "GitRepository", apiVersions: ["source.toolkit.fluxcd.io/v1beta1", "source.toolkit.fluxcd.io/v1beta2", "source.toolkit.fluxcd.io/v1"], api: gitRepositoryApi },
  { kind: "HelmChart", apiVersions: ["source.toolkit.fluxcd.io/v1beta1", "source.toolkit.fluxcd.io/v1beta2"], api: helmChartApi },
  { kind: "HelmRepository", apiVersions: ["source.toolkit.fluxcd.io/v1beta1", "source.toolkit.fluxcd.io/v1beta2"], api: helmRepositoryApi },
  { kind: "Bucket", apiVersions: ["source.toolkit.fluxcd.io/v1beta1", "source.toolkit.fluxcd.io/v1beta2"], api: bucketApi },
  { kind: "ImageRepository", apiVersions: ["image.toolkit.fluxcd.io/v1beta2"], api: imageRepositoryApi },
]

export default class FluxCDExtension extends Renderer.LensExtension {
  kubeObjectDetailItems = [{
    kind: "Kustomization",
    apiVersions: ["kustomize.toolkit.fluxcd.io/v1beta1", "kustomize.toolkit.fluxcd.io/v1beta2", "kustomize.toolkit.fluxcd.io/v1"],
    priority: 10,
    components: {
      Details: (props: Renderer.Component.KubeObjectDetailsProps<Kustomization>) => <FluxCDKustomizationDetails {...props} />
    }
  }]

  clusterPages = [
    {
      id: "dashboard",
      components: {
        Page: () => <FluxCDDashboard extension={this} />,
      }
    },
    {
      id: "helmreleases",
      components: {
        Page: () => <FluxCDHelmReleases extension={this} />,
      }
    },
    {
      id: "kustomizations",
      components: {
        Page: () => <FluxCDKustomizations extension={this} />,
      }
    },
    {
      id: "gitrepositories",
      components: {
        Page: () => <FluxCDGitRepositories extension={this} />,
      }
    },
    {
      id: "helmrepositories",
      components: {
        Page: () => <FluxCDHelmRepositories extension={this} />,
      }
    },
    {
      id: "helmcharts",
      components: {
        Page: () => <FluxCDHelmCharts extension={this} />,
      }
    },
    {
      id: "ocirepositories",
      components: {
        Page: () => <FluxCDOCIRepositories extension={this} />,
      }
    },
    {
      id: "buckets",
      components: {
        Page: () => <FluxCDBuckets extension={this} />,
      }
    },
    {
      id: "imagerepositories",
      components: {
        Page: () => <FluxCDHelmRepositories extension={this} />,
      }
    },
    {
      id: "imagepolicies",
      components: {
        Page: () => <FluxCDImagePolicies extension={this} />,
      }
    },
    {
      id: "imageupdateautomations",
      components: {
        Page: () => <FluxCDImageUpdateAutomations extension={this} />,
      }
    },
    {
      id: "imagerepositories",
      components: {
        Page: () => <FluxCDImageRepositories extension={this} />,
      }
    },
    {
      id: "alerts",
      components: {
        Page: () => <FluxCDAlerts extension={this} />,
      }
    },
    {
      id: "providers",
      components: {
        Page: () => <FluxCDProviders extension={this} />,
      }
    },
    {
      id: "receivers",
      components: {
        Page: () => <FluxCDReceivers extension={this} />,
      }
    }
  ]

  clusterPageMenus = [
    {
      id: "fluxcd",
      title: "FluxCD",
      components: {
        Icon: FluxCDIcon,
      }
    },
    {
      id: "dashboard",
      parentId: "fluxcd",
      target: { pageId: "dashboard" },
      title: "Overview",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "kustomizations",
      parentId: "fluxcd",
      target: { pageId: "kustomizations" },
      title: "Kustomizations",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "helm",
      parentId: "fluxcd",
      title: "Helm",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "helmreleases",
      parentId: "helm",
      target: { pageId: "helmreleases" },
      title: "Helm Releases",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "sources",
      parentId: "fluxcd",
      title: "Sources",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "gitrepositories",
      parentId: "sources",
      target: { pageId: "gitrepositories" },
      title: "Git Repositories",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "helmrepositories",
      parentId: "sources",
      target: { pageId: "helmrepositories" },
      title: "Helm Repositories",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "helmcharts",
      parentId: "sources",
      target: { pageId: "helmcharts" },
      title: "Helm Charts",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "buckets",
      parentId: "sources",
      target: { pageId: "buckets" },
      title: "Buckets",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "ocirepositories",
      parentId: "sources",
      target: { pageId: "ocirepositories" },
      title: "OCI Repositories",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "imageautomation",
      parentId: "fluxcd",
      title: "Image Automation",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "imagerepositories",
      parentId: "imageautomation",
      target: { pageId: "imagerepositories" },
      title: "Image Repositories",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "imagepolicies",
      parentId: "imageautomation",
      target: { pageId: "imagepolicies" },
      title: "Image Policies",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "imageupdateautomations",
      parentId: "imageautomation",
      target: { pageId: "imageupdateautomations" },
      title: "Image Update Automations",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "notifications",
      parentId: "fluxcd",
      title: "Notifications",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "alerts",
      parentId: "notifications",
      target: { pageId: "alerts" },
      title: "Alerts",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "providers",
      parentId: "notifications",
      target: { pageId: "providers" },
      title: "Providers",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "receivers",
      parentId: "notifications",
      target: { pageId: "receivers" },
      title: "Receivers",
      components: {
        Icon: null as any,
      }
    },
  ]

  kubeObjectMenuItems =
    fluxcdObjects.map(el => {
      return {
        kind: el.kind,
        apiVersions: el.apiVersions,
        components: {
          MenuItem: (props: FluxcdObjectReconcileMenuItemProps) => <FluxcdObjectReconcileMenuItem {...props} api={el.api} />,
        }
      }
    })
      .concat(
        fluxcdObjects
          .map(el => {
            return {
              kind: el.kind,
              apiVersions: el.apiVersions,
              components: {
                MenuItem: (props: FluxCdObjectSuspendResumeMenuItemProps) => <FluxcdObjectSuspendResumeMenuItem api={el.api} {...props} />,
              }
            }
          })
      )

}
