/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable require-await */
import { TimelineMax } from 'gsap';

export const fromProject = done => {
  const fromProjectTimeline = new TimelineMax({
    paused: true,
    onComplete: () => {
      done();
    }
  });
  const scrollTop = new Promise(resolve => resolve(window.scrollTo(0, 0)));
  scrollTop.then(fromProjectTimeline.play());
  fromProjectTimeline
    .addLabel('f1')
    .to(
      ['.hscroll', '.hscroll-reverse'],
      1.5,
      {
        y: '150%',
        transformOrigin: 'bottom left',
        rotate: 5,
        ease: Expo.easeIn
      },
      'f1'
    )
    .to('.main-quote blockquote', 2, { y: '120%', transformOrigin: 'bottom left', rotate: 5, ease: Expo.easeIn }, 'f1');
};

export const toProject = () => {
  const toProjectTimeline = new TimelineMax({});
  toProjectTimeline
    .addLabel('f1')
    .fromTo(
      ['.hscroll', '.hscroll-reverse'],
      1.5,
      {
        y: '150%',
        transformOrigin: 'bottom left',
        rotate: 5
      },
      {
        y: '0%',
        rotate: 0,
        ease: Expo.easeOut
      },
      'f1'
    )
    .fromTo(
      '.main-quote blockquote',
      1,
      { y: '120%', transformOrigin: 'bottom left', rotate: 5 },
      { y: '0%', rotate: 0, ease: Expo.easeOut },
      'f1'
    );
};
