import { useContextMenuStore } from '../store/contextMenuStore';
import { useWindowStore } from '../store/windowStore';

export function ContextMenu() {
    const { isOpen, type, position, payload, closeMenu } =
        useContextMenuStore();
    const { openWindow } = useWindowStore();
    const { AddToDock } = useWindowStore();
    const { RemoveFromDock } = useWindowStore();
    const appId = payload?.appId;


    if (!isOpen) return null;

    return (
        <>
            {/* Click outside overlay */}
            <div
                className="fixed inset-0 z-40"
                onClick={closeMenu}
            />

            <div
                className="fixed z-50 min-w-[180px] rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-xl text-sm"
                style={{
                    top: position.y,
                    left: position.x,
                }}
            >
                {type === 'desktop-app' && (
                    <>
                        <MenuItem
                            label="Open"
                            onClick={() => {
                                openWindow(appId);
                                closeMenu();
                            }} />
                        <MenuItem label="Add to Dock" onClick={() => {
                            AddToDock(appId);
                            closeMenu();
                        }} />
                        <MenuItem label="Remove from Dock" onClick={() => {
                            RemoveFromDock(appId);
                            closeMenu();
                        }} />
                        <Divider />
                        <MenuItem label="Properties" onClick={() => {
                            closeMenu();
                        }} />
                    </>
                )}

                {type === 'window' && (
                    <>
                        <MenuItem label="Minimize" onClick={() => {
                            closeMenu();
                        }} />
                        <MenuItem label="Maximize" onClick={() => {
                            closeMenu();
                        }} />
                        <MenuItem label="Close" onClick={() => {
                            closeMenu();
                        }} />
                    </>
                )}
            </div>
            <div 
                className="fixed z-50 min-w-[180px] rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-xl text-sm"
                style={{
                    bottom: window.innerHeight - position.y + 8,
                    left: position.x,
                    transform: 'translateX(-50%)',
                }}
            >
                {type === 'dock-app' && (
                    <>
                        <MenuItem label="Open" onClick={() => {
                            openWindow(appId);
                            closeMenu();
                        }} />
                        <Divider />
                        <MenuItem label="Remove from Dock" onClick={() => {
                            RemoveFromDock(appId);
                            closeMenu();
                        }} />
                    </>
                )}
            </div>
        </>
    );
}

function MenuItem({ label, onClick }: { label: string; onClick?: () => void }) {
    return (
        <div className="px-4 py-2 hover:bg-white/10 cursor-pointer" onClick={onClick}>
            {label}
        </div>
    );
}

function Divider() {
    return <div className="my-1 h-px bg-white/10" />;
}
