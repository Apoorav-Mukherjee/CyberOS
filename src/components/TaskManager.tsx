import { useProcessStore } from "../store/processStore";
import { useWindowStore } from "../store/windowStore";
import { DESKTOP_APPS } from "../constants/apps";

export default function TaskManager() {
  const { processes, killProcess } = useProcessStore();
  const { windows, focusWindow, closeWindow } = useWindowStore();

  const getAppLabel = (type: string) =>
    DESKTOP_APPS.find(a => a.id === type)?.label ?? type;

  const getWindowsForPid = (pid: number) =>
    windows.filter(w => w.pid === pid && w.isOpen);

  return (
    <div className="text-sm">
      <h2 className="text-lg mb-3">Processes</h2>

      <table className="w-full border-collapse">
        <thead className="border-b border-white/10">
          <tr className="text-left opacity-70">
            <th>PID</th>
            <th>App</th>
            <th>State</th>
            <th>Windows</th>
            <th>Uptime</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {processes.map(proc => {
            const procWindows = getWindowsForPid(proc.pid);

            return (
              <tr key={proc.pid} className="border-b border-white/5">
                <td>{proc.pid}</td>
                <td>{getAppLabel(proc.appType)}</td>
                <td>{proc.state}</td>
                <td>{procWindows.length}</td>
                <td>
                  {Math.floor((Date.now() - proc.startedAt) / 1000)}s
                </td>
                <td className="flex gap-2">
                  {procWindows[0] && (
                    <button
                      onClick={() => focusWindow(procWindows[0].id)}
                      className="px-2 py-1 bg-white/10 rounded"
                    >
                      Focus
                    </button>
                  )}
                  <button
                    onClick={() => {
                      procWindows.forEach(w => closeWindow(w.id));
                      killProcess(proc.pid);
                    }}
                    className="px-2 py-1 bg-red-500/70 rounded"
                  >
                    Kill
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
