'use client';

/**
 * Settings & details, grouped like iOS Settings. The simple navigator shows little at once;
 * every expert control and fact of the full HUD stays reachable here, reused as is.
 */
import { type Dispatch, type ReactNode, type SetStateAction, useEffect, useId, useRef, useState } from 'react';
import { Sheet } from '@/components/ui/Sheet';
import { CoordinateReadout } from '@/components/hud/CoordinateReadout';
import { CopyButton } from '@/components/hud/CopyButton';
import { Dock } from '@/components/hud/Dock';
import { SidePanel } from '@/components/hud/SidePanel';
import { useNav } from '@/lib/store';
import { useUi } from '@/lib/ui';
import { buildViewUrl } from '@/lib/urlState';
import { LOCK_MAX_FOV } from '@/lib/sky/view';
import styles from './SettingsSheet.module.css';

interface SettingsSheetProps {
  open: boolean;
  onClose: () => void;
  onUnlockAll?: () => void;
  onResetProgress?: () => void;
  onReplayIntro?: () => void;
}

const CONFIRM_MS = 5000;
const CONFIRM_TEXT = 'Tap again within 5 seconds to clear your game progress.';

function Section({ title, note, children }: { title: string; note?: ReactNode; children: ReactNode }) {
  const id = useId();
  return (
    <section className={styles.section} aria-labelledby={id}>
      <h3 id={id} className={styles.sectionTitle}>
        {title}
      </h3>
      {children}
      {note}
    </section>
  );
}

function RowButton({
  children,
  onClick,
  tone = 'plain',
  chevron = false,
  opensDialog = false,
}: {
  children: ReactNode;
  onClick: () => void;
  tone?: 'plain' | 'action';
  chevron?: boolean;
  opensDialog?: boolean;
}) {
  return (
    <button type="button" className={`${styles.row} ${tone === 'action' ? styles.action : ''}`} aria-haspopup={opensDialog ? 'dialog' : undefined} onClick={onClick}>
      <span className={styles.rowLabel}>{children}</span>
      {chevron && (
        <span className={styles.chevron} aria-hidden="true">
          ›
        </span>
      )}
    </button>
  );
}

/** Destructive, so it asks for a second tap; it disarms after a few seconds or when focus leaves. */
function ResetRow({ onReset, setStatus }: { onReset: () => void; setStatus: Dispatch<SetStateAction<string>> }) {
  const [armed, setArmed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const disarm = () => {
    clearTimeout(timer.current);
    setArmed(false);
    setStatus((text) => (text === CONFIRM_TEXT ? '' : text));
  };

  return (
    <button
      type="button"
      className={`${styles.row} ${styles.danger}`}
      data-armed={armed ? 'true' : undefined}
      onBlur={() => {
        if (armed) disarm();
      }}
      onClick={() => {
        if (!armed) {
          setArmed(true);
          setStatus(CONFIRM_TEXT);
          clearTimeout(timer.current);
          timer.current = setTimeout(disarm, CONFIRM_MS);
          return;
        }
        clearTimeout(timer.current);
        setArmed(false);
        onReset();
        setStatus('Your progress was reset.');
      }}
    >
      <span className={styles.rowLabel}>{armed ? 'Tap again to confirm' : 'Reset my progress'}</span>
    </button>
  );
}

function SettingsContent({ onClose, onUnlockAll, onResetProgress, onReplayIntro }: Omit<SettingsSheetProps, 'open'>) {
  const hasDetails = useNav((s) => s.selected !== null || s.locked !== null);
  const expertLayout = useUi((s) => s.expertLayout);
  const [gameStatus, setGameStatus] = useState('');
  const layoutNoteId = useId();
  const showGame = Boolean(onUnlockAll || onResetProgress || onReplayIntro);

  return (
    <div className={styles.root} data-tour="settings-sheet">
      <Section
        title="Where you are"
        note={
          <p className={styles.note}>
            RA and Dec locate the centre of the screen on the sky, like longitude and latitude on Earth; l and b measure the same point from the Milky Way. FOV is
            the height of sky on screen, and ± is how precise the position is.
          </p>
        }
      >
        <div className={`${styles.group} ${styles.readoutGroup}`}>
          <CoordinateReadout />
        </div>
      </Section>

      <Section title="Map and target">
        <div className={`${styles.group} ${styles.mapGroup}`}>
          <div className={styles.cell}>
            <Dock />
          </div>
          <div className={styles.cell}>
            {hasDetails ? (
              <SidePanel />
            ) : (
              <p className={styles.empty}>
                No place selected. Pick one in Places, or zoom to {LOCK_MAX_FOV}° and lock a target. Its details appear here.
              </p>
            )}
          </div>
        </div>
      </Section>

      <Section title="Share" note={<p className={styles.note}>The link reopens this position, zoom and sky layer. It does not restore a target lock.</p>}>
        <div className={`${styles.group} ${styles.shareGroup}`}>
          <CopyButton label="Copy link to this view" text={() => buildViewUrl(useNav.getState(), window.location.href)} />
        </div>
      </Section>

      <Section title="Help and sources">
        <div className={styles.group}>
          <RowButton chevron opensDialog onClick={() => useNav.getState().setPanel('help')}>
            Keyboard and help
          </RowButton>
          <RowButton chevron opensDialog onClick={() => useNav.getState().setPanel('credits')}>
            Data sources and credits
          </RowButton>
        </div>
      </Section>

      <Section
        title="Layout"
        note={
          <p id={layoutNoteId} className={styles.note}>
            Shows every panel of the full navigator at once: layers, places, map, coordinates and details.
          </p>
        }
      >
        <div className={styles.group}>
          <button
            type="button"
            role="switch"
            aria-checked={expertLayout}
            aria-describedby={layoutNoteId}
            className={`${styles.row} ${styles.switchRow}`}
            onClick={() => useUi.getState().setExpertLayout(!expertLayout)}
          >
            <span className={styles.rowLabel}>Expert layout — every control at once</span>
            <span className={styles.switch} aria-hidden="true" />
          </button>
        </div>
      </Section>

      {showGame && (
        <Section
          title="Game"
          note={
            <p className={styles.note} role="status">
              {gameStatus}
            </p>
          }
        >
          <div className={styles.group}>
            {onUnlockAll && (
              <RowButton
                tone="action"
                onClick={() => {
                  onUnlockAll();
                  setGameStatus('All figurines are unlocked.');
                }}
              >
                Unlock all figurines
              </RowButton>
            )}
            {onResetProgress && <ResetRow onReset={onResetProgress} setStatus={setGameStatus} />}
            {onReplayIntro && (
              <RowButton
                tone="action"
                onClick={() => {
                  onClose();
                  onReplayIntro();
                }}
              >
                Replay the intro
              </RowButton>
            )}
          </div>
        </Section>
      )}
    </div>
  );
}

export function SettingsSheet({ open, onClose, onUnlockAll, onResetProgress, onReplayIntro }: SettingsSheetProps) {
  return (
    <Sheet open={open} onClose={onClose} title="Settings & details" side="right">
      <SettingsContent onClose={onClose} onUnlockAll={onUnlockAll} onResetProgress={onResetProgress} onReplayIntro={onReplayIntro} />
    </Sheet>
  );
}
