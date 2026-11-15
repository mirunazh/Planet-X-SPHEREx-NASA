/** Screens that have a "What you're seeing" help panel. */
export type HelpScreenId = 'navigator' | 'intro' | 'compare' | 'challenge';

/** One stop of the guided tour ("Show me on the screen"). */
export interface HelpStep {
  /** Value of the `data-tour` attribute on the element this step points at. */
  tour: string;
  title: string;
  text: string;
}

export interface HelpSource {
  label: string;
  /** Always an https URL that is already cited elsewhere in this repository. */
  url: string;
}

export interface HelpScreen {
  id: HelpScreenId;
  /** Short name of the screen, shown above the help text. */
  title: string;
  science: { paragraphs: string[]; sources: HelpSource[] };
  steps: HelpStep[];
}

export interface GlossaryEntry {
  term: string;
  definition: string;
}
