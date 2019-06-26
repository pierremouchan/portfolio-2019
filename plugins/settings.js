// Settings for your entire project like global CSS
// Access it using this.$yourSettingsName (inside vue components)

export default (ctx, inject) => {
  const settings = {
    pathToIMG: '/images/',
    pathToIcons: '/images/icons/',

    colorRed: '#F25D61',
    colorBlack: '#1A1A1A',
    colorWhite: '#FAF5EF',
    colorTheme: '#FAF5EF'
  };
  inject('settings', settings);
};
