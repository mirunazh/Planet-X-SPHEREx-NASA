// The shot list. Order = array order. Retime a shot by editing its `dur` (one line);
// every later shot's `start` moves with it. Durations must be whole frames at 60 fps.
// Captions: at most 8 words, rendered by the scenes themselves.

export const FPS = 60;
export const W = 1920;
export const H = 1080;
export const MAX_SECONDS = 30;

// One variable each. Change here, re-render shot s9.
export const vars = {
  url: 'tombaugh.example.org',            // placeholder until the public URL exists
  musicCredit: 'Music: original sound by the team', // edit if a licensed track is added
};

const list = [
  { id: 's1', scene: 'blink', dur: 3.0, caption: '1930. One dot moved.' },
  { id: 's2', scene: 'tombaugh', dur: 3.0, caption: 'Age 24. He found Pluto.' },
  { id: 'bridge', scene: 'bridge', dur: 1.5, caption: "Today, NASA's SPHEREx maps the whole sky." },
  { id: 's3', scene: 'placeholder', dur: 2.0, caption: 'Type any patch of sky.', note: 'Real app: cursor types WISE 0855 coordinates, sky tile zooms in' },
  { id: 's4', scene: 'placeholder', dur: 4.5, caption: 'It moved. Here it is now.', note: 'Real app: SPHEREx frames blink, ring locks on WISE 0855, 2010 position to now' },
  { id: 's5', scene: 'placeholder', dur: 4.0, caption: 'Click twice. Measure its motion.', note: 'Real app: two clicks in two epochs, measured motion beside the true value' },
  { id: 's6', scene: 'placeholder', dur: 4.0, caption: 'Distance and speed. From NASA data.', note: 'Real app: parallax slider fits the points, distance and speed beside true values' },
  { id: 's7', scene: 'placeholder', dur: 3.5, caption: 'Five real stars. One click each.', note: 'Real app: five target cards, one click each to its movie' },
  { id: 's8', scene: 'placeholder', dur: 2.0, caption: 'Open to everyone. Free.', note: 'Real app: browser and phone, link in the address bar, no login' },
  { id: 's9', scene: 'endcard', dur: 2.5, caption: 'Find the next Tombaugh.' },
];

let t = 0;
export const shots = list.map((s, i) => {
  const frames = Math.round(s.dur * FPS);
  if (Math.abs(frames - s.dur * FPS) > 1e-6) throw new Error(`${s.id}: dur ${s.dur} is not a whole number of frames`);
  if (s.caption.split(/\s+/).length > 8) throw new Error(`${s.id}: caption over 8 words`);
  if (/\u2014/.test(s.caption)) throw new Error(`${s.id}: em dash in caption`);
  const shot = { ...s, n: i + 1, start: +t.toFixed(4), frames };
  t += s.dur;
  return shot;
});

export const outputs = {
  proof: ['s1', 's2', 'bridge', 's9'],
  'timeline-30s': shots.map((s) => s.id),
};

export const byId = Object.fromEntries(shots.map((s) => [s.id, s]));
