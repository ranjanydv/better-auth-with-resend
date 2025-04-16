type MotionProps = {
    x?: number;
    y?: number;
    delay?: number;
    duration?: number;
    exit?: boolean;
    scale?: boolean;
    ease?: string;
};

export const fadeInAnimation = ({
    x = 0,
    y = 20,
    delay = 0,
    duration = 0.5,
    exit = false,
    scale = false,
    ease = 'easeInOut',
}: MotionProps = {}) => ({
    initial: { opacity: 0, x, y, scale: scale ? 0.9 : 1 },
    whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
    viewport: { once: true },
    transition: { duration, delay, ease },
    ...(exit && { exit: { opacity: 0, x, y, scale: scale ? 0.9 : 1 } }),
});
