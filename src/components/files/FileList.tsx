import { useFileStore } from "../../store/fileStore";
import type { FileNode } from "../../store/fileStore";
import { motion } from "framer-motion";

function resolveFolder(
  root: FileNode,
  path: string[]
): FileNode | null {
  let current = root;
  for (const segment of path) {
    const next = current.children?.find(
      (c) => c.name === segment && c.type === "folder"
    );
    if (!next) return null;
    current = next;
  }
  return current;
}

export function FileList() {
  const { root, currentPath, openFolder, selectFile } = useFileStore();

  const folder = resolveFolder(root, currentPath);
  if (!folder || !folder.children) return null;

  return (
    <div className="flex-1 overflow-y-auto">
      {folder.children.map((item) => (
        <motion.div
          layout
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.12 }}
          onClick={() =>
            item.type === "folder"
              ? openFolder(item.name)
              : selectFile(item)
          }
          className="px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-white/10"
        >
          <span>{item.type === "folder" ? "📁" : "📄"}</span>
          <span>{item.name}</span>
        </motion.div>
      ))}
    </div>
  );
}
