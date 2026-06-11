import StudentLayout from '@/layouts/student/student-layout';
import { useState } from 'react';

interface Loa { id: number; file: string; }
interface Registration { id: number; program: { name: string }; loa: Loa | null; }

// TODO: ganti dengan fetch api.get('/student/loa')
const dummyRegistrations: Registration[] = [
    { id: 1, program: { name: 'Teknik Informatika' }, loa: { id: 1, file: 'loa/ti.pdf' } },
    { id: 2, program: { name: 'Sistem Informasi' }, loa: null },
];

export default function LoaPage() {
    const [registrations] = useState<Registration[]>(dummyRegistrations);

    return (
        <StudentLayout active="loa">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">LOA</h1>
                <p className="text-gray-500">Download Letter of Acceptance program studi Anda</p>
            </div>
            <div className="border bg-white shadow-sm">
                <table className="w-full text-sm">
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-center font-semibold">Program</th>
                            <th className="px-6 py-3 text-center font-semibold">Status LOA</th>
                            <th className="px-6 py-3 text-center font-semibold">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.length === 0 ? (
                            <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-400">Belum ada LOA yang tersedia.</td></tr>
                        ) : (
                            registrations.map((reg) => (
                                <tr key={reg.id} className="border-b last:border-0">
                                    <td className="px-6 py-4 text-center">{reg.program.name}</td>
                                    <td className="px-6 py-4 text-center">
                                        {reg.loa
                                            ? <span className="bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">Tersedia</span>
                                            : <span className="bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700">Belum Tersedia</span>}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {reg.loa
                                            ? <a href={'/storage/' + reg.loa.file} target="_blank" rel="noopener noreferrer"
                                                className="text-sm font-semibold underline hover:text-gray-600">Download</a>
                                            : <span className="text-sm text-gray-400">-</span>}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </StudentLayout>
    );
}