import { forwardRef, type SelectHTMLAttributes } from 'react'
import clsx from 'clsx'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    label: string
    error?: string
    options: { label: string; value: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">{label}</label>
                <select
                    ref={ref}
                    className={clsx(
                        'rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 bg-white',
                        error ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    )}
                    {...props}
                >
                    <option value="" disabled>Select an option</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {error && <span className="text-xs text-red-500">{error}</span>}
            </div>
        )
    }
)

Select.displayName = 'Select';

export default Select;