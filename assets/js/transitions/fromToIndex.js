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
};

export const toIndex = () => {
  const toIndexTimeline = new TimelineMax({});
};
