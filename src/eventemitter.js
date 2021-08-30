export default function() {
  var H = {};

  return {
    clear: () => H = {},
    on: (e, h) => (H[e] || (H[e] = [])).push(h),
    off: (e, h) => (H[e] = (H[e] || []).filter((x) => x != h)),
    emit: (e, d) => (H[e] || []).forEach((h) => h(d)),
  };
  return
}