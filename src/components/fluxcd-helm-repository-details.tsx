import { Renderer } from "@k8slens/extensions";
import React from "react";
import { HelmRepository } from "../k8s/fluxcd/sources/helmrepository";
import { getStatusClass, getStatusText } from "../utils";

const { Component: { DrawerItem, Badge } } = Renderer

export class FluxCDHelmRepositoryDetails extends React.Component<Renderer.Component.KubeObjectDetailsProps<HelmRepository>> {

  render() {
    const { object } = this.props

    return (
      <div>
        <DrawerItem name="Status">{object.status?.conditions.find((s: any) => s.type === "Ready").message}</DrawerItem>
        <DrawerItem name="Ready">
          <Badge className={getStatusClass(object)} label={getStatusText(object)} />
        </DrawerItem>
        <DrawerItem name="Interval">{object.spec.interval}</DrawerItem>
        <DrawerItem name="Timeout">{object.spec.timeout}</DrawerItem>
        <DrawerItem name="Url">{object.spec.url}</DrawerItem>
      </div>
    )
  }
}

