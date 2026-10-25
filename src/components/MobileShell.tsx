type MobileShellProps = {
  children: React.ReactNode;
  className?: string;
};

/** Phone-sized frame: full-bleed on mobile (100dvh), centered chrome on desktop. */
export function MobileShell({ children, className = "" }: MobileShellProps) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#07040f] p-0 sm:p-6">
      <div
        className={`relative h-[100dvh] w-full max-w-[430px] overflow-hidden bg-black sm:h-[min(844px,100dvh)] sm:rounded-[28px] sm:border sm:border-white/10 sm:shadow-2xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
