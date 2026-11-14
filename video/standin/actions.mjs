// Action script for capture.mjs. Copy this file for the real app and change url + selectors.
export default {
  url: 'http://127.0.0.1:3200/video/standin/index.html',
  ready: 'body[data-ready]',  // wait for this selector before frame 0 (data loaded)
  dsf: 2,                     // capture at 2x so zoomed regions stay sharp
  cursor: [1100, 760],        // cursor start position (CSS px)
  actions: [
    { wait: 0.4 },
    { move: '#coords', dur: 0.7 },
    { click: true },
    { type: '331.0441 -56.7828', cps: 16 },
    { move: '#go', dur: 0.5 },
    { click: true },
    { wait: 0.5 },
    { zoom: { selector: '#sky', pad: 30 }, dur: 0.8 },
    { wait: 1.6 },
  ],
};
