export default function IntroGate({ onBegin }) {
  return (
    <section className="intro-scene">
      <div className="intro-backdrop" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">
        <p className="text-xs uppercase tracking-[0.6em] text-white/60">Evolutionary Transit</p>
        <h1 className="mt-6 text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-tight">
          You are about to travel 3.8 billion years back in time...
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/70">
          Scroll to move forward through deep time. The journey blends science with atmosphere.
        </p>
        <button type="button" className="intro-start-btn mt-10" onClick={onBegin}>
          Start
        </button>
      </div>
    </section>
  );
}
