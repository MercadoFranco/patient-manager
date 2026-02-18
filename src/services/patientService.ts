import type { Patient } from "../types/patients";
import mockPatients from "./mockPatients.json";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export async function fetchPatients(): Promise<Array<Patient>> {
    if (USE_MOCK) return mockPatients as Array<Patient>;

    const res = await fetch(`${BASE_URL}/users`, { signal: AbortSignal.timeout(5000) })
    if (!res.ok) throw new Error('Failed to fetch patients')
    return res.json()
}
