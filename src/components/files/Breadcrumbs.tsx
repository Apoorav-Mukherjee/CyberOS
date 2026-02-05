import { useFileStore } from "../../store/fileStore";

export function Breadcrumbs() {
  const { currentPath, goBack } = useFileStore();

  return (
    <div className="px-3 py-2 border-b border-white/10 text-sm flex items-center gap-2">
      <button
        onClick={goBack}
        disabled={currentPath.length === 0}
        className="px-2 py-1 bg-white/10 rounded disabled:opacity-40"
      >
        Back
      </button>

      <span className="opacity-70">
        /{currentPath.join("/")}
      </span>
    </div>
  );
}
