import { useRef, useState, useEffect } from 'react';
import { useWindowStore } from '../store/windowStore';
import { DESKTOP_APPS } from '../constants/apps';
import { motion } from 'framer-motion';

interface Props {
  windowId: string;
  title: string;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export function Window({
  windowId,
  zIndex,
  position,
  size,
}: Props) {
  const {
    closeWindow,
    focusWindow,
    minimizeWindow,
    moveWindow,
    resizeWindow,
    clearRestoreFlag,
  } = useWindowStore();

  const windoww = useWindowStore(
    (s) => s.windows.find((w) => w.id === windowId)!
  );

  const app = DESKTOP_APPS.find((a) => a.id === windoww.type);
  const AppComponent = app?.component;

  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);

  /* =========================
     Drag logic
  ========================= */

  const onDragStart = (e: React.MouseEvent) => {
    focusWindow(windowId);
    setDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  /* =========================
     Resize logic
  ========================= */

  const onResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    focusWindow(windowId);
    setResizing(true);
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      w: size.width,
      h: size.height,
    };
  };

  /* =========================
     Global mouse handlers
  ========================= */

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (dragging) {
        moveWindow(
          windowId,
          e.clientX - dragOffset.current.x,
          e.clientY - dragOffset.current.y
        );
      }

      if (resizing) {
        resizeWindow(
          windowId,
          Math.max(300, resizeStart.current.w + (e.clientX - resizeStart.current.x)),
          Math.max(200, resizeStart.current.h + (e.clientY - resizeStart.current.y))
        );
      }
    };

    const onMouseUp = () => {
      setDragging(false);
      setResizing(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging, resizing, moveWindow, resizeWindow, windowId, position, size]);

  /* =========================
     Render
  ========================= */

  return (
    <motion.div
      className="absolute bg-black/70 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden"
      style={{
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        zIndex,
      }}
      initial={
        windoww.restoreFromDock
          ? { opacity: 0, scale: 0.85, y: 40 }
          : false
      }
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.05,
      }}
      onAnimationComplete={() => {
        clearRestoreFlag(windowId);
      }}
      onMouseDown={() => focusWindow(windowId)}
    >
      {/* ───── Title Bar ───── */}
      <div
        className="h-10 flex items-center justify-between px-3 border-b border-white/10 text-sm cursor-move select-none"
        onMouseDown={onDragStart}
      >
        <span>{windoww.title.charAt(0).toUpperCase() + windoww.title.slice(1)}</span>
        <span className="opacity-60 text-xs">
          {windoww.title} • pid:{windoww.pid}
        </span>


        <div className="flex gap-2">
          <button
            onClick={() => minimizeWindow(windowId)}
            className="w-3 h-3 rounded-full bg-yellow-400 hover:brightness-110"
          />
          <button
            onClick={() => closeWindow(windowId)}
            className="w-3 h-3 rounded-full bg-red-500 hover:brightness-110"
          />
        </div>
      </div>

      {/* ───── Content ───── */}
      <div className="p-4 h-[calc(100%-2.5rem)] overflow-auto">
        {AppComponent ? <AppComponent /> : <div>App not found</div>}
      </div>

      {/* ───── Resize Handle ───── */}
      <div
        onMouseDown={onResizeStart}
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
      />
    </motion.div>
  );
}
