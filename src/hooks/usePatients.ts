import { useEffect } from "react";
import { usePatientsQuery } from "./usePatientsQuery";
import { usePatientsStore } from "../store/PatientsStore";

export function usePatients() {
    const hydrated = usePatientsStore((s) => s.hydrated);
    const setPatients = usePatientsStore((s) => s.setPatients);

    const query = usePatientsQuery();

    useEffect(() => {
        if (!hydrated && query.data) {
            setPatients(query.data);
        }
    }, [hydrated, query.data, setPatients]);

    return { query, hydrated };
}
