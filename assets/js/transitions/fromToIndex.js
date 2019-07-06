/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable require-await */
import { TimelineMax, Expo } from 'gsap';

export const fromIndex = done => {
  const fromIndexTimeline = new TimelineMax({
    onComplete: () => {
      done();
    }
  });
};

export const toIndex = () => {
  const toIndexTimeline = new TimelineMax({});
  toIndexTimeline
    .addLabel('f1')
    .fromTo('#sun', 2, { y: '300%' }, { y: '-50%', ease: Expo.easeOut })
    .fromTo(
      '.title h2',
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
      '.title-outline div',
      2,
      {
        y: '150%',
        rotation: 5,
        transformOrigin: 'bottom left'
      },
      { y: '0%', rotation: 0, ease: Expo.easeOut },
      'f1+=0.5'
    );
};
