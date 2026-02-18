import { z } from 'zod'


export const patientSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    email: z.email('Invalid email').optional().or(z.literal('')),
    phone: z.string(),
    dateOfBirth: z.string(),
    status: z.enum(['active', 'inactive', 'critical']),
    bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
    appointmentDate: z.string(),
    website: z.string(),
    avatar: z.url('Must be a valid URL').or(z.literal('')),
})
// Note: I've added some extra fields beyond what the provided api responds to make the app make more sense for a Patient Manager.


export type PatientFormData = z.infer<typeof patientSchema>;

export type Patient = z.infer<typeof patientSchema> & {
    id: string;
    createdAt: string;
}
