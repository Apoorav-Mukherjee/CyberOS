import type { FileNode } from "../../store/fileStore";

interface Props {
  file: FileNode | null;
}

export function FilePreview({ file }: Props) {
  if (!file) {
    return (
      <div className="h-full flex items-center justify-center opacity-50">
        Select a file to preview
      </div>
    );
  }

  return (
    <div className="p-4 whitespace-pre-wrap">
      <div className="font-semibold mb-2">{file.name}</div>
      <div className="text-sm opacity-80">
        {file.content ?? "No preview available"}
      </div>
    </div>
  );
}
