import { Renderer } from '@k8slens/extensions'
import { makeObservable } from 'mobx';

import { observer } from 'mobx-react';

import React, { useEffect, useState } from "react";

import { helmReleaseStore, HelmRelease } from '../k8s/fluxcd/helmrelease'

const {
  Component: {
    KubeObjectListLayout,
  }
} = Renderer;

interface FluxCDHelmReleasesState {
  helmReleases: HelmRelease[]
}

enum sortBy {
  name = "name",
  // namespace = "namespace",
  // critical = "critical",
  // high = "high",
  // medium = "medium",
  // low = "low",
  // unknown = "unknown",
}

@observer
export class FluxCDHelmReleases extends React.Component<{ extension: Renderer.LensExtension }, FluxCDHelmReleasesState> {

  public readonly state: Readonly<FluxCDHelmReleasesState> = {
    helmReleases: [],
  }

  constructor(props: { extension: Renderer.LensExtension }) {
    super(props);

    makeObservable(this)
  }

  componentWillUnmount(): void {
    //
  }

  render() {
    return (
      <KubeObjectListLayout
        tableId="clusterVulnerabilityReportsTable"
        className="ClusterVulnerabilityReports" store={helmReleaseStore}
        sortingCallbacks={{
          [sortBy.name]: (helmRelease: HelmRelease) => helmRelease.getName(),
          // [sortBy.critical]: (report: ClusterVulnerabilityReport) => report.report.summary.criticalCount,
          // [sortBy.high]: (report: ClusterVulnerabilityReport) => report.report.summary.highCount,
          // [sortBy.medium]: (report: ClusterVulnerabilityReport) => report.report.summary.mediumCount,
          // [sortBy.low]: (report: ClusterVulnerabilityReport) => report.report.summary.lowCount,
          // [sortBy.unknown]: (report: ClusterVulnerabilityReport) => report.report.summary.unknownCount,
        }}
        searchFilters={[
          (helmRelease: HelmRelease) => helmRelease.getSearchFields()
        ]}
        renderHeaderTitle="ClusterVulnerabilityReports"
        renderTableHeader={[
          {title: "Name", className: "name", sortBy: sortBy.name},
          // {title: "Image", className: "repository"},
          // {title: "Critical", className: "critical", sortBy: sortBy.critical},
          // {title: "High", className: "high", sortBy: sortBy.high},
          // {title: "Medium", className: "medium", sortBy: sortBy.medium},
          // {title: "Low", className: "low", sortBy: sortBy.low},
          // {title: "Unknown", sortBy: sortBy.unknown},
          // {title: "Scanner", className: "scanner"},
        ]}
        renderTableContents={(helmRelease: HelmRelease) => [
          helmRelease.getName(), //renderName(report.getName()),
          // renderImage(report),
          // report.report.summary.criticalCount,
          // report.report.summary.highCount,
          // report.report.summary.mediumCount,
          // report.report.summary.lowCount,
          // report.report.summary.unknownCount,
          // renderScanner(report.report.scanner),
        ]}
      />
    )
  }
}
