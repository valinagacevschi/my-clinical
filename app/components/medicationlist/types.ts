/* eslint-disable @typescript-eslint/no-explicit-any */
import { MedProps } from '../../types'
import { SectionListData, ViewStyle } from 'react-native'

export type ModeType = 'all' | 'today'
export interface MedicationListProps {
  data: Array<MedProps>
  refreshing?: boolean
  onRefresh?: () => void
  mode: ModeType
  style?: ViewStyle | ViewStyle[]
  header?:
    | React.ComponentClass<any, any>
    | React.FunctionComponent<any>
    | React.ReactElement<
        any,
        | string
        | ((
            props: any,
          ) => React.ReactElement<
            any,
            string | (new (props: any) => React.Component<any, any, any>)
          >)
      >
  footer?:
    | React.ComponentClass<any, any>
    | React.FunctionComponent<any>
    | React.ReactElement<
        any,
        | string
        | ((
            props: any,
          ) => React.ReactElement<
            any,
            string | (new (props: any) => React.Component<any, any, any>)
          >)
      >
  emptyView?:
    | React.ComponentClass<any, any>
    | React.FunctionComponent<any>
    | React.ReactElement<
        any,
        | string
        | ((
            props: any,
          ) => React.ReactElement<
            any,
            string | (new (props: any) => React.Component<any, any, any>)
          >)
      >
}

export interface ItemHeader {
  section: SectionListData<{ title: string }>
}

export interface Item {
  item: MedProps
}

export interface SectionItem {
  title: string
  data: MedProps[]
}
