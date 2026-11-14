'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { TextInput } from '@astryxdesign/core/TextInput';
import { resolvePosition, watchHref, type Resolution } from '@/lib/resolve';
import { parseCoords } from '@/lib/sky';
import { S } from '@/lib/strings';
import { MoverBanner } from './MoverBanner';

const CHALLENGE = '08h55m10.831s -07d14m42.53s';

export function CoordForm() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<Resolution | null>(null);

  const submit = async (value = text) => {
    setRes(null);
    const r = parseCoords(value);
    if (!r.ok) return setError(S[r.error]);
    setError(null);
    setBusy(true);
    try {
      const resolution = await resolvePosition(r.ra, r.dec);
      // A known object crossed this spot: explain first. Otherwise go straight to the images.
      if (resolution.hits.length) setRes(resolution);
      else router.push(watchHref(resolution.mission?.id ?? null, r.ra, r.dec));
    } catch (e) {
      setError(`${S.loadFailed} ${String(e)}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="lookup">
      <form
        className="coord-form"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <div className="coord-row">
          <TextInput
            label={S.coordLabel}
            description={S.coordHelp}
            placeholder={S.coordPlaceholder}
            value={text}
            onChange={(v) => setText(v)}
            status={error ? { type: 'error', message: error } : undefined}
            hasSpellCheck={false}
            autoComplete="off"
            width="100%"
          />
          <Button label={S.coordSubmit} type="submit" variant="primary" isLoading={busy} />
        </div>
        <Button
          label={S.tryChallenge(CHALLENGE)}
          variant="ghost"
          onClick={() => {
            setText(CHALLENGE);
            void submit(CHALLENGE);
          }}
        >
          {S.tryChallengeShort} <span className="data">{CHALLENGE}</span>
        </Button>
      </form>
      {busy && <Banner status="info" title={S.searching} />}
      {res && <MoverBanner res={res} />}
    </div>
  );
}
