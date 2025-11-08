export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mb-4"></div>
        <p className="text-cyan-400 text-lg font-medium">Carregando...</p>
      </div>
    </div>
  );
}
