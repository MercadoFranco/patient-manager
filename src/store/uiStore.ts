import { create } from "zustand";

type SnackbarType = "success" | "error" | "info";

type Snackbar = {
    id: string;
    text: string;
    type: SnackbarType;
    dismissing: boolean;
};

type ModalState = {
    modalId: string;
    title: string;
} | null;

const SNACKBAR_DURATION = 3500;
const SNACKBAR_EXIT_DURATION = 300;

type UIState = {
    modal: ModalState;
    openModal: (opts: { modalId: string; title: string }) => void;
    closeModal: () => void;

    snackbars: Snackbar[];
    showSnackbar: (opts: { text: string; type: SnackbarType }) => void;
    dismissSnackbar: (id: string) => void;
};

export const useUIStore = create<UIState>((set) => {
    const removeSnackbar = (id: string) =>
        set((state) => ({ snackbars: state.snackbars.filter((s) => s.id !== id) }));

    const startDismiss = (id: string) => {
        set((state) => ({
            snackbars: state.snackbars.map((s) =>
                s.id === id ? { ...s, dismissing: true } : s
            ),
        }));
        setTimeout(() => removeSnackbar(id), SNACKBAR_EXIT_DURATION);
    };

    return {
        modal: null,
        openModal: (opts) => set({ modal: opts }),
        closeModal: () => set({ modal: null }),

        snackbars: [],
        showSnackbar: ({ text, type }) => {
            const id = crypto.randomUUID();
            set((state) => ({ snackbars: [...state.snackbars, { id, text, type, dismissing: false }] }));
            setTimeout(() => startDismiss(id), SNACKBAR_DURATION);
        },
        dismissSnackbar: (id) => startDismiss(id),
    };
});
