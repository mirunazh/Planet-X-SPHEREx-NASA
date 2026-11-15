/**
 * Sky quests: three small goals that each teach one idea. Completion rules live
 * in applyEvent (src/lib/game/store.ts); this file holds only the words.
 */
export type QuestId = 'galaxy' | 'dust' | 'planets';

export interface Quest {
  title: string;
  /** What to do, shown while the quest is open. */
  task: string;
  /** What the player learned, shown once the quest is done. */
  takeaway: string;
}

export const QUEST_ORDER: QuestId[] = ['galaxy', 'dust', 'planets'];

export const QUESTS: Record<QuestId, Quest> = {
  galaxy: {
    title: 'Find a galaxy beyond the Milky Way',
    task: 'Visit a galaxy, such as Andromeda, from Places.',
    takeaway: 'Galaxies like Andromeda are millions of light-years away, far beyond the stars of our own galaxy.',
  },
  dust: {
    title: 'See through the dust',
    task: 'Pick another infrared color with the Telescope figurine.',
    takeaway: 'Each SPHEREx color shows different details. Longer colors see through more of the dust.',
  },
  planets: {
    title: 'Find a star with planets',
    task: 'Tap an orange dot on the sky.',
    takeaway: 'Orange dots mark stars with known planets. Most of those planets were detected indirectly, not photographed.',
  },
};
