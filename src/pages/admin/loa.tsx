import AdminLayout from '@/layouts/admin/admin-layout';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Loa {
    id: number;
    file: string;
}

interface StudentProfile {
    full_name: string;
}

interface Student {
    username: string;
    studentProfile: StudentProfile | null;
}

interface Program {
    name: string;
}

interface Registration {
    id: number;
    student: Student;
    program: Program;
    loa: Loa | null;
}

interface PageProps {
    registrations: Registration[];
    [key: string]: unknown;
}

function UploadLoaModal({ registration, onClose }: { registration: Registration; onClose: () => void }) {
    const { setData, post, processing, errors } = useForm<{
        registration_id: number;
        file: File | null;
    }>({
        registration_id: registration.id,
        file: null,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/dashboard/loa', {
            forceFormData: true,
            onSuccess: () => onClose(),
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md bg-white p-6 shadow-xl">
                <h2 className="mb-2 text-lg font-bold">Upload LOA</h2>
                <p className="mb-4 text-sm text-gray-500">{registration.student.studentProfile?.full_name ?? registration.student.username}</p>
                <p className="mb-6 text-sm text-gray-500">{registration.program.name}</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">File LOA</label>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setData('file', e.target.files?.[0] || null)}
                            className="block w-full border px-3 py-2 text-sm"
                        />
                        <p className="mt-1 text-xs text-gray-400">Format: PDF. Maks 5MB.</p>
                        {errors.file && <p className="mt-1 text-xs text-red-500">{errors.file}</p>}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={processing}
                            className="flex-1 border py-2 text-sm font-semibold hover:bg-gray-100 disabled:opacity-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 bg-black py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                        >
                            {processing ? 'Mengupload...' : 'Upload'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function LoaPage() {
    const { registrations } = usePage<PageProps>().props;
    const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
    const [search, setSearch] = useState('');
    const { delete: destroy, processing } = useForm({});

    const filtered = registrations.filter((reg) => {
        const name = reg.student.studentProfile?.full_name ?? reg.student.username;
        const program = reg.program.name;
        return name.toLowerCase().includes(search.toLowerCase()) || program.toLowerCase().includes(search.toLowerCase());
    });

    function handleDelete(loaId: number) {
        destroy('/admin/dashboard/loa/' + loaId);
    }

    return (
        <AdminLayout active="loa">
            {selectedRegistration && <UploadLoaModal registration={selectedRegistration} onClose={() => setSelectedRegistration(null)} />}

            <div className="mb-6">
                <h1 className="text-2xl font-bold">Kelola LOA</h1>
                <p className="text-gray-500">Upload LOA untuk mahasiswa yang telah diterima</p>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Cari mahasiswa atau program..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border bg-white px-4 py-3 text-sm text-black focus:outline-none"
                />
            </div>

            <div className="overflow-x-auto border bg-white shadow-sm">
                <table className="w-full text-sm">
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-center font-semibold">Mahasiswa</th>
                            <th className="px-6 py-3 text-center font-semibold">Program</th>
                            <th className="px-6 py-3 text-center font-semibold">Status LOA</th>
                            <th className="px-6 py-3 text-center font-semibold">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                    Belum ada mahasiswa yang diterima.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((registration) => (
                                <tr key={registration.id} className="border-b last:border-0">
                                    <td className="px-6 py-4 text-center">
                                        {registration.student.studentProfile?.full_name ?? registration.student.username}
                                    </td>
                                    <td className="px-6 py-4 text-center">{registration.program.name}</td>
                                    <td className="px-6 py-4 text-center">
                                        {registration.loa ? (
                                            <span className="bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">Sudah Upload</span>
                                        ) : (
                                            <span className="bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700">Belum Upload</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            {registration.loa ? (
                                                <>
                                                    <a
                                                        href={'/storage/' + registration.loa.file}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm font-semibold underline hover:text-gray-600"
                                                    >
                                                        Lihat
                                                    </a>
                                                    <button
                                                        onClick={() => setSelectedRegistration(registration)}
                                                        className="text-sm font-semibold underline hover:text-gray-600"
                                                    >
                                                        Ganti
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(registration.loa!.id)}
                                                        disabled={processing}
                                                        className="text-sm font-semibold text-red-500 underline hover:text-red-700 disabled:opacity-50"
                                                    >
                                                        Hapus
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => setSelectedRegistration(registration)}
                                                    className="text-sm font-semibold underline hover:text-gray-600"
                                                >
                                                    Upload LOA
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
