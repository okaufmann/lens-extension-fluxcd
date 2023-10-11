import { Renderer } from "@k8slens/extensions";
import React from "react"

import { FluxcdObjectReconcileMenuItem, FluxcdObjectReconcileMenuItemProps } from "./src/menus/fluxcd-object-reconcile-menu-item";
import { FluxcdObjectSuspendResumeMenuItem, FluxCdObjectSuspendResumeMenuItemProps } from "./src/menus/fluxcd-object-suspend-resume-menu-item";
import { FluxCDDashboard } from './src/pages/fluxcd-dashboard'
import { FluxCDHelmReleases } from './src/pages/fluxcd-helmreleases'
import { FluxCDKustomizationDetails } from './src/components/fluxcd-kustomization-details'
import { Kustomization, kustomizationApi } from './src/k8s/fluxcd/kustomization'
import { helmReleaseApi } from "./src/k8s/fluxcd/helmrelease";
import { gitRepositoryApi } from "./src/k8s/fluxcd/gitrepository";
import { helmRepositoryApi } from "./src/k8s/fluxcd/helmrepository";
import { helmChartApi } from "./src/k8s/fluxcd/helmchart";
import { bucketApi } from "./src/k8s/fluxcd/bucket";

const {
  Component: {
    Icon,
  }
} = Renderer;

type IconProps = Renderer.Component.IconProps;

export function FluxCDIcon(props: IconProps) {
  return <Icon {...props} material="pages" tooltip={"FluxCD Dashboard"} />;
}

export default class FluxCDExtension extends Renderer.LensExtension {
  kubeObjectDetailItems = [{
    kind: "Kustomization",
    apiVersions: ["kustomize.toolkit.fluxcd.io/v1beta1", "kustomize.toolkit.fluxcd.io/v1beta2"],
    priority: 10,
    components: {
      Details: (props: Renderer.Component.KubeObjectDetailsProps<Kustomization>) => <FluxCDKustomizationDetails {...props} />
    }
  }]

  clusterPages = [
    {
      id: "fluxcd",
      exact: true,
      components: {
        Page: () => <FluxCDDashboard extension={this} />,
      }
    }
  ]

  clusterPageMenus = [
    {
      target: { pageId: "fluxcd" },
      title: "FluxCD",
      components: {
        Icon: FluxCDIcon,
      }
    }
  ]

  kubeObjectMenuItems = [
    { kind: "Kustomization", apiVersions: ["kustomize.toolkit.fluxcd.io/v1beta1", "kustomize.toolkit.fluxcd.io/v1beta2"], api: kustomizationApi },
    { kind: "HelmRelease", apiVersions: ["helm.toolkit.fluxcd.io/v2beta1"], api: helmReleaseApi },
    { kind: "GitRepository", apiVersions: ["source.toolkit.fluxcd.io/v1beta1", "source.toolkit.fluxcd.io/v1beta2"], api: gitRepositoryApi },
    { kind: "HelmChart", apiVersions: ["source.toolkit.fluxcd.io/v1beta1", "source.toolkit.fluxcd.io/v1beta2"], api: helmChartApi },
    { kind: "HelmRepository", apiVersions: ["source.toolkit.fluxcd.io/v1beta1", "source.toolkit.fluxcd.io/v1beta2"], api: helmRepositoryApi },
    { kind: "Bucket", apiVersions: ["source.toolkit.fluxcd.io/v1beta1", "source.toolkit.fluxcd.io/v1beta2"], api: bucketApi },
  ].map(el => {
    return {
      kind: el.kind,
      apiVersions: el.apiVersions,
      components: {
        MenuItem: (props: FluxcdObjectReconcileMenuItemProps) => <FluxcdObjectReconcileMenuItem {...props} api={el.api} />,
      }
    }
  }).concat([
    { kind: "Kustomization", apiVersions: ["kustomize.toolkit.fluxcd.io/v1beta1", "kustomize.toolkit.fluxcd.io/v1beta2"], api: kustomizationApi },
    { kind: "HelmRelease", apiVersions: ["helm.toolkit.fluxcd.io/v2beta1"], api: helmReleaseApi },
    { kind: "GitRepository", apiVersions: ["source.toolkit.fluxcd.io/v1beta1", "source.toolkit.fluxcd.io/v1beta2"], api: gitRepositoryApi },
    { kind: "HelmChart", apiVersions: ["source.toolkit.fluxcd.io/v1beta1", "source.toolkit.fluxcd.io/v1beta2"], api: helmChartApi },
    { kind: "HelmRepository", apiVersions: ["source.toolkit.fluxcd.io/v1beta1", "source.toolkit.fluxcd.io/v1beta2"], api: helmRepositoryApi },
    { kind: "Bucket", apiVersions: ["source.toolkit.fluxcd.io/v1beta1", "source.toolkit.fluxcd.io/v1beta2"], api: bucketApi },
  ].map(el => {
    return {
      kind: el.kind,
      apiVersions: el.apiVersions,
      components: {
        MenuItem: (props: FluxCdObjectSuspendResumeMenuItemProps) => <FluxcdObjectSuspendResumeMenuItem api={el.api} {...props} />,
      }
    }
  }))

}
