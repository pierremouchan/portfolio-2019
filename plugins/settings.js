// Settings for your entire project like global CSS
// Access it using this.$yourSettingsName (inside vue components)

export default (ctx, inject) => {
  const settings = {
    pathToIMG: '/images/',
    pathToIcons: '/images/icons/',

    colorRed: '#ED0000',
    colorDarkRed: '#B4000B',
    colorDarkGrey: '#2F2F2F',
    colorGrey: '#777777',
    colorLightGrey: '#D8D8D8',
    colorNull: '#877666',

    maxLoadingTime: 2000,
    // loadingSpeed from 150 to 1000
    // Feel free to edit the loading.vue as well !
    loadingSpeed: 150
  };

  inject('settings', settings);
};

window.addEventListener('load', function(event) {
  console.log('event -> ', event);
  console.log('Toutes les ressources sont chargées !');
});
