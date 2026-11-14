import { S } from '@/lib/strings';

export function Footer() {
  return (
    <footer className="footer">
      <p>
        <strong>{S.footerNoEndorse}</strong> {S.footerData} {S.footerMovers}
      </p>
      <p>{S.footerChallenge}</p>
    </footer>
  );
}
