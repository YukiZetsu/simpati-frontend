import StudentLayout from '@/layouts/student/student-layout';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface StudyProgram {
    id: number;
    name: string;
    description: string;
    student_quota: number;
    remaining_quota: number;
    price: number;
    registration_open: string;
    registration_close: string;
    status: string;
}

interface PageProps {
    program: StudyProgram;
    isRegistered: boolean;
    [key: string]: unknown;
}

function ConfirmModal({
    program,
    onConfirm,
    onCancel,
    processing,
}: {
    program: StudyProgram;
    onConfirm: () => void;
    onCancel: () => void;
    processing: boolean;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md bg-white p-6 shadow-xl">
                <h2 className="mb-2 text-lg font-bold">Konfirmasi Pendaftaran</h2>
                <p className="mb-1 text-sm text-gray-500">Anda akan mendaftar ke program:</p>
                <p className="mb-4 font-semibold">{program.name}</p>
                <div className="mb-6 border p-4 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Harga</span>
                        <span className="font-semibold">Rp {Number(program.price).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="mt-2 flex justify-between">
                        <span className="text-gray-400">Sisa Kuota</span>
                        <span className="font-semibold">{program.remaining_quota} orang</span>
                    </div>
                    <div className="mt-2 flex justify-between">
                        <span className="text-gray-400">Pendaftaran Ditutup</span>
                        <span className="font-semibold">{program.registration_close}</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        disabled={processing}
                        className="flex-1 border py-2 text-sm font-semibold hover:bg-gray-100 disabled:opacity-50"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={processing}
                        className="flex-1 bg-black py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                    >
                        {processing ? 'Mendaftar...' : 'Konfirmasi'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ProgramDetail() {
    const { program, isRegistered } = usePage<PageProps>().props;
    const [showModal, setShowModal] = useState(false);
    const { post, processing } = useForm({
        program_id: program.id,
    });

    function handleConfirm() {
        post('/student/register-program', {
            onSuccess: () => setShowModal(false),
        });
    }

    return (
        <StudentLayout active="programs">
            {showModal && <ConfirmModal program={program} onConfirm={handleConfirm} onCancel={() => setShowModal(false)} processing={processing} />}

            <div className="mb-6 flex items-center gap-3">
                <a href="/student/dashboard/programs" className="text-sm text-gray-400 hover:text-black">
                    ← Kembali
                </a>
            </div>

            <div className="border bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{program.name}</h1>
                        <span className="mt-2 inline-block bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-700">Open</span>
                    </div>
                    <p className="text-2xl font-bold">Rp {Number(program.price).toLocaleString('id-ID')}</p>
                </div>

                <p className="mb-8 text-gray-600">{program.description}</p>

                <div className="mb-8 grid grid-cols-2 gap-4">
                    <div className="border p-4">
                        <p className="text-xs text-gray-400">Kuota Awal</p>
                        <p className="mt-1 font-semibold">{program.student_quota} orang</p>
                    </div>
                    <div className="border p-4">
                        <p className="text-xs text-gray-400">Sisa Kuota</p>
                        <p className="mt-1 font-semibold">{program.remaining_quota} orang</p>
                    </div>
                    <div className="border p-4">
                        <p className="text-xs text-gray-400">Pendaftaran Dibuka</p>
                        <p className="mt-1 font-semibold">{program.registration_open}</p>
                    </div>
                    <div className="border p-4">
                        <p className="text-xs text-gray-400">Pendaftaran Ditutup</p>
                        <p className="mt-1 font-semibold">{program.registration_close}</p>
                    </div>
                </div>

                {isRegistered ? (
                    <button disabled className="w-full cursor-not-allowed bg-gray-200 py-3 text-sm font-semibold text-gray-500">
                        Sudah Terdaftar
                    </button>
                ) : program.remaining_quota <= 0 ? (
                    <button disabled className="w-full cursor-not-allowed bg-gray-200 py-3 text-sm font-semibold text-gray-500">
                        Kuota Penuh
                    </button>
                ) : (
                    <button onClick={() => setShowModal(true)} className="w-full bg-black py-3 text-sm font-semibold text-white hover:bg-gray-800">
                        Daftar Sekarang
                    </button>
                )}
            </div>
        </StudentLayout>
    );
}
