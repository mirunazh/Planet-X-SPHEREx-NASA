import { describe, expect, it } from 'vitest';
import { describeView } from '@/lib/caption';
import type { Pin } from '@/lib/store';
import { galacticToRadec, radecToVec, type Vec3 } from '@/lib/sky/coords';
import { SURVEYS, SURVEY_ORDER, type SurveyId } from '@/lib/sky/surveys';

function target(id: string, name: string, ra: number, dec: number): Pin {
  return { id, kind: 'target', name, ra, dec, vec: radecToVec(ra, dec), fov: 1, targetKind: 'galaxy', description: '' };
}

const galactic = (l: number, b: number): Vec3 => {
  const { ra, dec } = galacticToRadec(l, b);
  return radecToVec(ra, dec);
};

const M31 = target('m31', 'Andromeda Galaxy (M31)', 10.6847929, 41.269065);
const NEP = target('north-ecliptic-pole', 'North Ecliptic Pole', 270, 66.560721);
const DEEP_NORTH = target('spherex-deep-north', 'SPHEREx Deep Field (north)', 270.4888, 66.3134);
const GALACTIC_CENTRE = target('galactic-centre', 'Galactic Centre', 266.40499, -28.93617);

const place = (center: Vec3, fov: number, targets: Pin[] = []) => describeView({ center, fov, surveyId: 'spherex', targets }).place;

describe('describeView place', () => {
  it('names a featured target near the view centre', () => {
    expect(place(radecToVec(10.9, 41.27), 1, [NEP, M31])).toBe('Andromeda Galaxy (M31)');
  });

  it('picks the nearest of several targets within reach', () => {
    expect(place(DEEP_NORTH.vec, 30, [NEP, DEEP_NORTH, M31])).toBe('SPHEREx Deep Field (north)');
    expect(place(NEP.vec, 30, [DEEP_NORTH, NEP])).toBe('North Ecliptic Pole');
  });

  it('reaches at least 0.5 degrees, and a quarter of the field of view when that is larger', () => {
    const twoDegreesAway = radecToVec(10.6847929, 43.269065);
    expect(place(radecToVec(10.6847929, 41.669065), 0.1, [M31])).toBe('Andromeda Galaxy (M31)');
    expect(place(twoDegreesAway, 4, [M31])).not.toBe('Andromeda Galaxy (M31)');
    expect(place(twoDegreesAway, 10, [M31])).toBe('Andromeda Galaxy (M31)');
  });

  it('names the Galactic Centre at the opening view when the target data includes it', () => {
    expect(place(radecToVec(266.40499, -28.93617), 60, [M31, GALACTIC_CENTRE])).toBe('Galactic Centre');
  });

  it('says "Along the Milky Way" at low galactic latitude without a target nearby', () => {
    expect(place(galactic(0, 0), 60)).toBe('Along the Milky Way');
    expect(place(galactic(120, 2), 5)).toBe('Along the Milky Way');
    expect(place(galactic(200, -9.9), 5)).toBe('Along the Milky Way');
    expect(place(galactic(120, 2), 5, [M31])).toBe('Along the Milky Way');
  });

  it('says "Away from the Milky Way" at high galactic latitude without a target nearby', () => {
    expect(place(galactic(0, 90), 60)).toBe('Away from the Milky Way');
    expect(place(galactic(250, -45), 5)).toBe('Away from the Milky Way');
    expect(place(galactic(30, 10.1), 5)).toBe('Away from the Milky Way');
  });
});

describe('describeView telescope', () => {
  const telescope = (surveyId: SurveyId) =>
    describeView({ center: galactic(0, 0), fov: 60, surveyId, targets: [] }).telescope;

  it('names SPHEREx in plain words, with the years it observed', () => {
    expect(telescope('spherex')).toBe('NASA SPHEREx · infrared, 2025–2026');
  });

  it('covers every registered survey with its short name', () => {
    for (const id of SURVEY_ORDER) {
      expect(telescope(id)).toContain(SURVEYS[id].shortName);
      expect(telescope(id)).toContain('· infrared, ');
    }
  });
});
