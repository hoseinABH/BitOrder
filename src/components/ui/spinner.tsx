export function Spinner() {
  return (
    <div className="flex h-[80dvh] items-center justify-center">
      <div
        className="border-primary size-12 animate-spin rounded-full border-3 border-t-transparent"
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
