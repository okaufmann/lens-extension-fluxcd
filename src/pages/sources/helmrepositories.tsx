import { Renderer } from '@k8slens/extensions'

import { observer } from 'mobx-react';

import React from "react";

import { helmRepositoryStore, HelmRepository } from '../../k8s/fluxcd/helmrepository'
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
export class FluxCDHelmRepositories extends React.Component<{ extension: Renderer.LensExtension }> {

  render() {
    return (
      <KubeObjectListLayout
        tableId="helmRepositoriesTable"
        className="HelmRepositories" store={helmRepositoryStore}
        sortingCallbacks={{
          [sortBy.name]: (helmRepository: HelmRepository) => helmRepository.getName(),
          [sortBy.namespace]: (helmRepository: HelmRepository) => helmRepository.getNs(),
          [sortBy.url]: (helmRepository: HelmRepository) => helmRepository.spec.url,
          [sortBy.ready]: (helmRepository: HelmRepository) => getStatusText(helmRepository),
          [sortBy.status]: (helmRepository: HelmRepository) => getStatusMessage(helmRepository),
          [sortBy.age]: (helmRepository: HelmRepository) => helmRepository.getAge(true, true, true),
        }}
        searchFilters={[
          (helmRepository: HelmRepository) => helmRepository.getSearchFields()
        ]}
        renderHeaderTitle="Helm Repositories"
        renderTableHeader={[
          {title: "Name", className: "name", sortBy: sortBy.name},
          {title: "Namespace", className: "namespace", sortBy: sortBy.namespace},
          {title: "Url", className: "url", sortBy: sortBy.url},
          {title: "Ready", className: "ready", sortBy: sortBy.ready},
          {title: "Status", className: "status", sortBy: sortBy.status},
          {title: "Age", className: "age", sortBy: sortBy.age},
        ]}
        renderTableContents={(helmRepository: HelmRepository) => [
          helmRepository.getName(),
          helmRepository.getNs(),
          helmRepository.spec.url,
          this.renderStatus(helmRepository),
          getStatusMessage(helmRepository),
          helmRepository.getAge(),
        ]}
      />
    )
  }

  renderStatus(helmRepository: HelmRepository) {
    const className = getStatusClass(helmRepository)
    const text = getStatusText(helmRepository)
    return (
      <Badge key="name" label={text} className={className}/>
    )
  }

}
