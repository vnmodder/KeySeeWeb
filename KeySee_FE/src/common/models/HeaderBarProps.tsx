export interface HeaderBarProps {
  menu: MenuProps[]
  background?: string
  color?: string
}

export interface TypographyMenuProps {
  disable: boolean
  parent: string
}

export interface OptionsState {
  id: string
  name: string
  path: string
  disabled: boolean
  isEndSection?: boolean | undefined
  children: {
    id: string
    name: string
    path: string
    disabled: boolean
    isEndSection?: boolean | undefined
  }[]
}

export interface MenuProps {
  id: string
  parent: string
  disabled: boolean
  isEndSection?: boolean | undefined
  onClick?: ((value: any) => void | undefined) | undefined
  children: {
    id: string
    name: string
    path: string
    disabled: boolean
    isEndSection?: boolean | undefined
    onClick?: ((value: any) => void | undefined) | undefined
    children: {
      id: string
      name: string
      path: string
      disabled: boolean
      isEndSection?: boolean | undefined
      onClick?: ((value: any) => void | undefined) | undefined
    }[]
  }[]
}

export interface OptionsType {
  id: string
  name: string
  path: string
  disabled: boolean
}
