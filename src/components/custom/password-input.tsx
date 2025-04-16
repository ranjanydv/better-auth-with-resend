'use client';

import { CheckIcon, XIcon } from 'lucide-react';
import { useId, useMemo, useState } from 'react';

import { Input } from '@/components/ui/input';

import { AnimatedEyeIcon } from './animated-eye-button';

export default function PasswordInput({
    startIcon,
    showStrengthIndicator = false,
    name = 'password',
}: {
    startIcon?: React.ReactNode;
    showStrengthIndicator?: boolean;
    name?: string;
}) {
    const id = useId();
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState<boolean>(false);

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

    return (
        <div>
            <div className="*:not-first:mt-2">
                <div className="relative">
                    <Input
                        aria-describedby={`${id}-description`}
                        className="pe-9"
                        id={id}
                        name={name}
                        placeholder="Password"
                        startIcon={startIcon}
                        type={isVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    {/* Password strength indicator */}
                    <div
                        aria-label="Password strength"
                        aria-valuemax={4}
                        aria-valuemin={0}
                        aria-valuenow={strengthScore}
                        className="mt-3 mb-4 bg-border rounded-full w-full h-1 overflow-hidden"
                        role="progressbar"
                    >
                        <div
                            className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                            style={{ width: `${(strengthScore / 4) * 100}%` }}
                        />
                    </div>

                    {/* Password strength description */}
                    <p className="mb-2 font-medium text-foreground text-sm" id={`${id}-description`}>
                        {getStrengthText(strengthScore)}. Must contain:
                    </p>

                    {/* Password requirements list */}
                    <ul aria-label="Password requirements" className="space-y-1.5">
                        {strength.map((req, index) => (
                            <li key={index} className="flex items-center gap-2">
                                {req.met ? (
                                    <CheckIcon aria-hidden="true" className="text-emerald-500" size={16} />
                                ) : (
                                    <XIcon aria-hidden="true" className="text-muted-foreground/80" size={16} />
                                )}
                                <span className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                                    {req.text}
                                    <span className="sr-only">{req.met ? ' - Requirement met' : ' - Requirement not met'}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
