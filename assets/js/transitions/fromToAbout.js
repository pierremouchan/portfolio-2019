import { TimelineMax, Expo } from 'gsap';
// eslint-disable-next-line no-unused-vars
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
export const fromAbout = done => {
  const fromIndexTimeline = new TimelineMax({
    onComplete: () => {
      done();
    }
  });
  window.scrollTo(0, 0);
  fromIndexTimeline
    .addLabel('f1')
    .to(
      'h1',
      1,
      {
        y: '120%',
        transformOrigin: 'bottom left',
        rotation: 5,
        ease: Expo.easeIn
      },
      'f1'
    )
    .to(
      '.brief-container .description',
      1,

      {
        y: '120%',
        rotation: 5,
        transformOrigin: 'bottom left',
        ease: Expo.easeIn
      },
      'f1'
    )
    .to(
      '.glad-wrapper p',
      1,

      {
        y: '120%',
        rotation: 5,
        transformOrigin: 'bottom left',
        ease: Expo.easeIn
      },
      'f1'
    )
    .to(
      '.invit-scroll',
      0.5,
      { height: '0px', ease: Expo.easeIn },

      'f1'
    );
};

export const toAbout = () => {
  const toIndexTimeline = new TimelineMax();
  toIndexTimeline
    .addLabel('f1')
    .fromTo(
      'h1',
      2,

      {
        y: '120%',
        rotation: 5,
        transformOrigin: 'bottom left'
      },
      { y: '0%', rotation: 0, ease: Expo.easeOut },
      'f1'
    )
    .fromTo(
      '.brief-container .description',
      2,

      {
        y: '120%',
        rotation: 5,
        transformOrigin: 'bottom left'
      },
      { y: '0%', rotation: 0, ease: Expo.easeOut },
      'f1+=0.5'
    )
    .fromTo(
      '.glad-wrapper p',
      2,

      {
        y: '120%',
        rotation: 5,
        transformOrigin: 'bottom left'
      },
      { y: '0%', rotation: 0, ease: Expo.easeOut },
      'f1+=0.75'
    )
    .fromTo(
      '.invit-scroll',
      2,
      { height: '0px' },
      { height: '10vh', ease: Expo.easeOut },
      'f1+=0.75'
    );
};
