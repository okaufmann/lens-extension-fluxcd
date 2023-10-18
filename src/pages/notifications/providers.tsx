import { Renderer } from '@k8slens/extensions'

import { observer } from 'mobx-react';

import React from "react";

import { providerStore, Provider } from '../../k8s/fluxcd/notifications/provider'
import { getStatusClass, getStatusMessage, getStatusText } from '../../utils';

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
  age = "age",
}

@observer
export class FluxCDProviders extends React.Component<{ extension: Renderer.LensExtension }> {

  render() {
    return (
      <KubeObjectListLayout
        tableId="providersTable"
        className="Providers" store={providerStore}
        sortingCallbacks={{
          [sortBy.name]: (provider: Provider) => provider.getName(),
          [sortBy.namespace]: (provider: Provider) => provider.getNs(),
          [sortBy.ready]: (provider: Provider) => getStatusText(provider),
          [sortBy.status]: (provider: Provider) => getStatusMessage(provider),
          [sortBy.age]: (provider: Provider) => provider.getAge(true, true, true),
        }}
        searchFilters={[
          (provider: Provider) => provider.getSearchFields()
        ]}
        renderHeaderTitle="Providers"
        renderTableHeader={[
          {title: "Name", className: "name", sortBy: sortBy.name},
          {title: "Namespace", className: "namespace", sortBy: sortBy.namespace},
          {title: "Ready", className: "ready", sortBy: sortBy.ready},
          {title: "Status", className: "status", sortBy: sortBy.status},
          {title: "Age", className: "age", sortBy: sortBy.age},
        ]}
        renderTableContents={(provider: Provider) => [
          provider.getName(),
          provider.getNs(),
          this.renderStatus(provider),
          getStatusMessage(provider),
          provider.getAge(),
        ]}
      />
    )
  }

  renderStatus(provider: Provider) {
    const className = getStatusClass(provider)
    const text = getStatusText(provider)
    return (
      <Badge key="name" label={text} className={className}/>
    )
  }

}
