export type ComponentType =
  'button' |
  'circle_image' |
  'image' |
  'input' |
  'text' |
  'select'

export interface ParsedComponent {
  component: ComponentType
  center: [number, number],
  box: {
    x: number
    y: number
    w: number
    h: number
  }
}
