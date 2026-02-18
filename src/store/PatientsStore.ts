import { create } from "zustand";
import type { Patient, PatientFormData } from "../types/patients";
import { useUIStore } from "./uiStore";

type PatientsState = {
    hydrated: boolean;
    patients: Array<Patient>;
    selectedPatient: Patient | null;

    setPatients: (items: Array<Patient>) => void;

    startCreatePatient: () => void;
    startEditPatient: (patient: Patient) => void;

    createPatient: (formData: PatientFormData) => void;
    editPatient: (id: string, formData: PatientFormData) => void;
};

export const usePatientsStore = create<PatientsState>((set) => ({
    hydrated: false,
    patients: [],
    selectedPatient: null,

    setPatients: (items) => set({ patients: items, hydrated: true }),

    startCreatePatient: () => {
        set({ selectedPatient: null });
        useUIStore.getState().openModal({ modalId: "patient-form", title: "New patient" });
    },

    startEditPatient: (patient) => {
        set({ selectedPatient: patient });
        useUIStore.getState().openModal({ modalId: "patient-form", title: `Editing patient ${patient.name}` });
    },

    createPatient: (formData) => {
        const newPatient: Patient = {
            ...formData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };
        set((s) => ({ patients: [newPatient, ...s.patients], selectedPatient: null }));
        useUIStore.getState().closeModal();
        useUIStore.getState().showSnackbar({ text: "Patient created successfully", type: "success" });
    },

    editPatient: (id, formData) => {
        set((s) => ({
            patients: s.patients.map((p) => (p.id === id ? { ...p, ...formData } : p)),
            selectedPatient: null,
        }));
        useUIStore.getState().closeModal();
        useUIStore.getState().showSnackbar({ text: "Patient updated successfully", type: "success" });
    },
}));
