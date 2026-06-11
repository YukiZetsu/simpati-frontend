import AppLayout from '@/layouts/app-layout'; // Ganti pakai AppLayout sementara agar tidak error
import { useState } from 'react';

interface StudyProgram {
    id: number;
    name: string;
    description: string;
    student_quota: number;
    price: number;
    registration_open: string;
    registration_close: string;
    status: 'draft' | 'open' | 'closed';
}

export default function StudyProgram() {
    // 1. State Data Tabel (Dummy sementara pengganti props backend)
    const [programs, setPrograms] = useState<StudyProgram[]>([
        {
            id: 1,
            name: 'Fullstack Web Development',
            description: 'Bootcamp intensif React dan Laravel.',
            student_quota: 50,
            price: 2500000,
            registration_open: '2026-06-15',
            registration_close: '2026-07-15',
            status: 'open'
        }
    ]);

    const [editingProgram, setEditingProgram] = useState<StudyProgram | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // 2. State untuk Form Input
    const [data, setData] = useState({
        name: '',
        description: '',
        student_quota: '',
        price: '',
        registration_open: '',
        registration_close: '',
        status: 'draft',
    });

    const reset = () => {
        setData({
            name: '',
            description: '',
            student_quota: '',
            price: '',
            registration_open: '',
            registration_close: '',
            status: 'draft',
        });
        setErrors({});
    };

    function handleAdd() {
        reset();
        setEditingProgram(null);
        setShowForm(true);
    }

    function handleEdit(program: StudyProgram) {
        setData({
            name: program.name,
            description: program.description,
            student_quota: String(program.student_quota),
            price: String(program.price),
            registration_open: program.registration_open,
            registration_close: program.registration_close,
            status: program.status,
        });
        setEditingProgram(program);
        setShowForm(true);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setProcessing(true);

        // Simulasi Loading API (0.5 detik) lalu update tabel
        setTimeout(() => {
            if (editingProgram) {
                // Proses Edit Data
                setPrograms(programs.map(p => p.id === editingProgram.id ? { 
                    ...p, 
                    ...data, 
                    student_quota: Number(data.student_quota), 
                    price: Number(data.price),
                    status: data.status as 'draft' | 'open' | 'closed'
                } : p));
            } else {
                // Proses Tambah Data Baru
                const newProgram = {
                    ...data,
                    id: Date.now(),
                    student_quota: Number(data.student_quota),
                    price: Number(data.price),
                    status: data.status as 'draft' | 'open' | 'closed'
                };
                setPrograms([...programs, newProgram]);
            }

            setProcessing(false);
            setShowForm(false);
            reset();
        }, 500);
    }

    function handleDelete(id: number) {
        if (confirm('Yakin ingin menghapus program ini?')) {
            setPrograms(programs.filter(p => p.id !== id));
        }
    }

    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Kelola Program</h1>
                        <p className="text-gray-500">Kelola program studi independen</p>
                    </div>
                    <button onClick={handleAdd} className="cursor-pointer bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 rounded-md">
                        Tambah Program
                    </button>
                </div>

                {showForm && (
                    <div className="mb-6 rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                        <h2 className="mb-4 font-bold">{editingProgram ? 'Edit Program' : 'Tambah Program'}</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1 block text-sm font-semibold">Nama Program</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    className="w-full rounded-md border px-3 py-2 text-sm bg-background"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold">Kuota</label>
                                <input
                                    type="number"
                                    value={data.student_quota}
                                    onChange={(e) => setData({ ...data, student_quota: e.target.value })}
                                    className="w-full rounded-md border px-3 py-2 text-sm bg-background"
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="mb-1 block text-sm font-semibold">Deskripsi</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData({ ...data, description: e.target.value })}
                                    rows={3}
                                    className="w-full rounded-md border px-3 py-2 text-sm bg-background"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold">Harga</label>
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData({ ...data, price: e.target.value })}
                                    className="w-full rounded-md border px-3 py-2 text-sm bg-background"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold">Status</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData({ ...data, status: e.target.value })}
                                    className="w-full rounded-md border px-3 py-2 text-sm bg-background"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold">Pendaftaran Dibuka</label>
                                <input
                                    type="date"
                                    value={data.registration_open}
                                    onChange={(e) => setData({ ...data, registration_open: e.target.value })}
                                    className="w-full rounded-md border px-3 py-2 text-sm bg-background"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold">Pendaftaran Ditutup</label>
                                <input
                                    type="date"
                                    value={data.registration_close}
                                    onChange={(e) => setData({ ...data, registration_close: e.target.value })}
                                    className="w-full rounded-md border px-3 py-2 text-sm bg-background"
                                    required
                                />
                            </div>

                            <div className="col-span-2 flex gap-2 mt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="rounded-md border px-4 py-2 text-sm font-semibold hover:bg-muted"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="px-6 py-3 text-center font-semibold">Nama Program</th>
                                <th className="px-6 py-3 text-center font-semibold">Kuota</th>
                                <th className="px-6 py-3 text-center font-semibold">Harga</th>
                                <th className="px-6 py-3 text-center font-semibold">Pendaftaran</th>
                                <th className="px-6 py-3 text-center font-semibold">Status</th>
                                <th className="px-6 py-3 text-center font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                                        Belum ada program studi.
                                    </td>
                                </tr>
                            ) : (
                                programs.map((program) => (
                                    <tr key={program.id} className="border-b last:border-0 hover:bg-muted/50">
                                        <td className="px-6 py-4 text-center">{program.name}</td>
                                        <td className="px-6 py-4 text-center">{program.student_quota}</td>
                                        <td className="px-6 py-4 text-center">Rp {Number(program.price).toLocaleString('id-ID')}</td>
                                        <td className="px-6 py-4 text-center">
                                            {program.registration_open} s/d {program.registration_close}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-md text-xs font-semibold ${program.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                {program.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center gap-3">
                                                <button
                                                    onClick={() => handleEdit(program)}
                                                    className="cursor-pointer text-sm font-semibold text-blue-500 hover:text-blue-700"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(program.id)}
                                                    className="cursor-pointer text-sm font-semibold text-red-500 hover:text-red-700"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}