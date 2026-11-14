import { CoordForm } from '@/components/CoordForm';
import { TargetCards } from '@/components/TargetCards';
import { TopBar } from '@/components/TopBar';
import { S } from '@/lib/strings';

export default function Home() {
  return (
    <>
      <TopBar />
      <main className="landing">
        <section className="hero">
          <h1>{S.pitch}</h1>
          <div className="hero-body">
            <p>{S.pitchBody}</p>
            <CoordForm />
          </div>
        </section>
        <TargetCards />
      </main>
    </>
  );
}
