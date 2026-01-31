export function TopBar() {
    return (
        <div className="h-10 w-full bg-black/60 backdrop-blur border-b border-white/10 flex items-center justify-between px-4 text-sm text-gray-300">
            <div className="font-semibold tracking-wide">Portfolio OS</div>
            <div className="flex items-center gap-4">
                <span>{new Date().toLocaleDateString()}</span>
                <span>{new Date().toLocaleTimeString()}</span>
            </div>
        </div>
    );
}