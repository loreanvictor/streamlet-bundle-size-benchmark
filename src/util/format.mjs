export function format(num) {
  const kb = num / 1024
  const mb = num / 1024 / 1024

  if (mb >= 1) {
    return `${mb.toFixed(2)}MB`
  } else if (kb >= 1) {
    return `${kb.toFixed(2)}KB`
  } else {
    return `${num}B`
  }
}
