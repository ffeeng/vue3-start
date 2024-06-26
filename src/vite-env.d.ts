declare module '*.svg' {
  const dataUri: string
  const src: string
  export default src
  export { dataUri }
}
declare module '*.vue'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.webp'
declare module '*.bmp'
declare module '*.css'
declare module '*.less'

declare interface Window {
  __PLUGIN__: any
  APP: any
  OpenApi: any
}
