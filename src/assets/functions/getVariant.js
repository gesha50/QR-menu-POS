import {isEqual} from "assets/functions/isEqual";

export function getVariant(item) {
  let curVariant = {}
  let variant = null

  item.options.forEach(op=>{
    curVariant[op.id] = op.value.toLowerCase()
  })

  item.variants.forEach(v=>{
    if (variant) { return }
    if (isEqual(JSON.parse(v.options), curVariant)){
      variant = v
    }
  })
  return variant
}
