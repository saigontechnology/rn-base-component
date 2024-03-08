export type AnimationType = 'easeInEaseOut' | 'easeIn' | 'easeOut' | 'keyboard' | 'linear' | 'spring';
export declare const toggleAnimation: (openAnimation?: AnimationType, closeAnimation?: AnimationType, openDuration?: number, closeDuration?: number) => {
    duration: number;
    update: {
        duration: number;
        property: "opacity";
        type: "easeInEaseOut" | "easeIn" | "easeOut" | "keyboard" | "linear" | "spring";
    };
    delete: {
        duration: number;
        property: "opacity";
        type: "easeInEaseOut" | "easeIn" | "easeOut" | "keyboard" | "linear" | "spring";
    };
};
//# sourceMappingURL=ToggleAnimation.d.ts.map