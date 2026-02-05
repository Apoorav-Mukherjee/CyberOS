import { DESKTOP_APPS } from "../constants/apps";
import { useWindowStore } from '../store/windowStore';
import { Window } from './Window';
import { useContextMenuStore } from '../store/contextMenuStore';

export function Desktop() {

    const { windows } = useWindowStore();
    const { openWindow } = useWindowStore();
    const { openMenu } = useContextMenuStore();

    return (
        <div className="relative w-full h-full">
            {/* Desktop Icons */}
            <div className="grid grid-cols-5 gap-10 p-10">
                {DESKTOP_APPS.map(app => {
                    const Icon = app.icon;

                    return (
                        <div
                            key={app.id}
                            title={app.label}
                            className="flex flex-col items-center gap-2 text-gray-200 cursor-pointer"
                            onClick={() => openWindow(app.id)}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                openMenu(
                                    'desktop-app',
                                    { x: e.clientX, y: e.clientY },
                                    { appId: app.id }
                                );
                            }}
                        >
                            <div className="w-14 h-14 rounded-xl bg-white/10 hover:bg-white/40 transition flex items-center justify-center">
                                <Icon size={28} />
                            </div>

                            <span className="text-xs">{app.label}</span>
                        </div>
                    );
                })}
            </div>
            {/* Active Windows */}
            {windows
                .filter(win => !win.isMinimized && win.isOpen)
                .map(win => (
                    <Window
                        key={win.id}
                        windowId={win.id}
                        title={win.title}
                        zIndex={win.zIndex}
                        position={win.position}
                        size={win.size}
                    >
                    </Window>
                ))}
        </div>
    );
}


