import { MotionPath, MotionSvg } from '@/utilities/motion-components';

export function AnimatedEyeIcon({ size = 24, isVisible = true }) {
    return (
        <MotionSvg fill="none" height={size} initial={false} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg">
            {/* Eye circle */}
            <MotionPath
                animate={{
                    opacity: isVisible ? 0.4 : 0,
                    pathLength: isVisible ? 1 : 0,
                }}
                d="M15.582 12.002c0 1.98-1.6 3.58-3.58 3.58s-3.58-1.6-3.58-3.58 1.6-3.58 3.58-3.58 3.58 1.6 3.58 3.58Z"
                opacity={isVisible ? 0.4 : 0}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                transition={{ duration: 0.3 }}
            />

            {/* Main eye outline */}
            <MotionPath
                animate={{
                    opacity: isVisible ? 1 : 0,
                    pathLength: isVisible ? 1 : 0,
                }}
                d="M12 20.269c3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-2.29-3.6-5.58-5.68-9.11-5.68-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19 2.29 3.6 5.58 5.68 9.11 5.68Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                transition={{ duration: 0.3 }}
            />

            {/* Slash through eye top-right to bottom-left */}
            <MotionPath
                animate={{
                    opacity: isVisible ? 0 : 1,
                    pathLength: isVisible ? 0 : 1,
                }}
                d="M22.001 2l-7.47 7.47"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                transition={{ duration: 0.3 }}
            />

            {/* Slash through eye bottom-left to top-right */}
            <MotionPath
                animate={{
                    opacity: isVisible ? 0 : 1,
                    pathLength: isVisible ? 0 : 1,
                }}
                d="M9.47 14.531L2 22.001"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                transition={{ duration: 0.3 }}
            />

            {/* Slashed eye circle */}
            <MotionPath
                animate={{
                    opacity: isVisible ? 0 : 1,
                    pathLength: isVisible ? 0 : 1,
                }}
                d="m14.532 9.472-5.06 5.06a3.576 3.576 0 1 1 5.06-5.06Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                transition={{ duration: 0.3 }}
            />

            {/* Lower part of slashed eye */}
            <MotionPath
                animate={{
                    opacity: isVisible ? 0 : 1,
                    pathLength: isVisible ? 0 : 1,
                }}
                d="M17.82 5.77C16.07 4.45 14.07 3.73 12 3.73c-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19.79 1.24 1.71 2.31 2.71 3.17"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                transition={{ duration: 0.3 }}
            />

            {/* Upper part of slashed eye */}
            <MotionPath
                animate={{
                    opacity: isVisible ? 0 : 0.4,
                    pathLength: isVisible ? 0 : 1,
                }}
                d="M8.422 19.53c1.14.48 2.35.74 3.58.74 3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-.33-.52-.69-1.01-1.06-1.47"
                opacity={isVisible ? 0 : 0.4}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                transition={{ duration: 0.3 }}
            />

            {/* Inner circle detail of slashed eye */}
            <MotionPath
                animate={{
                    opacity: isVisible ? 0 : 0.4,
                    pathLength: isVisible ? 0 : 1,
                }}
                d="M15.511 12.7a3.565 3.565 0 0 1-2.82 2.82"
                opacity={isVisible ? 0 : 0.4}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                transition={{ duration: 0.3 }}
            />
        </MotionSvg>
    );
}
