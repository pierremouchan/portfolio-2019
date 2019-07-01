export default async function (ctx, inject) {
  const icons = {"64x64":"/v2/_nuxt/icons/icon_64.af9239.png","120x120":"/v2/_nuxt/icons/icon_120.af9239.png","144x144":"/v2/_nuxt/icons/icon_144.af9239.png","152x152":"/v2/_nuxt/icons/icon_152.af9239.png","192x192":"/v2/_nuxt/icons/icon_192.af9239.png","384x384":"/v2/_nuxt/icons/icon_384.af9239.png","512x512":"/v2/_nuxt/icons/icon_512.af9239.png"}
  const getIcon = size => icons[size + 'x' + size] || ''
  inject('icon', getIcon)
}
