export interface SelectOptionProps {
  label: string
  menuItems: { value: number | string; labelMenu: string }[] | any[]
  variant: boolean
  valueDefaultValue?: number | string
  value?: number | string
  onChange?: ((value: any) => void | undefined) | undefined,
  disabled?: boolean
  isEdited?: boolean;
}
