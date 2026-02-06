import { SkillsTable } from "./SkillsTable";

export default function SkillsApp() {
  return (
    <div className="h-full w-full text-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-2 border-b border-white/10">
        <div className="font-semibold">Skills.xlsx</div>
        <div className="text-xs opacity-70">
          Read-only spreadsheet view
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <SkillsTable />
      </div>
    </div>
  );
}
