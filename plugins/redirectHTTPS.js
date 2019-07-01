if (
  process.env.NODE_ENV !== 'development' &&
  window.location.protocol !== 'https:'
) {
  window.location.href = window.location.href.replace('http', 'https');
}
