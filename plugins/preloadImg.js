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
      /\.(png|jpe?g)$|.(\/)\.(png|jpe?g)$/
    )
  );

  console.log('cacheImages -> ', cacheImages);
  inject('cacheImages', cacheImages);
};
