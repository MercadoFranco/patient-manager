import { XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
    isOpen: boolean;
    title?: string;
}

const DURATION = 200;

const Modal = (props: ModalProps) => {
    const { children, isOpen, onClose, title } = props;
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setMounted(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setVisible(true));
            });
        } else {
            document.body.style.overflow = '';
            setVisible(false);
            timeoutRef.current = setTimeout(() => setMounted(false), DURATION);
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        }
        if (isOpen) document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!mounted) return null;

    return createPortal(
        <div
            className={clsx(
                "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity",
                visible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDuration: `${DURATION}ms` }}
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                className={clsx(
                    "relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl transition-all",
                    visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                )}
                style={{ transitionDuration: `${DURATION}ms` }}
            >
                <div className="mb-4 flex items-center justify-between">
                    <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
                        {title}
                    </h2>
                    <button
                        tabIndex={0}
                        onClick={onClose}
                        className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
                        aria-label="Close modal"
                    >
                        <XIcon className="h-8 w-8" />
                    </button>
                </div>

                <div>{children}</div>
            </div>
        </div>,
        document.body
    );
}

export default Modal;
