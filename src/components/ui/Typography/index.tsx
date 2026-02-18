import clsx from "clsx";

type TypographyProps = {
    variant?: keyof typeof variants;
    className?: string;
    as?: React.ElementType;
    children: React.ReactNode;
}

const variants = {
    h1: 'text-3xl font-bold text-gray-900',
    h2: 'text-2xl font-semibold text-gray-800',
    h3: 'text-xl font-semibold text-gray-800',
    h4: 'text-lg font-medium text-gray-700',
    body: 'text-sm text-gray-600',
    caption: 'text-xs text-gray-400',
}

const Typography = (props: TypographyProps) => {
    const { as, variant = 'body', className = '', children } = props;

    const Tag = as ?? (variant === 'body' || variant === 'caption' ? 'p' : variant)

    return (
        <Tag className={clsx(variants[variant], className)}>
            {children}
        </Tag>
    );
}

export default Typography;