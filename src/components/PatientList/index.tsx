import { ClipboardList, TriangleAlert } from "lucide-react";
import { usePatients } from "../../hooks/usePatients";
import { usePatientsStore } from "../../store/PatientsStore";
import type { Patient } from "../../types/patients";

import PatientCard from "../PatientCard";
import Typography from "../ui/Typography";

const PatientCardSkeleton = () => (
    <li className="border border-gray-300 p-4 bg-white rounded-xl shadow-sm flex flex-col animate-pulse">
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-300 shrink-0" />
                <div className="flex flex-col gap-1.5">
                    <div className="h-4 w-28 rounded bg-gray-300" />
                    <div className="h-3 w-20 rounded bg-gray-200" />
                </div>
            </div>
            <div className="h-5 w-14 rounded-full bg-gray-300" />
        </div>
        <div className="flex items-center gap-4 px-4 pb-3 mt-4">
            <div className="h-3 w-16 rounded bg-gray-300" />
            <div className="h-3 w-px bg-gray-300" />
            <div className="h-3 w-24 rounded bg-gray-300" />
        </div>
        <div className="mt-4 flex items-center justify-between">
            <div className="h-3 w-16 rounded bg-gray-300" />
            <div className="h-7 w-12 rounded bg-gray-300" />
        </div>
    </li>
);

const PatientList = () => {
    const { patients } = usePatientsStore();
    const { query, hydrated } = usePatients();


    if (query.isError) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <TriangleAlert className="h-12 w-12 text-red-500" />
                </div>
                <div>
                    <Typography variant="h2">Failed to load patients</Typography>
                    <Typography variant="body" className="mt-1">Please check your connection and try again.</Typography>
                </div>
            </div>
        );
    }

    if (!hydrated && query.isLoading) {
        return (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-4">
                {Array.from({ length: 8 }, (_, i) => <PatientCardSkeleton key={i} />)}
            </ul>
        );
    }

    if (patients.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                    <ClipboardList className="h-12 w-12 text-gray-400" />
                </div>
                <div>
                    <Typography variant="h2">No patients yet</Typography>
                    <Typography variant="body" className="mt-2 text-gray-500 max-w-xs">Get started by adding your first patient by clicking the button on top.</Typography>
                </div>
            </div>
        );
    }

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-4 pb-10">
            {patients.map((p: Patient) => <PatientCard patient={p} key={p.id} />)}
        </ul>
    )
}

export default PatientList;