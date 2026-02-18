import PatientModal from './components/PatientModal';
import PatientList from './components/PatientList';

import Typography from './components/ui/Typography';
import Button from './components/ui/Button';
import { useUIStore } from './store/uiStore';
import { usePatientsStore } from './store/PatientsStore';
import SnackbarContainer from './components/SnackbarContainer';
import type { PatientFormData } from './types/patients';
import { Plus } from 'lucide-react';

function App() {
  const modal = useUIStore((s) => s.modal);
  const closeModal = useUIStore((s) => s.closeModal);

  const { startCreatePatient, selectedPatient, createPatient, editPatient } = usePatientsStore();

  const isPatientModalOpen = modal?.modalId === 'patient-form';

  const handlePatientSubmit = (data: PatientFormData) => {
    if (selectedPatient) {
      editPatient(selectedPatient.id, data);
    } else {
      createPatient(data);
    }
  };

  return (
    <div className='h-screen w-full flex flex-col px-4 items-center'>
      <header className='w-full max-w-7xl flex justify-between items-center py-6'>
        <Typography variant='h1'>Patient Manager</Typography>
        <Button onClick={startCreatePatient} className='hidden sm:flex items-center gap-1.5'>
          Add new patient <Plus className='h-4.5 w-4.5' />
        </Button>
      </header>
      <main className='w-full max-w-7xl mt-18 pb-24 sm:pb-0'>
        <PatientList />
        <PatientModal
          isOpen={isPatientModalOpen}
          onClose={closeModal}
          title={modal?.title ?? ''}
          patient={selectedPatient}
          onSubmit={handlePatientSubmit}
        />
      </main>
      <footer className='fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 sm:hidden'>
        <Button onClick={startCreatePatient} className='w-full flex items-center justify-center gap-1.5'>
          Add new patient <Plus className='h-4.5 w-4.5' />
        </Button>
      </footer>
      <SnackbarContainer />
    </div>
  )
}

export default App
