import type { Patient } from "../../types/patients";
import Button from "../ui/Button";
import Typography from "../ui/Typography";
import { EditIcon, UserRound } from "lucide-react";
import { useEffect, useState, type SyntheticEvent } from "react";
import { usePatientsStore } from "../../store/PatientsStore";
import clsx from "clsx";
import { formatDate } from "../../utils/formatDate";

type PatientCardProps = {
    patient: Patient;
}

const statusConfig = {
    active: { label: "Active", classes: "bg-green-100 text-green-700" },
    inactive: { label: "Inactive", classes: "bg-gray-100 text-gray-500" },
    critical: { label: "Critical", classes: "bg-red-100 text-red-600" },
};

const PatientCard = (props: PatientCardProps) => {
    const { patient } = props;
    const [expanded, setExpanded] = useState(false)
    const [imgError, setImgError] = useState(false)
    const { startEditPatient } = usePatientsStore();

    useEffect(() => {
        setImgError(false);
    }, [patient.avatar]);

    const { name, description, avatar, createdAt, status, bloodType, email, phone, dateOfBirth, appointmentDate, website } = patient;

    const onImageError = (_: SyntheticEvent<HTMLImageElement, Event>) => {
        setImgError(true);
    }

    const { label, classes } = statusConfig[status] ?? statusConfig.active;


    return (
        <li className="border border-gray-300 p-4 bg-white rounded-xl shadow-sm flex flex-col">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                    {avatar && !imgError ? (
                        <img
                            src={avatar}
                            className="h-10 w-10 rounded-full object-cover shrink-0"
                            onError={onImageError}
                            alt={name}
                        />
                    ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                            <UserRound className="h-5 w-5 text-gray-400" />
                        </div>
                    )}
                    <div className="flex flex-col min-w-0">
                        <Typography variant="h4" className="truncate">{name}</Typography>
                        <Typography variant="caption">Created {formatDate(createdAt)}</Typography>
                    </div>
                </div>
                <span className={clsx('shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium', classes)}>
                    {label}
                </span>
            </div>

            <div className="flex items-center justify-between gap-4 px-4 pb-1">
                {bloodType && (
                    <div className="flex flex-col mt-4">
                        <Typography variant="caption">Blood</Typography>
                        <Typography variant="body" className="font-semibold">{bloodType}</Typography>
                    </div>
                )}
                {dateOfBirth && (
                    <div className="flex flex-col mt-4">
                        <Typography variant="caption">Birth Date</Typography>
                        <Typography variant="body" className="font-semibold">{formatDate(dateOfBirth)}</Typography>
                    </div>
                )}
                {appointmentDate && (
                    <div className="flex flex-col mt-4">
                        <Typography variant="caption">Next Appt</Typography>
                        <Typography variant="body" className="font-semibold">{formatDate(appointmentDate, true)}</Typography>
                    </div>
                )}
            </div>

            <div className={clsx('transition-all duration-300 ease-in-out overflow-auto', expanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0')}>
                <div className="flex flex-col px-4 pb-3 mb-1">
                    <div className="grid grid-cols-2 gap-1 mb-1">
                        {email && (
                            <div className="flex flex-col">
                                <Typography variant="caption">Email</Typography>
                                <Typography variant="body" className="truncate font-semibold">{email}</Typography>
                            </div>
                        )}
                        {phone && (
                            <div className="flex flex-col">
                                <Typography variant="caption">Phone</Typography>
                                <Typography variant="body" className="font-semibold">{phone}</Typography>
                            </div>
                        )}
                    </div>
                    {website && (
                        <div className="flex flex-col">
                            <Typography variant="caption">Website</Typography>
                            <Typography variant="body" className="truncate font-semibold">{website}</Typography>
                        </div>
                    )}
                    <Typography variant="caption" className="mt-2">Description</Typography>
                    <Typography variant="body" className="font-semibold">{description}</Typography>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <Button variant="quiet" size="sm" onClick={() => setExpanded(!expanded)}>
                    {expanded ? 'Show less' : 'Show more'}
                </Button>
                <Button onClick={() => startEditPatient(patient)} className="flex gap-1 items-center" size="sm">
                    Edit <EditIcon className="h-4 w-4" />
                </Button>
            </div>
        </li>
    );
}

export default PatientCard;