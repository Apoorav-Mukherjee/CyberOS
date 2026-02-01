import { DESKTOP_APPS } from "../constants/apps";
import { useWindowStore } from "../store/windowStore";
import { useContextMenuStore } from "../store/contextMenuStore";


export function Dock() {

    const { windows, restoreWindow, openWindow } = useWindowStore();
    const { openMenu } = useContextMenuStore();

    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex gap-6">
            {DESKTOP_APPS
                .filter(app => app.inDock)
                .map(app => {
                    const Icon = app.icon;
                    return (
                        <div
                            key={app.id}
                            title={app.label}
                            className="flex flex-col items-center gap-2 text-gray-200 cursor-pointer"
                            onClick={() => restoreWindow(app.id)
                            }
                        >
                            <div
                                key={app.id}
                                className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/30 transition flex items-center justify-center text-xs text-gray-300"
                                onContextMenu={(e) => {
                                    e.preventDefault();

                                    const rect = e.currentTarget.getBoundingClientRect();

                                    openMenu(
                                        'dock-app',
                                        {
                                            x: rect.left + rect.width / 2,
                                            y: rect.top, // 👈 IMPORTANT
                                        },
                                        { appId: app.id }
                                    );
                                }}

                            >
                                <Icon size={20} />

                                {/* <span className="text-xs">{app.label}</span> */}
                            </div>
                        </div>
                    )
                })}
            {windows
                .filter((win) => win.inDock === true)
                .map((win) => {
                    const isMinimized = win.isMinimized;
                    const Icon = win.icon;
                    return (
                        <div
                            key={win.id}
                            onClick={() =>
                                isMinimized
                                    ? restoreWindow(win.id)
                                    : openWindow(win.type)
                            }
                            className="relative w-12 h-12 rounded-xl bg-white/5 hover:bg-white/30 transition flex items-center justify-center text-xs text-gray-300 cursor-pointer"
                            onContextMenu={(e) => {
                                e.preventDefault();

                                const rect = e.currentTarget.getBoundingClientRect();

                                openMenu(
                                    'dock-app',
                                    {
                                        x: rect.left + rect.width / 2,
                                        y: rect.top, // 👈 IMPORTANT
                                    },
                                    { appId: win.id }
                                );
                            }}
                        >
                            <Icon size={20} />

                            {/* ● Minimized indicator */}
                            {isMinimized && (
                                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-400" />
                            )}
                        </div>
                    );
                })}
        </div>

    );
}