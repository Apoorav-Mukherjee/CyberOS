import { useFileStore } from "../../store/fileStore";
import { Breadcrumbs } from "./Breadcrumbs";
import { FileList } from "./FileList";
import { FilePreview } from "./FilePreview";

export default function FilesApp() {
  const { openFile } = useFileStore();

  return (
    <div className="flex h-full text-white">
      {/* Left panel */}
      <div className="w-1/2 border-r border-white/10 flex flex-col">
        <Breadcrumbs />
        <FileList />
      </div>

      {/* Right panel */}
      <div className="flex-1">
        <FilePreview file={openFile} />
      </div>
    </div>
  );
}
