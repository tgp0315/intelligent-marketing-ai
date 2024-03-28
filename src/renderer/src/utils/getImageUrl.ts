export function getImageUrl(name) {
  return new URL(`../views/workbench/emoji/${name}`, import.meta.url).href
}
