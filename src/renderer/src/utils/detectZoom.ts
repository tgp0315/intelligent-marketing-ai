export const detectZoom = () => {
  let ratio = 0
  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio
  } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth
  }
  if (ratio) {
    ratio = Math.round(ratio * 100)
  }
  return ratio
}
