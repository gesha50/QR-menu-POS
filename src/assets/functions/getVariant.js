import {isEqual} from "assets/functions/isEqual";

export function getVariant(item) {
  let curVariant = {}
  let variant_id = null

  item.options.forEach(op=>{
    curVariant[op.id] = op.value.toLowerCase()
  })

  item.variants.forEach(v=>{
    if (variant_id) {
      return
    }
    if (isEqual(JSON.parse(v.options), curVariant)){
      variant_id = v.id
    }
  })
  return variant_id
}
