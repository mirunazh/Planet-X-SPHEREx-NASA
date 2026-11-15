'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { Sheet } from '@/components/ui/Sheet';
import { GLOSSARY, HELP, type HelpScreenId } from '@/content/help';
import styles from './WhatYoureSeeing.module.css';

type Tab = 'science' | 'steps';

const TABS: { id: Tab; label: string }[] = [
  { id: 'science', label: 'The science' },
  { id: 'steps', label: 'Step by step' },
];

/**
 * "What you're seeing": the science behind the current screen, its sources and a glossary,
 * plus a numbered walk-through that can be shown on the page itself (onStartTour).
 * The caller should close this sheet when it starts the tour, so the tour can point at everything.
 */
export function WhatYoureSeeing({
  screen,
  open,
  onClose,
  onStartTour,
  contextLine,
}: {
  screen: HelpScreenId;
  open: boolean;
  onClose: () => void;
  onStartTour: () => void;
  /** One line about the current view, for example "Right now: Center of the Milky Way · SPHEREx". */
  contextLine?: string;
}) {
  const [tab, setTab] = useState<Tab>('science');
  const baseId = useId();
  const tabRefs = useRef<Partial<Record<Tab, HTMLButtonElement | null>>>({});
  const help = HELP[screen];
  const tabId = (id: Tab) => `${baseId}-tab-${id}`;
  const panelId = (id: Tab) => `${baseId}-panel-${id}`;

  // Tabs pattern: arrow keys move between the two segments, Home and End jump to the ends.
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const current = TABS.findIndex((item) => item.id === tab);
    let next: number | null = null;
    if (event.key === 'ArrowRight') next = (current + 1) % TABS.length;
    else if (event.key === 'ArrowLeft') next = (current - 1 + TABS.length) % TABS.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = TABS.length - 1;
    if (next === null) return;
    // Keep these keys away from the sky's keyboard shortcuts (Home resets the view).
    event.preventDefault();
    event.stopPropagation();
    const id = TABS[next].id;
    setTab(id);
    tabRefs.current[id]?.focus();
  };

  return (
    <Sheet
      open={open}
      onClose={onClose}
      side="right"
      title="What you're seeing"
      footer={
        tab === 'steps' ? (
          <button type="button" className={styles.primary} onClick={onStartTour}>
            Show me on the screen
          </button>
        ) : undefined
      }
    >
      <p className={styles.eyebrow}>{help.title}</p>

      <div role="tablist" aria-label="How to read this screen" className={styles.segmented} data-active={tab}>
        {TABS.map((item) => (
          <button
            key={item.id}
            ref={(node) => {
              tabRefs.current[item.id] = node;
            }}
            type="button"
            role="tab"
            id={tabId(item.id)}
            aria-selected={tab === item.id}
            aria-controls={panelId(item.id)}
            tabIndex={tab === item.id ? 0 : -1}
            className={styles.segment}
            onClick={() => setTab(item.id)}
            onKeyDown={onTabKeyDown}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={panelId('science')}
        aria-labelledby={tabId('science')}
        hidden={tab !== 'science'}
        tabIndex={0}
        className={styles.panel}
      >
        {contextLine && <p className={styles.context}>{contextLine}</p>}
        {help.science.paragraphs.map((paragraph) => (
          <p key={paragraph} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}

        {help.science.sources.length > 0 && (
          <section aria-labelledby={`${baseId}-sources`}>
            <h3 id={`${baseId}-sources`} className={styles.sectionTitle}>
              Sources
            </h3>
            <ul role="list" className={styles.sources}>
              {help.science.sources.map((source) => (
                <li key={source.url}>
                  <a className={styles.sourceLink} href={source.url} target="_blank" rel="noreferrer">
                    <span className={styles.sourceLabel}>{source.label}</span>
                    <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <details className={styles.glossary}>
          <summary>Words explained</summary>
          <dl className={styles.terms}>
            {GLOSSARY.map((entry) => (
              <div key={entry.term}>
                <dt>{entry.term}</dt>
                <dd>{entry.definition}</dd>
              </div>
            ))}
          </dl>
        </details>
      </div>

      <div
        role="tabpanel"
        id={panelId('steps')}
        aria-labelledby={tabId('steps')}
        hidden={tab !== 'steps'}
        tabIndex={0}
        className={styles.panel}
      >
        <ol role="list" className={styles.steps}>
          {help.steps.map((step, index) => (
            <li key={step.tour} className={styles.step}>
              <span className={styles.number} aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <p className={styles.stepTitle}>{step.title}</p>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Sheet>
  );
}
