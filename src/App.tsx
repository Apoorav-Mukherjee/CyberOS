import { TopBar } from "./components/TopBar";
import { Dock } from "./components/Dock";
import { Desktop } from "./components/Desktop";


export default function App() {
    return (
        <div className="w-screen h-screen bg-[#0b1020] text-white overflow-hidden relative">
            {/* Grid Background */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url('public/assets/wallpapers/Wallpaper 1.jpg') || url('/assets/wallpapers/Wallpaper 1.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    // filter: "blur(5px) brightness(0.6)",
                }}
            />


            {/* Foreground */}
            <div className="relative z-10 w-full h-full flex flex-col">
                <TopBar />
                <div className="flex-1 relative">
                    <Desktop />
                    <Dock />
                </div>
            </div>
        </div>
    );
}