import { useWindowStore } from "../store/windowStore";


export function Dock() {

    const { windows, restoreWindow, openWindow } = useWindowStore();

    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex gap-6">
            {['Files', 'Terminal', 'Settings', 'Code', 'Music', 'Firefox'].map(app => (
                <div
                    key={app}
                    className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition flex items-center justify-center text-xs text-gray-300"
                >
                    {app}
                </div>
            ))}
            {windows.map((win) => {
                const isMinimized = win.isMinimized;

                return (
                    <div
                        key={win.id}
                        onClick={() =>
                            isMinimized
                                ? restoreWindow(win.id)
                                : openWindow(win.type)
                        }
                        className="relative w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition flex items-center justify-center text-xs text-gray-300 cursor-pointer"
                    >
                        {win.title}

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