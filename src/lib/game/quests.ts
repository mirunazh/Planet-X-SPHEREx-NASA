/**
 * Sky quests: three small goals that each teach one idea. Completion rules live
 * in applyEvent (src/lib/game/store.ts); this file holds only the words.
 */
export type QuestId = 'galaxy' | 'dust' | 'deep-field';

export interface Quest {
  title: string;
  /** What to do, shown while the quest is open. */
  task: string;
  /** What the player learned, shown once the quest is done. */
  takeaway: string;
}

export const QUEST_ORDER: QuestId[] = ['galaxy', 'dust', 'deep-field'];

export const QUESTS: Record<QuestId, Quest> = {
  galaxy: {
    title: 'Find a galaxy beyond the Milky Way',
    task: 'Visit a galaxy, such as Andromeda, from Places.',
    takeaway: 'Galaxies like Andromeda are millions of light-years away, far beyond the stars of our own galaxy.',
  },
  dust: {
    title: 'Explore another SPHEREx color',
    task: 'Choose another infrared color in the Telescope panel.',
    takeaway: 'SPHEREx sees different infrared wavelengths, revealing different details in the same sky.',
  },
  'deep-field': {
    title: 'Visit a SPHEREx deep field',
    task: 'Visit a SPHEREx deep field from Places.',
    takeaway: 'SPHEREx observes its deep fields repeatedly, building up more coverage of those regions.',
  },
};
