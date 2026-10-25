/** Temporary CSS/SVG landing backdrop until art assets are added. */
export function LandingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,#4a1d6e_0%,#1a0b2e_45%,#0d0618_100%)]" />

      {/* Moon */}
      <div className="animate-soft-glow absolute left-1/2 top-[12%] h-36 w-36 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff8e1_0%,#f2e9c9_40%,#e8c87a_100%)] opacity-90 shadow-[0_0_60px_rgba(242,233,201,0.55)]" />
      <div className="absolute left-[calc(50%+18px)] top-[14%] h-28 w-28 -translate-x-1/2 rounded-full bg-[#1a0b2e]/35 blur-[1px]" />

      {/* Stars */}
      <div className="absolute left-[18%] top-[18%] h-1 w-1 rounded-full bg-white/80" />
      <div className="absolute left-[72%] top-[22%] h-1.5 w-1.5 rounded-full bg-white/70" />
      <div className="absolute left-[28%] top-[30%] h-1 w-1 rounded-full bg-white/60" />
      <div className="absolute right-[20%] top-[16%] h-1 w-1 rounded-full bg-white/75" />

      {/* Wisteria / blossoms (top frame) */}
      <svg
        className="absolute left-0 top-0 w-full opacity-80"
        viewBox="0 0 390 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0 C40 40 55 90 70 140 C85 90 100 40 120 0 Z"
          fill="#6b3a8c"
          opacity="0.85"
        />
        <path
          d="M40 0 C70 50 85 100 95 160 C110 100 130 45 160 0 Z"
          fill="#8b4fa8"
          opacity="0.7"
        />
        <path
          d="M230 0 C260 45 280 100 295 155 C310 95 330 40 360 0 Z"
          fill="#6b3a8c"
          opacity="0.8"
        />
        <path
          d="M280 0 C310 55 325 105 340 165 C355 100 370 40 390 0 Z"
          fill="#8b4fa8"
          opacity="0.75"
        />
        <circle cx="78" cy="70" r="7" fill="#c47ab0" />
        <circle cx="95" cy="100" r="6" fill="#d6a0c4" />
        <circle cx="300" cy="80" r="7" fill="#c47ab0" />
        <circle cx="320" cy="110" r="5" fill="#d6a0c4" />
      </svg>

      {/* Distant pavilion silhouette */}
      <svg
        className="absolute bottom-[28%] left-1/2 w-[70%] -translate-x-1/2 opacity-50"
        viewBox="0 0 280 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 70 L70 40 L140 55 L210 35 L260 65 L260 90 L20 90 Z"
          fill="#12081f"
        />
        <path d="M90 55 L140 20 L190 55" stroke="#2a1450" strokeWidth="4" />
        <rect x="120" y="55" width="40" height="35" fill="#0d0618" />
      </svg>

      {/* Pond / fog */}
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#0a0414] via-[#1a0b2e]/90 to-transparent" />

      {/* Floating lanterns / lotuses */}
      <div className="animate-float-lantern absolute bottom-[14%] left-[18%] h-8 w-8 rounded-full bg-[radial-gradient(circle_at_40%_35%,#f0b8d8,#8a3a7a)] opacity-80 shadow-[0_0_18px_rgba(196,122,176,0.7)]" />
      <div
        className="animate-float-lantern absolute bottom-[10%] left-[42%] h-10 w-10 rounded-full bg-[radial-gradient(circle_at_40%_35%,#f5c6e0,#7a2f6a)] opacity-85 shadow-[0_0_22px_rgba(196,122,176,0.75)]"
        style={{ animationDelay: "0.8s" }}
      />
      <div
        className="animate-float-lantern absolute bottom-[16%] right-[20%] h-7 w-7 rounded-full bg-[radial-gradient(circle_at_40%_35%,#efb0d2,#6e2860)] opacity-75 shadow-[0_0_16px_rgba(196,122,176,0.65)]"
        style={{ animationDelay: "1.4s" }}
      />
      <div
        className="animate-float-lantern absolute bottom-[8%] right-[36%] h-6 w-6 rounded-full bg-[radial-gradient(circle_at_40%_35%,#e8a8cc,#5c2152)] opacity-70"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
}
