// 'use client';

// import { CheckIcon, XIcon } from 'lucide-react';
// import { useId, useMemo, useRef, useState } from 'react';

// import { Input } from '@/components/ui/input';

// import { AnimatePresence, MotionDiv, MotionLi } from '@/utilities/motion-components';
// import { AnimatedEyeIcon } from './animated-eye-button';

// export default function PasswordInput({
//     startIcon,
//     showStrengthIndicator = false,
//     name = 'password',
//     placeholder = "Password"
// }: {
//     startIcon?: React.ReactNode;
//     showStrengthIndicator?: boolean;
//     name?: string;
//     placeholder?: string;
// }) {
//     const id = useId();
//     const [password, setPassword] = useState('');
//     const [isVisible, setIsVisible] = useState<boolean>(false);
//     const [isFocused, setIsFocused] = useState<boolean>(false);
    
//     const inputRef = useRef<HTMLInputElement>(null);

//     const toggleVisibility = () => setIsVisible((prevState) => !prevState);

//     const checkStrength = (pass: string) => {
//         const requirements = [
//             { regex: /.{8,}/, text: 'At least 8 characters' },
//             { regex: /[0-9]/, text: 'At least 1 number' },
//             { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
//             { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
//         ];

//         return requirements.map((req) => ({
//             met: req.regex.test(pass),
//             text: req.text,
//         }));
//     };

//     const strength = checkStrength(password);

//     const strengthScore = useMemo(() => {
//         return strength.filter((req) => req.met).length;
//     }, [strength]);

//     const getStrengthColor = (score: number) => {
//         if (score === 0) return 'bg-border';
//         if (score <= 1) return 'bg-red-500';
//         if (score <= 2) return 'bg-orange-500';
//         if (score === 3) return 'bg-amber-500';

//         return 'bg-emerald-500';
//     };

//     const getStrengthText = (score: number) => {
//         if (score === 0) return 'Enter a password';
//         if (score <= 2) return 'Weak password';
//         if (score === 3) return 'Medium password';

//         return 'Strong password';
//     };

//     // Animation variants
//     const containerVariants = {
//         hidden: { 
//             height: 0,
//             opacity: 0,
//             marginTop: 0
//         },
//         visible: { 
//             height: "auto",
//             opacity: 1,
//             marginTop: 16,
//             transition: {
//                 height: {
//                     type: "spring",
//                     stiffness: 300,
//                     damping: 30
//                 },
//                 opacity: { duration: 0.2 }
//             }
//         },
//         exit: {
//             height: 0,
//             opacity: 0,
//             marginTop: 0,
//             transition: {
//                 height: {
//                     type: "spring",
//                     stiffness: 300,
//                     damping: 30
//                 },
//                 opacity: { duration: 0.2 }
//             }
//         }
//     };

//     return (
//         <div>
//             <div className="*:not-first:mt-2">
//                 <div className="relative">
//                     <Input
//                         ref={inputRef}
//                         aria-describedby={`${id}-description`}
//                         className="pe-9"
//                         id={id}
//                         name={name}
//                         placeholder={placeholder}
//                         startIcon={startIcon}
//                         type={isVisible ? 'text' : 'password'}
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         onFocus={() => setIsFocused(true)}
//                         onBlur={() => setIsFocused(false)}
//                     />
//                     <button
//                         aria-controls="password"
//                         aria-label={isVisible ? 'Hide password' : 'Show password'}
//                         aria-pressed={isVisible}
//                         className="focus:z-10 absolute inset-y-0 flex justify-center items-center disabled:opacity-50 focus-visible:border-ring rounded-e-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 w-9 h-full text-muted-foreground/80 hover:text-foreground transition-[color,box-shadow] disabled:cursor-not-allowed disabled:pointer-events-none end-1"
//                         type="button"
//                         onClick={toggleVisibility}
//                     >
//                         <AnimatedEyeIcon aria-hidden="true" isVisible={isVisible} />
//                     </button>
//                 </div>
//             </div>
//             {showStrengthIndicator && (
//                 <>
//                     {/* Password strength indicator (always visible) */}
//                     <div
//                         aria-label="Password strength"
//                         aria-valuemax={4}
//                         aria-valuemin={0}
//                         aria-valuenow={strengthScore}
//                         className="mt-3 bg-border rounded-full w-full h-1 overflow-hidden"
//                         role="progressbar"
//                     >
//                         <MotionDiv
//                             className={`h-full ${getStrengthColor(strengthScore)}`}
//                             initial={{ width: 0 }}
//                             animate={{ width: `${(strengthScore / 4) * 100}%` }}
//                             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                         />
//                     </div>

//                     {/* Animated container for strength description and requirements list */}
//                     <AnimatePresence>
//                         {isFocused && (
//                             <MotionDiv
//                                 key="requirements"
//                                 initial="hidden"
//                                 animate="visible"
//                                 exit="exit"
//                                 variants={containerVariants}
//                                 className="overflow-hidden"
//                             >
//                                 {/* Password strength description */}
//                                 <p className="mb-2 font-medium text-foreground text-sm" id={`${id}-description`}>
//                                     {getStrengthText(strengthScore)}. Must contain:
//                                 </p>

//                                 {/* Password requirements list */}
//                                 <ul aria-label="Password requirements" className="space-y-1.5">
//                                     {strength.map((req, index) => (
//                                         <MotionLi 
//                                             key={index} 
//                                             className="flex items-center gap-2"
//                                             initial={{ opacity: 0, x: -10 }}
//                                             animate={{ opacity: 1, x: 0 }}
//                                             transition={{ delay: index * 0.05 }}
//                                         >
//                                             {req.met ? (
//                                                 <CheckIcon aria-hidden="true" className="text-emerald-500" size={16} />
//                                             ) : (
//                                                 <XIcon aria-hidden="true" className="text-muted-foreground/80" size={16} />
//                                             )}
//                                             <span className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}>
//                                                 {req.text}
//                                                 <span className="sr-only">{req.met ? ' - Requirement met' : ' - Requirement not met'}</span>
//                                             </span>
//                                         </MotionLi>
//                                     ))}
//                                 </ul>
//                             </MotionDiv>
//                         )}
//                     </AnimatePresence>
//                 </>
//             )}
//         </div>
//     );
// }

'use client';

import { CheckIcon, XIcon } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';

import { Input } from '@/components/ui/input';

import { AnimatePresence, MotionDiv, MotionLi } from '@/utilities/motion-components';
import { AnimatedEyeIcon } from './animated-eye-button';

export default function PasswordInput({
    startIcon,
    showStrengthIndicator = false,
    name = 'password',
    placeholder = "Password",
    formTouched = false
}: {
    startIcon?: React.ReactNode;
    showStrengthIndicator?: boolean;
    name?: string;
    placeholder?: string;
    formTouched?: boolean;
}) {
    const id = useId();
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [wasAutofilled, setWasAutofilled] = useState<boolean>(false);
    
    const inputRef = useRef<HTMLInputElement>(null);

    // Check for autofill on initial load
    useEffect(() => {
        const checkAutofill = () => {
            if (inputRef.current && inputRef.current.value) {
                setPassword(inputRef.current.value);
                setWasAutofilled(true);
            }
        };

        checkAutofill();
        
        const timer = setTimeout(checkAutofill, 500);
        return () => clearTimeout(timer);
    }, []);

    // Consider field active when any of these conditions are true
    const isFieldActive = isDirty || wasAutofilled || formTouched;

    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    const checkStrength = (pass: string) => {
        const requirements = [
            { regex: /.{8,}/, text: 'At least 8 characters' },
            { regex: /[0-9]/, text: 'At least 1 number' },
            { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
            { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
        ];

        return requirements.map((req) => ({
            met: req.regex.test(pass),
            text: req.text,
        }));
    };

    const strength = checkStrength(password);

    const strengthScore = useMemo(() => {
        return strength.filter((req) => req.met).length;
    }, [strength]);

    const getStrengthColor = (score: number) => {
        if (score === 0) return 'bg-border';
        if (score <= 1) return 'bg-red-500';
        if (score <= 2) return 'bg-orange-500';
        if (score === 3) return 'bg-amber-500';

        return 'bg-emerald-500';
    };

    const getStrengthText = (score: number) => {
        if (score === 0) return 'Enter a password';
        if (score <= 2) return 'Weak password';
        if (score === 3) return 'Medium password';

        return 'Strong password';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (!isDirty && e.target.value.length > 0) {
            setIsDirty(true);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { 
            height: 0,
            opacity: 0,
            marginTop: 0
        },
        visible: { 
            height: "auto",
            opacity: 1,
            marginTop: 16,
            transition: {
                height: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                },
                opacity: { duration: 0.2 }
            }
        },
        exit: {
            height: 0,
            opacity: 0,
            marginTop: 0,
            transition: {
                height: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                },
                opacity: { duration: 0.2 }
            }
        }
    };

    const progressVariants = {
        hidden: {
            opacity: 0,
            height: 0,
            marginTop: 0
        },
        visible: {
            opacity: 1,
            height: 4,
            marginTop: 12,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        }
    };

    return (
        <div>
            <div className="*:not-first:mt-2">
                <div className="relative">
                    <Input
                        ref={inputRef}
                        aria-describedby={`${id}-description`}
                        className="pe-9"
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        startIcon={startIcon}
                        type={isVisible ? 'text' : 'password'}
                        value={password}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                    <button
                        aria-controls="password"
                        aria-label={isVisible ? 'Hide password' : 'Show password'}
                        aria-pressed={isVisible}
                        className="focus:z-10 absolute inset-y-0 flex justify-center items-center disabled:opacity-50 focus-visible:border-ring rounded-e-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 w-9 h-full text-muted-foreground/80 hover:text-foreground transition-[color,box-shadow] disabled:cursor-not-allowed disabled:pointer-events-none end-1"
                        type="button"
                        onClick={toggleVisibility}
                    >
                        <AnimatedEyeIcon aria-hidden="true" isVisible={isVisible} />
                    </button>
                </div>
            </div>
            {showStrengthIndicator && (
                <>
                    {/* Password strength indicator (only when field is active) */}
                    <AnimatePresence>
                        {isFieldActive && (
                            <MotionDiv
                                aria-label="Password strength"
                                aria-valuemax={4}
                                aria-valuemin={0}
                                aria-valuenow={strengthScore}
                                className="bg-border rounded-full w-full overflow-hidden"
                                role="progressbar"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={progressVariants}
                            >
                                <MotionDiv
                                    className={`h-full ${getStrengthColor(strengthScore)}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(strengthScore / 4) * 100}%` }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            </MotionDiv>
                        )}
                    </AnimatePresence>

                    {/* Animated container for strength description and requirements list */}
                    <AnimatePresence>
                        {isFocused && isFieldActive && (
                            <MotionDiv
                                key="requirements"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={containerVariants}
                                className="overflow-hidden"
                            >
                                {/* Password strength description */}
                                <p className="mb-2 font-medium text-foreground text-sm" id={`${id}-description`}>
                                    {getStrengthText(strengthScore)}. Must contain:
                                </p>

                                {/* Password requirements list */}
                                <ul aria-label="Password requirements" className="space-y-1.5">
                                    {strength.map((req, index) => (
                                        <MotionLi
                                            key={index} 
                                            className="flex items-center gap-2"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            {req.met ? (
                                                <CheckIcon aria-hidden="true" className="text-emerald-500" size={16} />
                                            ) : (
                                                <XIcon aria-hidden="true" className="text-muted-foreground/80" size={16} />
                                            )}
                                            <span className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                                                {req.text}
                                                <span className="sr-only">{req.met ? ' - Requirement met' : ' - Requirement not met'}</span>
                                            </span>
                                        </MotionLi>
                                    ))}
                                </ul>
                            </MotionDiv>
                        )}
                    </AnimatePresence>
                </>
            )}
        </div>
    );
}