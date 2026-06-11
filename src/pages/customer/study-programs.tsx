import StudentLayout from '@/layouts/student/student-layout';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface StudyProgram { id: number; name: string; description: string; student_quota: number; remaining_quota: number; price: number; registration_open: string; registration_close: string; status: string; }

const dummyPrograms: StudyProgram[] = [
    { id: 1, name: 'Teknik Informatika', description: 'Program studi di bidang teknologi informasi.', student_quota: 30, remaining_quota: 15, price: 5000000, registration_open: '2025-01-01', registration_close: '2025-03-01', status: 'open' },
    { id: 2, name: 'Sistem Informasi', description: 'Program studi di bidang sistem informasi bisnis.', student_quota: 25, remaining_quota: 10, price: 4500000, registration_open: '2025-01-01', registration_close: '2025-03-01', status: 'open' },
];

function ProgramCard({ program }: { program: StudyProgram }) {
    return (
        <div className="border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
                <h2 className="text-lg font-bold">{program.name}</h2>
                <span className="bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">Open</span>
            </div>
            <p className="mb-4 text-sm text-gray-500">{program.description}</p>
            <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                <div><p className="text-xs text-gray-400">Sisa Kuota</p><p className="font-semibold">{program.remaining_quota} orang</p></div>
                <div><p className="text-xs text-gray-400">Harga</p><p className="font-semibold">Rp {Number(program.price).toLocaleString('id-ID')}</p></div>
                <div><p className="text-xs text-gray-400">Pendaftaran Dibuka</p><p className="font-semibold">{program.registration_open}</p></div>
                <div><p className="text-xs text-gray-400">Pendaftaran Ditutup</p><p className="font-semibold">{program.registration_close}</p></div>
            </div>
            <Link to={'/student/programs/' + program.id}
                className="block w-full bg-black py-2 text-center text-sm font-semibold text-white hover:bg-gray-800">
                Lihat Detail
            </Link>
        </div>
    );
}

export default function Programs() {
    const [programs] = useState<StudyProgram[]>(dummyPrograms);

    return (
        <StudentLayout active="programs">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Program Studi</h1>
                <p className="text-gray-500">Pilih program studi independen yang tersedia</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {programs.length === 0
                    ? <p className="text-gray-400">Belum ada program studi yang tersedia.</p>
                    : programs.map((program) => <ProgramCard key={program.id} program={program} />)
                }
            </div>
        </StudentLayout>
    );
}