import { ComponentType, PropsWithChildren } from "react"

export interface RouteDescription {
  path: string
  component: ComponentType
  layout?: ComponentType<PropsWithChildren>
}
