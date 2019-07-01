export default (ctx, inject) => {
  const cacheImages = {
    imageArray: []
  };

  function importAll(r) {
    r.keys().forEach(key => cacheImages.imageArray.push(r(key)));
  }

  importAll(
    require.context(
      '../static/images/',
      true,
      /\.(png|jpe?g|gif)$|.(\/)\.(png|jpe?g|gif)$/
    )
  );

  console.log('cacheImages -> ', cacheImages);
  inject('cacheImages', cacheImages);
};
