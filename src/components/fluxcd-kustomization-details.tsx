import { Renderer } from "@k8slens/extensions";
import React from "react";
import { Kustomization } from "../k8s/fluxcd/kustomization";

interface KustomizationDetailsState {
  events: Renderer.K8sApi.KubeEvent[]
}

const { Component: { DrawerItem, KubeEventDetails } } = Renderer

export class FluxCDKustomizationDetails extends React.Component<Renderer.Component.KubeObjectDetailsProps<Kustomization>, KustomizationDetailsState> {
  public readonly state: Readonly<KustomizationDetailsState> = {
    events: []
  }

  render() {
    const { object } = this.props
    return (
      <div>
        <DrawerItem name="Name">{object.metadata.name}</DrawerItem>
        <DrawerItem name="Namespace">{object.metadata.namespace}</DrawerItem>
        <DrawerItem name="Source">
          <a onClick={e => { e.preventDefault(); Renderer.Navigation.showDetails(object.selfLink, true) }}>
            {object.spec.sourceRef.kind}:{object.spec.sourceRef.name}
          </a>
        </DrawerItem>
        <DrawerItem name="Path">{object.spec.path}</DrawerItem>
        <DrawerItem name="Interval">{object.spec.interval}</DrawerItem>
        <DrawerItem name="Suspended">{object.spec.suspend === true ? 'Yes' : 'No'}</DrawerItem>
        <DrawerItem name="Prune">{object.spec.prune === true ? 'Yes' : 'No'}</DrawerItem>
        <DrawerItem name="Last Applied Revision">{object.status.lastAppliedRevision}</DrawerItem>
        <DrawerItem name="Ready">{object.status?.conditions.find((s: any) => s.type === "Ready").status}</DrawerItem>
        <DrawerItem name="Status">{object.status?.conditions.find((s: any) => s.type === "Ready").message}</DrawerItem>
        <DrawerItem name="Version">{object.metadata.resourceVersion}</DrawerItem>
        <DrawerItem name="UID">{object.metadata.uid}</DrawerItem>
      </div>
    )
  }

}

