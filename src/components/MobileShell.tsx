type MobileShellProps = {
  children: React.ReactNode;
  className?: string;
};

/** Centers a phone-sized frame on larger screens while staying full-bleed on mobile. */
export function MobileShell({ children, className = "" }: MobileShellProps) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#07040f] p-0 sm:p-6">
      <div
        className={`relative flex h-dvh w-full max-w-[430px] flex-col overflow-hidden sm:h-[min(844px,100dvh)] sm:rounded-[28px] sm:border sm:border-white/10 sm:shadow-2xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
