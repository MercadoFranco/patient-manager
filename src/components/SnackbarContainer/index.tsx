import { useUIStore } from "../../store/uiStore";
import clsx from "clsx";

const typeStyles = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
};

const SnackbarContainer = () => {
    const { snackbars, dismissSnackbar } = useUIStore();

    if (snackbars.length === 0) return null;

    return (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-4 z-60 flex flex-col gap-2">
            {snackbars.map((snackbar) => (
                <div
                    key={snackbar.id}
                    className={clsx(
                        "rounded-lg px-4 py-3 text-sm text-white shadow-lg flex items-center gap-3",
                        typeStyles[snackbar.type],
                        snackbar.dismissing ? "animate-fade-out-down" : "animate-fade-in-up"
                    )}
                >
                    <span>{snackbar.text}</span>
                    <button
                        onClick={() => dismissSnackbar(snackbar.id)}
                        className="ml-auto text-white/70 hover:text-white transition-colors"
                    >
                        &times;
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SnackbarContainer;
