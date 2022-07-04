import { responseInterface } from 'swr'

export type PublicModule = {
  id: number
  name: string
  description: string
  duration: number
}

export interface PublicModuleProps extends PublicModule {
  onSelect: (item: PublicModule) => void
}

export interface PublicModulesResponse extends responseInterface<PublicModule[], Error> {
  data: PublicModule[]
}
