import { useForm } from "react-hook-form";
import { patientSchema } from "../../types/patients";
import type { Patient, PatientFormData } from "../../types/patients";
import Modal from "../ui/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import clsx from "clsx";

type PatientModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    patient: Patient | null;
    onSubmit: (data: PatientFormData) => void;
}

const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Critical', value: 'critical' },
]

const bloodTypeOptions = [
    'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'
].map((t) => ({ label: t, value: t }))


const PatientModal = (props: PatientModalProps) => {
    const { isOpen, onClose, title, patient, onSubmit: onSubmitProp } = props;
    const isEditing = patient !== null;

    const emptyDefaults: PatientFormData = {
        name: '',
        description: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        status: 'active',
        bloodType: 'A+',
        appointmentDate: '',
        website: '',
        avatar: '',
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<PatientFormData>({
        resolver: zodResolver(patientSchema),
        defaultValues: emptyDefaults,
    });

    useEffect(() => {
        if (patient) {
            reset({
                name: patient.name ?? '',
                description: patient.description ?? '',
                email: patient.email ?? '',
                phone: patient.phone ?? '',
                dateOfBirth: patient.dateOfBirth ?? '',
                status: patient.status ?? 'active',
                bloodType: patient.bloodType ?? 'A+',
                appointmentDate: patient.appointmentDate ?? '',
                website: patient.website ?? '',
                avatar: patient.avatar ?? '',
            })
        } else {
            reset(emptyDefaults);
        }
    }, [patient, reset]);

    useEffect(() => {
        if (!isOpen) reset(emptyDefaults);
    }, [isOpen, reset]);

    const onSubmit = (data: PatientFormData) => {
        onSubmitProp(data);
    }

    return (
        <Modal title={title} onClose={onClose} isOpen={isOpen} >
            <form onSubmit={handleSubmit(onSubmit)} className="py-2 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Name"
                        error={errors.name?.message}
                        {...register('name')}
                    />
                    <Input
                        label="Email"
                        type="email"
                        error={errors.email?.message}
                        {...register('email')}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Phone"
                        type="tel"
                        error={errors.phone?.message}
                        {...register('phone')}
                    />
                    <Input
                        label="Date of Birth"
                        type="date"
                        error={errors.dateOfBirth?.message}
                        {...register('dateOfBirth')}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Select
                        label="Status"
                        options={statusOptions}
                        error={errors.status?.message}
                        {...register('status')}
                    />
                    <Select
                        label="Blood Type"
                        options={bloodTypeOptions}
                        error={errors.bloodType?.message}
                        {...register('bloodType')}
                    />
                </div>
                <Input
                    label="Appointment Date"
                    type="datetime-local"
                    error={errors.appointmentDate?.message}
                    {...register('appointmentDate')}
                />
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        rows={3}
                        className={clsx(
                            'rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 resize-none',
                            errors.description ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
                        )}
                        {...register('description')}
                    />
                    {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Website"
                        error={errors.website?.message}
                        {...register('website')}
                    />
                    <Input
                        label="Avatar URL"
                        error={errors.avatar?.message}
                        {...register('avatar')}
                    />
                </div>

                <div className="mt-2 flex justify-end gap-2">
                    <Button variant="quiet" type="button" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" disabled={isSubmitting || !isDirty}>
                        {isEditing ? 'Save changes' : 'Add patient'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default PatientModal;
