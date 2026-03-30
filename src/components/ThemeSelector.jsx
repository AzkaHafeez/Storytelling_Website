import { useState } from 'react';

const themes = [
  {
    id: 'dark-academia',
    name: 'Dark / Mysterious',
    sub: 'Ancient Unknowns',
    desc: 'Deep shadows, cinematic contrast, and the quiet tension of life before light.',
    preview: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1600',
    color: '#8c2f39'
  },
  {
    id: 'mythic-earth',
    name: 'Mythic / Earthborn',
    sub: 'Basalt & Moss',
    desc: 'Warm clay, mossy greens, and hand-drawn texture with weighty, deliberate motion.',
    preview: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600',
    color: '#b8744b'
  },
  {
    id: 'bioluminescent',
    name: 'Bioluminescent / Deep Sea',
    sub: 'Teal & Indigo',
    desc: 'Neon accents beneath the waves with soft glow pulses and rounded typography.',
    preview: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=1600',
    color: '#2dd4bf'
  }
];

export default function ThemeSelector({ onSelect }) {
  const [activeTheme, setActiveTheme] = useState(themes[0]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {themes.map((theme) => (
        <div
          key={theme.id}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{
            backgroundImage: `url(${theme.preview})`,
            opacity: activeTheme.id === theme.id ? 0.45 : 0,
            filter: 'grayscale(100%)'
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/70 to-black" />

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-12 md:px-16">
        <div className="max-w-xl space-y-4">
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">Choose a world</p>
          <h2 className="text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-tight">
            Evolution is the same story, told in different realities.
          </h2>
          <p className="text-base text-white/70">
            Each theme reshapes the atmosphere, typography, and motion language of the journey.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              onMouseEnter={() => setActiveTheme(theme)}
              onFocus={() => setActiveTheme(theme)}
              onClick={() => onSelect(theme.id)}
              className={`theme-card ${activeTheme.id === theme.id ? 'theme-card-active' : ''}`}
            >
              <div className="theme-swatch" style={{ backgroundColor: theme.color }} />
              <div className="text-xs uppercase tracking-[0.4em] text-white/60">{theme.sub}</div>
              <h3 className="mt-2 text-xl font-semibold text-white">{theme.name}</h3>
              <p className="mt-3 text-sm text-white/70">{theme.desc}</p>
            </button>
          ))}
        </div>

        <div className="text-xs uppercase tracking-[0.4em] text-white/40">
          Click a theme to begin
        </div>
      </div>
    </section>
  );
}
