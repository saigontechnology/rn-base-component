import React from 'react';
import type { View } from 'react-native';
interface IProgressProps {
    /**
     * Current percent of the Progress bar
     * default 0, max 100
     */
    value?: number;
    /**
     * Defines height of Progress bar
     * default 16
     */
    size?: number;
    /**
     * Defines borderRadius of Progress bar
     * default 0
     */
    borderRadius?: number;
    /**
     * Defines color of Track Bar
     */
    filledTrackColor?: string;
    /**
     * Defines background color of Progress bar
     */
    backgroundColor?: string;
    /**
     * Defines full width of the progress bar
     */
    width?: number;
    /**
     * Defines progress mode
     */
    isIndeterminateProgress?: boolean;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<IProgressProps & React.RefAttributes<View>>>;
export default _default;
//# sourceMappingURL=Progress.d.ts.map