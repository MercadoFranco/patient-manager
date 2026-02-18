import { forwardRef, type InputHTMLAttributes } from 'react'
import clsx from 'clsx'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
                <input
                    ref={ref}
                    className={clsx(
                        'rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500',
                        error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
                    )}
                    {...props}
                />
                {error && (
                    <span className="text-xs text-red-500">{error}</span>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input';

export default Input;