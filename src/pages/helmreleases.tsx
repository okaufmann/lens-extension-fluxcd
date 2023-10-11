import { Renderer } from '@k8slens/extensions'

import { observer } from 'mobx-react';

import React from "react";

import { helmReleaseStore, HelmRelease } from '../k8s/fluxcd/helmrelease'
import { getStatusClass, getStatusMessage, getStatusText } from '../utils';

const {
  Component: {
    KubeObjectListLayout,
    Badge
  }
} = Renderer;

enum sortBy {
  name = "name",
  namespace = "namespace",
  status = "status",
  ready = "ready",
}

@observer
export class FluxCDHelmReleases extends React.Component<{ extension: Renderer.LensExtension }> {

  render() {
    return (
      <KubeObjectListLayout
        tableId="helmReleasesTable"
        className="HelmReleasesReports" store={helmReleaseStore}
        sortingCallbacks={{
          [sortBy.name]: (helmRelease: HelmRelease) => helmRelease.getName(),
          [sortBy.namespace]: (helmRelease: HelmRelease) => helmRelease.getNs(),
          [sortBy.ready]: (helmRelease: HelmRelease) => getStatusText(helmRelease),
          [sortBy.status]: (helmRelease: HelmRelease) => getStatusMessage(helmRelease),
        }}
        searchFilters={[
          (helmRelease: HelmRelease) => helmRelease.getSearchFields()
        ]}
        renderHeaderTitle="HelmReleases"
        renderTableHeader={[
          {title: "Name", className: "name", sortBy: sortBy.name},
          {title: "Namespace", className: "namespace", sortBy: sortBy.namespace},
          {title: "Ready", className: "ready", sortBy: sortBy.ready},
          {title: "Status", className: "status", sortBy: sortBy.status},
        ]}
        renderTableContents={(helmRelease: HelmRelease) => [
          helmRelease.getName(), //renderName(report.getName()),
          helmRelease.getNs(),
          this.renderStatus(helmRelease),
          getStatusMessage(helmRelease),
        ]}
      />
    )
  }

  renderStatus(helmRelease: HelmRelease) {
    const className = getStatusClass(helmRelease)
    const text = getStatusText(helmRelease)
    return (
      <Badge key="name" label={text} className={className}/>
    )
  }
}
