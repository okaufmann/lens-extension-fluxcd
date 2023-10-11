import { Renderer } from '@k8slens/extensions'

import { observer } from 'mobx-react';

import React from "react";

import { gitRepositoryStore, GitRepository } from '../k8s/fluxcd/gitrepository'
import { getStatusClass, getStatusMessage, getStatusText } from '../utils';

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
export class FluxCDGitRepositories extends React.Component<{ extension: Renderer.LensExtension }> {

  render() {
    return (
      <KubeObjectListLayout
        tableId="gitRepositorysTable"
        className="GitRepositories" store={gitRepositoryStore}
        sortingCallbacks={{
          [sortBy.name]: (gitRepository: GitRepository) => gitRepository.getName(),
          [sortBy.namespace]: (gitRepository: GitRepository) => gitRepository.getNs(),
          [sortBy.url]: (gitRepository: GitRepository) => gitRepository.spec.url,
          [sortBy.ready]: (gitRepository: GitRepository) => getStatusText(gitRepository),
          [sortBy.status]: (gitRepository: GitRepository) => getStatusMessage(gitRepository),
          [sortBy.age]: (gitRepository: GitRepository) => gitRepository.getAge()
        }}
        searchFilters={[
          (gitRepository: GitRepository) => gitRepository.getSearchFields()
        ]}
        renderHeaderTitle="Git Repositories"
        renderTableHeader={[
          {title: "Name", className: "name", sortBy: sortBy.name},
          {title: "Namespace", className: "namespace", sortBy: sortBy.namespace},
          {title: "Url", className: "url", sortBy: sortBy.url},
          {title: "Ready", className: "ready", sortBy: sortBy.ready},
          {title: "Status", className: "status", sortBy: sortBy.status},
          {title: "Age", className: "age", sortBy: sortBy.age},
        ]}
        renderTableContents={(gitRepository: GitRepository) => [
          gitRepository.getName(),
          gitRepository.getNs(),
          gitRepository.spec.url,
          this.renderStatus(gitRepository),
          getStatusMessage(gitRepository),
          gitRepository.getAge(),
        ]}
      />
    )
  }

  renderStatus(gitRepository: GitRepository) {
    const className = getStatusClass(gitRepository)
    const text = getStatusText(gitRepository)
    return (
      <Badge key="name" label={text} className={className}/>
    )
  }

}