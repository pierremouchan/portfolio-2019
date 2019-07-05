import { TimelineMax, Expo } from 'gsap';

export const fromAbout = done => {
  const fromIndexTimeline = new TimelineMax({
    onComplete: () => {
      done();
    }
  });
  fromIndexTimeline.add();
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
    );
};
