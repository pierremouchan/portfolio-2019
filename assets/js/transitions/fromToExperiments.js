import { TimelineMax, Expo } from 'gsap';
export const fromExperiments = done => {
  const fromExperimentsTimeline = new TimelineMax({
    onComplete: () => {
      done();
    }
  });
  window.scrollTo(0, 0);
  fromExperimentsTimeline
    .addLabel('f1+=0.5')
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
    .staggerTo(
      '.insta-img',
      0.5,
      {
        opacity: 0,
        stagger: 0.1
      },
      'f1'
    );
};

export const toExperiments = () => {
  const toExperimentsTimeline = new TimelineMax();
  toExperimentsTimeline
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
