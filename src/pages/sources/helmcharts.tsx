import { Renderer } from '@k8slens/extensions'

import { observer } from 'mobx-react';

import React from "react";

import { helmChartStore, HelmChart } from '../../k8s/fluxcd/helmchart'
import { getStatusClass, getStatusMessage, getStatusText } from '../../utils';

const {
  Component: {
    KubeObjectListLayout,
    Badge
  }
} = Renderer;

enum sortBy {
  name = "name",
  url = "url",
  namespace = "namespace",
  status = "status",
  ready = "ready",
  age = "age",
}

@observer
export class FluxCDHelmCharts extends React.Component<{ extension: Renderer.LensExtension }> {

  render() {
    return (
      <KubeObjectListLayout
        tableId="helmRepositoriesTable"
        className="HelmCharts" store={helmChartStore}
        sortingCallbacks={{
          [sortBy.name]: (helmChart: HelmChart) => helmChart.getName(),
          [sortBy.namespace]: (helmChart: HelmChart) => helmChart.getNs(),
          [sortBy.url]: (helmChart: HelmChart) => helmChart.spec.url,
          [sortBy.ready]: (helmChart: HelmChart) => getStatusText(helmChart),
          [sortBy.status]: (helmChart: HelmChart) => getStatusMessage(helmChart),
          [sortBy.age]: (helmChart: HelmChart) => helmChart.getAge(true, true, true),
        }}
        searchFilters={[
          (helmChart: HelmChart) => helmChart.getSearchFields()
        ]}
        renderHeaderTitle="Helm Charts"
        renderTableHeader={[
          {title: "Name", className: "name", sortBy: sortBy.name},
          {title: "Namespace", className: "namespace", sortBy: sortBy.namespace},
          {title: "Url", className: "url", sortBy: sortBy.url},
          {title: "Ready", className: "ready", sortBy: sortBy.ready},
          {title: "Status", className: "status", sortBy: sortBy.status},
          {title: "Age", className: "age", sortBy: sortBy.age},
        ]}
        renderTableContents={(helmChart: HelmChart) => [
          helmChart.getName(),
          helmChart.getNs(),
          helmChart.spec.url,
          this.renderStatus(helmChart),
          getStatusMessage(helmChart),
          helmChart.getAge(),
        ]}
      />
    )
  }

  renderStatus(helmChart: HelmChart) {
    const className = getStatusClass(helmChart)
    const text = getStatusText(helmChart)
    return (
      <Badge key="name" label={text} className={className}/>
    )
  }

}
