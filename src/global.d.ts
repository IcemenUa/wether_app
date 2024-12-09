// src/global.d.ts

import {
    ViewProps,
    TextProps,
    ImageProps,
    TouchableOpacityProps,
    SwitchProps,
    // Add other component props as needed
} from 'react-native';

declare module 'react-native' {
    interface ViewProps {
        className?: string;
    }

    interface TextProps {
        className?: string;
    }

    interface ImageProps {
        className?: string;
    }

    interface TouchableOpacityProps {
        className?: string;
    }

    interface SwitchProps {
        className?: string;
    }
}
