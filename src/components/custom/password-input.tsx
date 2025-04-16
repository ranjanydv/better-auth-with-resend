'use client';

import { CheckIcon, XIcon } from 'lucide-react';
import { useId, useMemo, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Eye, EyeSlash } from '@/lib/icons';
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
                        startIcon={startIcon}
                        id={id}
						name={name}
                        className="pe-9"
                        placeholder="Password"
                        type={isVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-describedby={`${id}-description`}
                    />
                    <button
                        className="focus:z-10 absolute inset-y-0 flex justify-center items-center disabled:opacity-50 focus-visible:border-ring rounded-e-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 w-9 h-full text-muted-foreground/80 hover:text-foreground transition-[color,box-shadow] disabled:cursor-not-allowed disabled:pointer-events-none end-1"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label={isVisible ? 'Hide password' : 'Show password'}
                        aria-pressed={isVisible}
                        aria-controls="password">
                        <AnimatedEyeIcon isVisible={isVisible} aria-hidden="true" />
                    </button>
                </div>
            </div>
            {showStrengthIndicator && (
                <>
                    {/* Password strength indicator */}
                    <div
                        className="mt-3 mb-4 bg-border rounded-full w-full h-1 overflow-hidden"
                        role="progressbar"
                        aria-valuenow={strengthScore}
                        aria-valuemin={0}
                        aria-valuemax={4}
                        aria-label="Password strength">
                        <div
                            className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                            style={{ width: `${(strengthScore / 4) * 100}%` }}></div>
                    </div>

                    {/* Password strength description */}
                    <p id={`${id}-description`} className="mb-2 font-medium text-foreground text-sm">
                        {getStrengthText(strengthScore)}. Must contain:
                    </p>

                    {/* Password requirements list */}
                    <ul className="space-y-1.5" aria-label="Password requirements">
                        {strength.map((req, index) => (
                            <li key={index} className="flex items-center gap-2">
                                {req.met ? (
                                    <CheckIcon size={16} className="text-emerald-500" aria-hidden="true" />
                                ) : (
                                    <XIcon size={16} className="text-muted-foreground/80" aria-hidden="true" />
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
