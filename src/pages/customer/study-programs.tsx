import StudentLayout from '@/layouts/student/student-layout';
import { Link, useForm, usePage } from '@inertiajs/react';
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
    programs: StudyProgram[];
    registeredProgramIds: number[];
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
                        <span className="text-gray-400">Kuota</span>
                        <span className="font-semibold">{program.student_quota} orang</span>
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

function ProgramCard({ program }: { program: StudyProgram; isRegistered: boolean }) {
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
        <>
            {showModal && <ConfirmModal program={program} onConfirm={handleConfirm} onCancel={() => setShowModal(false)} processing={processing} />}

            <div className="border bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                    <h2 className="text-lg font-bold">{program.name}</h2>
                    <span className="bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">Open</span>
                </div>

                <p className="mb-4 text-sm text-gray-500">{program.description}</p>

                <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                        <p className="text-xs text-gray-400">Sisa Kuota</p>
                        <p className="font-semibold">{program.remaining_quota} orang</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Harga</p>
                        <p className="font-semibold">Rp {Number(program.price).toLocaleString('id-ID')}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Pendaftaran Dibuka</p>
                        <p className="font-semibold">{program.registration_open}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Pendaftaran Ditutup</p>
                        <p className="font-semibold">{program.registration_close}</p>
                    </div>
                </div>

                <Link
                    href={'/student/dashboard/programs/' + program.id}
                    className="block w-full bg-black py-2 text-center text-sm font-semibold text-white hover:bg-gray-800"
                >
                    Lihat Detail
                </Link>
            </div>
        </>
    );
}

export default function Programs() {
    const { programs, registeredProgramIds } = usePage<PageProps>().props;

    return (
        <StudentLayout active="programs">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Program Studi</h1>
                <p className="text-gray-500">Pilih program studi independen yang tersedia</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {programs.length === 0 ? (
                    <p className="text-gray-400">Belum ada program studi yang tersedia.</p>
                ) : (
                    programs.map((program) => (
                        <ProgramCard key={program.id} program={program} isRegistered={registeredProgramIds?.includes(program.id)} />
                    ))
                )}
            </div>
        </StudentLayout>
    );
}
