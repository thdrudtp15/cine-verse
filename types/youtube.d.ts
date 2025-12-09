declare global {
    interface Window {
        YT: typeof YT;
        onYouTubeIframeAPIReady: () => void;
    }
}

export namespace YT {
    enum PlayerState {
        UNSTARTED = -1,
        ENDED = 0,
        PLAYING = 1,
        PAUSED = 2,
        BUFFERING = 3,
        CUED = 5,
    }

    interface PlayerOptions {
        videoId: string;
        width?: string | number;
        height?: string | number;
        playerVars?: PlayerVars;
        events?: Events;
    }

    interface PlayerVars {
        autoplay?: 0 | 1;
        controls?: 0 | 1;
        modestbranding?: 0 | 1;
        rel?: 0 | 1;
        showinfo?: 0 | 1;
        fs?: 0 | 1;
        playsinline?: 0 | 1;
    }

    interface Events {
        onReady?: (event: PlayerEvent) => void;
        onStateChange?: (event: OnStateChangeEvent) => void;
        onPlaybackQualityChange?: (event: PlayerEvent) => void;
        onPlaybackRateChange?: (event: PlayerEvent) => void;
        onError?: (event: OnErrorEvent) => void;
        onApiChange?: (event: PlayerEvent) => void;
    }

    interface PlayerEvent {
        target: Player;
    }

    interface OnStateChangeEvent extends PlayerEvent {
        data: PlayerState;
    }

    interface OnErrorEvent extends PlayerEvent {
        data: number;
    }

    class Player {
        constructor(elementId: string | HTMLElement, options: PlayerOptions);

        // 재생 제어
        playVideo(): void;
        pauseVideo(): void;
        stopVideo(): void;
        seekTo(seconds: number, allowSeekAhead: boolean): void;

        // 상태 조회
        getPlayerState(): PlayerState;
        getCurrentTime(): number;
        getDuration(): number;
        getVideoUrl(): string;
        getVideoEmbedCode(): string;

        // 볼륨 제어
        mute(): void;
        unMute(): void;
        isMuted(): boolean;
        setVolume(volume: number): void;
        getVolume(): number;

        // 재생 품질
        getPlaybackQuality(): string;
        setPlaybackQuality(suggestedQuality: string): void;
        getAvailableQualityLevels(): string[];

        // 재생 속도
        getPlaybackRate(): number;
        setPlaybackRate(suggestedRate: number): void;
        getAvailablePlaybackRates(): number[];

        // 기타
        destroy(): void;
    }
}

export {};
