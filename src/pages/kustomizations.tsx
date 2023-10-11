import { Renderer } from '@k8slens/extensions'

import { observer } from 'mobx-react';

import React from "react";

import { kustomizationStore, Kustomization } from '../k8s/fluxcd/kustomization'
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
export class FluxCDKustomizations extends React.Component<{ extension: Renderer.LensExtension }> {

  render() {
    return (
      <KubeObjectListLayout
        tableId="kustomizationsTable"
        className="KustomizationsReports" store={kustomizationStore}
        sortingCallbacks={{
          [sortBy.name]: (kustomization: Kustomization) => kustomization.getName(),
          [sortBy.namespace]: (kustomization: Kustomization) => kustomization.getNs(),
          [sortBy.ready]: (kustomization: Kustomization) => getStatusText(kustomization),
          [sortBy.status]: (kustomization: Kustomization) => getStatusMessage(kustomization),
        }}
        searchFilters={[
          (kustomization: Kustomization) => kustomization.getSearchFields()
        ]}
        renderHeaderTitle="Kustomizations"
        renderTableHeader={[
          {title: "Name", className: "name", sortBy: sortBy.name},
          {title: "Namespace", className: "namespace", sortBy: sortBy.namespace},
          {title: "Ready", className: "ready", sortBy: sortBy.ready},
          {title: "Status", className: "status", sortBy: sortBy.status},
        ]}
        renderTableContents={(kustomization: Kustomization) => [
          kustomization.getName(), //renderName(report.getName()),
          kustomization.getNs(),
          this.renderStatus(kustomization),
          getStatusMessage(kustomization),
        ]}
      />
    )
  }

  renderStatus(kustomization: Kustomization) {
    const className = getStatusClass(kustomization)
    const text = getStatusText(kustomization)
    return (
      <Badge key="name" label={text} className={className}/>
    )
  }
}
