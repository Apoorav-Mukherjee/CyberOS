import { DESKTOP_APPS } from "../constants/apps";
import { useWindowStore } from '../store/windowStore';
import { Window } from './Window';

export function Desktop() {

    const { windows } = useWindowStore();
    const { openWindow } = useWindowStore();

    return (
        <div className="relative w-full h-full">
            {/* Desktop Icons */}
            <div className="grid grid-cols-5 gap-10 p-10">
                {DESKTOP_APPS.map(app => (
                    <div
                        key={app.id}
                        className="flex flex-col items-center gap-2 text-gray-200 cursor-pointer select-none"
                        onClick={() => openWindow(app.id)}
                    >
                        <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                            ⚙️
                        </div>
                        <span className="text-xs">{app.label}</span>
                    </div>
                ))}
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
                    <div className="text-gray-300">
                        {win.title} content goes here
                    </div>
                </Window>
            ))}
        </div>
    );
}


