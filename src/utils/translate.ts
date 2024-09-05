import dictonary from "src/assets/translate.json"

export const translate = (code: string, def: string, replace?: any): string => {
  let ret = def
  // @ts-ignore
  if (window?.TRANSLATE && window?.TRANSLATE[code]) {
    ret = window?.TRANSLATE[code]
  } else {
    // @ts-ignore
    ret = (dictonary[code]) ? dictonary[code] : `[NT(`+def+`)]`
  }
  if (replace) {
    Object.keys(replace).forEach((key) => {
      ret = ret.replace(`{${key}}`, replace[key])
    })
  }
  return ret
}