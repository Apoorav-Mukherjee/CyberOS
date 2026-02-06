import { DESKTOP_APPS } from "../constants/apps";
import { useWindowStore } from "../store/windowStore";
import { motion } from "framer-motion";

export function Dock() {

    const { windows, restoreWindow, openWindow } = useWindowStore();


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex gap-6">
            {DESKTOP_APPS
                .filter(app => !windows.some(w => w.type === app.id && w.isOpen))
                .map(app => {
                    const Icon = app.icon;
                    return (
                        <motion.div
                            key={app.id}
                            title={app.label}
                            whileHover={{ scale: 1.25, y: -6 }}
                            whileTap={{ scale: 1.1 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 20,
                            }}
                            className="flex flex-col items-center gap-2 text-gray-200 cursor-pointer"
                            onClick={() => openWindow(app.id)
                            }
                        >
                            <div
                                key={app.id}
                                className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/30 transition flex items-center justify-center text-xs text-gray-300"
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                }}

                            >
                                <Icon size={20} />

                                {/* <span className="text-xs">{app.label}</span> */}
                            </div>
                        </motion.div>
                    )
                })}
            {windows
                .filter((win) => win.inDock === true && win.isOpen === true)
                .map((win) => {
                    const isMinimized = win.isMinimized;
                    const Icon = win.icon;
                    return (
                        <motion.div
                            key={win.id}
                            whileHover={{ scale: 1.25, y: -6 }}
                            whileTap={{ scale: 1.1 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 20,
                            }}
                            onClick={() =>
                                isMinimized
                                    ? restoreWindow(win.id)
                                    : openWindow(win.type)
                            }
                            className="relative w-12 h-12 rounded-xl bg-white/5 hover:bg-white/30 transition flex items-center justify-center text-xs text-gray-300 cursor-pointer"
                            onContextMenu={(e) => {
                                e.preventDefault();

                            }}
                        >
                                <Icon size={20} />
                            {/* ● Minimized indicator */}
                            {isMinimized && (
                                <motion.span layoutId="dock-active-indicator" className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-400" />
                            )}
                            {/* Active / minimized indicator */}
                            {win.isOpen && (
                                <motion.span layoutId="dock-active-indicator" className="absolute -bottom-1 w-2 h-1 rounded-full bg-blue-400" />
                            )}
                        </motion.div>
                    );
                })}
        </motion.div>

    );
}