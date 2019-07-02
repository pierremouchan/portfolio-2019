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
    .addLabel('startAction2')
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
    )
    .to(
      '.title-container',
      1,
      { transformOrigin: 'top left', scaleY: 0, ease: Expo.easeIn },
      'startAction2'
    )
    .to(
      '.slider__frame-container img',
      1,
      {
        x: '-110%',
        ease: Expo.easeIn
      },
      'startAction2'
    )
    .to('h2', 0.5, { y: '-100%', ease: Expo.easeIn }, 'startAction2+=0.25')
    .to(
      '.slider__divider-bottom',
      1,
      { width: '0%', ease: Expo.easeIn },
      'startAction2+=0.25'
    )
    .to(
      'h3',
      0.5,
      { transformOrigin: 'top left', scaleY: 0, ease: Expo.easeIn },
      'startAction2+=0.5'
    )
    .to(
      '.title__separator',
      0.5,
      {
        transformOrigin: 'left bottom',
        scaleX: 0,
        ease: Expo.easeIn
      },
      'startAction2+=0.75'
    )
    .to(
      '.frame__info__desc',
      0.5,
      {
        y: '150%',
        ease: Expo.easeIn
      },
      'startAction2+=0.25'
    )
    .to(
      '.slider__numero',
      1,
      {
        transformOrigin: 'left bottom',
        scaleX: 0,
        ease: Expo.easeIn
      },
      'startAction2+=0.25'
    )
    .to(
      '.button-right',
      0.25,
      { transformOrigin: 'bottom left', scaleY: 0, ease: Expo.easeIn },
      'startAction2+='
    )
    .to(
      '.button-left',
      0.25,
      { transformOrigin: 'bottom left', scaleY: 0, ease: Expo.easeIn },
      'startAction2+='
    );
};

export const toIndex = () => {
  const toIndexTimeline = new TimelineMax({});
  toIndexTimeline
    .addLabel('startTo')
    .addLabel('startAction2', '+=0.5')
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
    )
    .to(
      '.title-container',
      1,
      { transformOrigin: 'top left', scaleY: 1, ease: Expo.easeOut },
      'startAction2'
    )
    .to(
      '.slider__frame-container img',
      2,
      {
        x: '0%',
        ease: Expo.easeOut
      },
      'startAction2'
    )
    .to('h2', 0.5, { y: '0%', ease: Expo.easeOut }, 'startAction2+=0.5')
    .to(
      '.slider__divider-bottom',
      1,
      { width: '100%', ease: Expo.easeOut },
      'startAction2+=0.25'
    )
    .to(
      'h3',
      0.5,
      { transformOrigin: 'top left', scaleY: 1, ease: Expo.easeOut },
      'startAction2+=0.5'
    )
    .to(
      '.title__separator',
      0.5,
      {
        transformOrigin: 'left bottom',
        scaleX: 1,
        ease: Expo.easeOut
      },
      'startAction2+=0.75'
    )
    .to(
      '.frame__info__desc',
      0.5,
      {
        y: '0%',
        ease: Expo.easeOut
      },
      'startAction2+=0.25'
    )
    .to(
      '.slider__numero',
      1,
      {
        transformOrigin: 'left bottom',
        scaleX: 1,
        ease: Expo.easeOut
      },
      'startAction2+=0.25'
    )
    .to(
      '.button-right',
      0.25,
      { transformOrigin: 'bottom left', scaleY: 1, ease: Expo.easeOut },
      'startAction2'
    )
    .to(
      '.button-left',
      0.25,
      { transformOrigin: 'bottom left', scaleY: 1, ease: Expo.easeOut },
      'startAction2'
    );
};
