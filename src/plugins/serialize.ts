import camelcaseKeys from 'camelcase-keys'

export const serialize: any = (obj: any) => {
  return camelcaseKeys(obj, { deep: false })
}
