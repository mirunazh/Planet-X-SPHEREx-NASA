'use client';

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Sheet } from '@/components/ui/Sheet';
import { LayerStatus } from '@/components/hud/LayerStatus';
import { useNav } from '@/lib/store';
import { SURVEYS } from '@/lib/sky/surveys';
import { ColorTool } from './ColorTool';
import { LayersTool } from './LayersTool';
import { LightTool } from './LightTool';
import styles from './SkyEditor.module.css';

export type EditorTool = 'color' | 'light' | 'layers';

/** Same round button for every tool; the emoji tells them apart (as in the figurine dock). */
const TOOLS: { id: EditorTool; label: string; emoji: string; Panel: () => ReactNode }[] = [
  { id: 'color', label: 'Color', emoji: '🌈', Panel: ColorTool },
  { id: 'light', label: 'Light', emoji: '🔆', Panel: LightTool },
  { id: 'layers', label: 'Layers', emoji: '🗺️', Panel: LayersTool },
];

/**
 * The friendly Telescope sheet: the same information and controls as the expert
 * LayerPanel, organised like the iOS Photos editor. A row of round tools on top and,
 * below it, only the selected tool's control. The telescope is always SPHEREx (the
 * project's scope), so there is no telescope picker and the sheet opens on its colors.
 */
export function SkyEditor({ open, onClose, initialTool = 'color' }: { open: boolean; onClose: () => void; initialTool?: EditorTool }) {
  const [tool, setTool] = useState<EditorTool>(initialTool);
  const [opened, setOpened] = useState({ open, initialTool });

  // Every time the sheet opens (or is reopened on another tool) start on initialTool.
  if (opened.open !== open || opened.initialTool !== initialTool) {
    setOpened({ open, initialTool });
    if (open) setTool(initialTool);
  }

  // Sheet refocuses itself whenever onClose changes identity, so hand it a stable one.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);
  const close = useCallback(() => onCloseRef.current(), []);

  return (
    <Sheet open={open} onClose={close} title="Telescope" side="bottom" footer={<ImageSource />}>
      <ToolPicker tool={tool} onSelect={setTool} />
    </Sheet>
  );
}

function ToolPicker({ tool, onSelect }: { tool: EditorTool; onSelect: (tool: EditorTool) => void }) {
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const adjusted = useNav((s) => s.gain !== 1);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = TOOLS.findIndex((t) => t.id === tool);
    let next: number;
    if (event.key === 'ArrowRight') next = (current + 1) % TOOLS.length;
    else if (event.key === 'ArrowLeft') next = (current - 1 + TOOLS.length) % TOOLS.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = TOOLS.length - 1;
    else return;
    event.preventDefault();
    // The sky treats Home on a button as "reset view"; keep the key inside the tool row.
    event.stopPropagation();
    onSelect(TOOLS[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <>
      <div className={styles.tools} role="tablist" aria-label="Telescope tools" onKeyDown={onKeyDown}>
        {TOOLS.map(({ id: toolId, label, emoji }, index) => {
          const selected = toolId === tool;
          return (
            <button key={toolId} ref={(el) => { tabs.current[index] = el; }} type="button" role="tab" className={styles.tool}
              id={`${id}-tab-${toolId}`} aria-selected={selected} aria-controls={`${id}-panel-${toolId}`} tabIndex={selected ? 0 : -1}
              onClick={() => onSelect(toolId)}>
              <span className={styles.circle}>
                <span className={styles.emoji} aria-hidden="true">{emoji}</span>
                {toolId === 'light' && adjusted && <span className={styles.adjusted} />}
              </span>
              <span className={styles.label}>
                {label}
                {toolId === 'light' && adjusted && <span className="sr-only"> (adjusted)</span>}
              </span>
            </button>
          );
        })}
      </div>
      {/* All panels share one grid cell, so the sheet keeps the height of the tallest and the tool row never jumps. */}
      <div className={styles.stage}>
        {TOOLS.map(({ id: toolId, Panel }) => {
          const selected = toolId === tool;
          return (
            <div key={toolId} role="tabpanel" id={`${id}-panel-${toolId}`} aria-labelledby={`${id}-tab-${toolId}`}
              className={`${styles.pane} ${selected ? styles.paneOn : ''}`} inert={!selected}>
              <Panel />
            </div>
          );
        })}
      </div>
    </>
  );
}

/** LayerStatus plus the image source line, built exactly as in the expert LayerPanel. */
function ImageSource() {
  const displayed = useNav((s) => s.displayedLayer);
  const imageSurvey = displayed ? SURVEYS[displayed.surveyId] : null;

  return (
    <div className={styles.footer}>
      <LayerStatus />
      {imageSurvey && (
        <div className="image-source small">
          <p>Images: <a href={imageSurvey.credits[0].url} target="_blank" rel="noreferrer">{imageSurvey.shortName}</a> via <a href="https://irsa.ipac.caltech.edu/" target="_blank" rel="noreferrer">NASA/IPAC IRSA</a></p>
          <p className="muted">Observed {imageSurvey.epoch} · map pixel {imageSurvey.pixelScaleArcsec}″</p>
        </div>
      )}
    </div>
  );
}
