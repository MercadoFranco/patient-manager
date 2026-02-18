import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    children: React.ReactNode;
};

const variants = {
    primary: 'bg-blue-600 text-white font-medium hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
    secondary: 'bg-white text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
    quiet: 'text-blue-800 font-semibold hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
}

const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
}

const Button = (props: ButtonProps) => {
    const { children, variant = 'primary', size = 'md', className = '', ...rest } = props;
    const baseClasses = 'rounded-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1'

    return (
        <button className={clsx(baseClasses, variants[variant], sizes[size], className)} {...rest}>
            {children}
        </button>
    );
}

export default Button;