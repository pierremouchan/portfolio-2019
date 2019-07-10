import { TimelineMax, Expo, TweenMax } from 'gsap';
const InstaFeedJS = require('instafeed.js');
export const instagramFeed = new InstaFeedJS({
  get: 'user',
  userId: 6037719929,
  accessToken: '6037719929.efbffc2.a6ba9bb2b1eb4d44970cbc70cb379da6',
  resolution: 'standard_resolution',
  filter: function(element) {
    if (element.tags.indexOf('exp') >= 0) {
      document.querySelector('#instafeed').innerHTML += `<div class="insta-img">
            <div class="insta-img__mask"></div>
                <a href="${element.link}" target="_blank">
                    <img src="${element.images.standard_resolution.url}" alt="${element.caption.text}"/>
               </a>
        </div>`;
    }
  },
  success: function() {
    setTimeout(() => {
      const instaRevealTimeline = new TimelineMax({});
      instaRevealTimeline
        .staggerTo('.insta-img', 0.5, { opacity: 1 }, 0.1)
        .addLabel('f1')
        .staggerTo(
          '.insta-img__mask',
          0.5,
          {
            transformOrigin: 'right bottom',
            scaleX: 0,
            ease: Expo.easeInOut,
            stagger: 0.1
          },
          'f1'
        )
        .fromTo(
          '.insta-img img',
          0.5,
          { scale: 1.3, rotation: 5, transformOrigin: 'center center' },
          { scale: 1, rotation: 0, clearProps: 'all', ease: Expo.easeInOut },
          'f1+=0.25'
        );
    });
  },
  error: function() {
    alert('Error from the instagram API.');
  }
});
