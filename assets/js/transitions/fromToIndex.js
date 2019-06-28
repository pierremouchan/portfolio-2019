/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable require-await */
import { TimelineMax } from 'gsap';

export const fromIndex = done => {
  const fromIndexTimeline = new TimelineMax({
    onComplete: () => {
      done();
    }
  });
  fromIndexTimeline
    .addLabel('startFrom')
    .fromTo(
      '.project-name p',
      1.5,
      { x: '0%' },
      { x: '100%', ease: Expo.easeInOut },
      'startFrom'
    )
    .fromTo(
      '.project-name-duplicated p',
      1.5,
      { x: '0%' },
      { x: '-100%', ease: Expo.easeInOut },
      'startFrom'
    );
};

export const toIndex = () => {
  const toIndexTimeline = new TimelineMax({});
  toIndexTimeline
    .addLabel('startTo')
    .fromTo(
      '.project-name p',
      1.5,
      { x: '100%' },
      { x: '0%', ease: Expo.easeInOut },
      'startTo'
    )
    .fromTo(
      '.project-name-duplicated p',
      1.5,
      { x: '-100%' },
      { x: '0%', ease: Expo.easeInOut },
      'startTo'
    );
};
