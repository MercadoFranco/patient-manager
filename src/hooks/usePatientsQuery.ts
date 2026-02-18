import { useQuery } from "@tanstack/react-query";
import { fetchPatients } from "../services/patientService";
import { patientsKeys } from "../services/patientsKeys";

export function usePatientsQuery() {
    return useQuery({
        queryKey: patientsKeys,
        queryFn: async () => {
            const response = await fetchPatients();
            return response;
        },
        staleTime: 60_000,
        retry: 1,
    });
}
