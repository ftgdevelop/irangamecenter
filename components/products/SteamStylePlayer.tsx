import React, { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Maximize2,
  Check,
} from "lucide-react";
import Hls, { Events, Level } from "hls.js";

interface Props {
  src: string;
  thumbnail?: string;
  itemId: string | number;
  playersRef?: React.RefObject<Map<string, HTMLVideoElement>>;
}

const SteamStylePlayer: React.FC<Props> = ({
  src,
  thumbnail,
  itemId,
  playersRef,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [levels, setLevels] = useState<Level[]>([]);
  const [currentLevel, setCurrentLevel] = useState(-1);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isHLS = src.endsWith(".m3u8");
    if (isHLS && Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true, capLevelToPlayerSize: true });
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Events.MANIFEST_PARSED, () => {
        setLevels([...hls.levels]);
        setCurrentLevel(-1);
        playersRef?.current?.set(String(itemId), video);
      });

      hls.on(Events.LEVEL_SWITCHED, (_, data) => {
        setCurrentLevel(data.level);
      });

      hlsRef.current = hls;
    } else {
      video.src = src;
      playersRef?.current?.set(String(itemId), video);
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };
    const handleLoadedMetadata = () => setDuration(video.duration);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    video.volume = volume;

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      playersRef?.current?.delete(String(itemId));
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [src, itemId, playersRef, volume]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const newMuted = !video.muted;
    video.muted = newMuted;
    setMuted(newMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    if (newVolume > 0) {
      video.muted = false;
      setMuted(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const time = (parseFloat(e.target.value) / 100) * video.duration;
    video.currentTime = time;
    setProgress(parseFloat(e.target.value));
    setCurrentTime(time);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (video && video.requestFullscreen) video.requestFullscreen();
  };

  const handleQualitySelect = (level: number) => {
    setCurrentLevel(level);
    if (hlsRef.current) hlsRef.current.currentLevel = level;
    setShowSettings(false);
  };

  return (
    <div
      className="relative w-full h-full bg-black/5 group"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        poster={thumbnail}
        className="w-full"
        playsInline
        controls={false}
      />

      {/* Custom Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Progress bar */}
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-full accent-red-500 cursor-pointer"
        />

        <div className="flex justify-between items-center mt-2 text-white">
          {/* LEFT: Play + Volume + Timer */}
          <div className="flex items-center gap-3">
            <button onClick={togglePlay}>
              {playing ? <Pause size={26} /> : <Play size={26} />}
            </button>

            <div className="flex items-center gap-2">
              <button onClick={toggleMute}>
                {muted || volume === 0 ? (
                  <VolumeX size={22} />
                ) : (
                  <Volume2 size={22} />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={muted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 accent-red-500 cursor-pointer"
              />
            </div>

            <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* RIGHT: Settings + Fullscreen */}
          <div className="flex items-center gap-3 relative">
            <button onClick={() => setShowSettings(!showSettings)}>
              <Settings size={22} />
            </button>

            {/* Quality Dropdown */}
            {showSettings && levels.length > 0 && (
              <div className="absolute bottom-10 right-0 bg-black/90 border border-gray-700 rounded-md px-3 py-2 w-28 text-sm space-y-1 z-50">
                <button
                  onClick={() => handleQualitySelect(-1)}
                  className={`flex justify-between w-full text-left hover:bg-white/10 px-1 py-1 rounded ${
                    currentLevel === -1 ? "text-red-400" : "text-gray-200"
                  }`}
                >
                  Auto {currentLevel === -1 && <Check size={14} />}
                </button>
                {levels.map((level, index) => (
                  <button
                    key={index}
                    onClick={() => handleQualitySelect(index)}
                    className={`flex justify-between w-full text-left hover:bg-white/10 px-1 py-1 rounded ${
                      currentLevel === index ? "text-red-400" : "text-gray-200"
                    }`}
                  >
                    {level.height ? `${level.height}p` : `Level ${index}`}
                    {currentLevel === index && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}

            <button onClick={toggleFullscreen}>
              <Maximize2 size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SteamStylePlayer;
