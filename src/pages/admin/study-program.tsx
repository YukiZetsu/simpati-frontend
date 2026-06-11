import AdminLayout from '@/layouts/admin/admin-layout';
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

const statusStyles = {
    open: 'bg-green-100 text-green-700',
    draft: 'bg-yellow-100 text-yellow-700',
    closed: 'bg-red-100 text-red-700',
};

// TODO: ganti dengan fetch api.get('/admin/study-program')
const dummyPrograms: StudyProgram[] = [
    { id: 1, name: 'Teknik Informatika', description: 'Program TI', student_quota: 30, price: 5000000, registration_open: '2025-01-01', registration_close: '2025-03-01', status: 'open' },
    { id: 2, name: 'Sistem Informasi', description: 'Program SI', student_quota: 25, price: 4500000, registration_open: '2025-01-01', registration_close: '2025-03-01', status: 'draft' },
];

const emptyForm = {
    name: '', description: '', student_quota: '', price: '',
    registration_open: '', registration_close: '', status: 'draft',
};

export default function StudyProgram() {
    const [programs, setPrograms] = useState<StudyProgram[]>(dummyPrograms);
    const [editingProgram, setEditingProgram] = useState<StudyProgram | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [data, setData] = useState(emptyForm);
    const [errors, setErrors] = useState<Partial<typeof emptyForm>>({});

    function handleAdd() {
        setData(emptyForm);
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

        // TODO: ganti dengan api.post / api.put ke backend
        setTimeout(() => {
            if (editingProgram) {
                setPrograms(programs.map(p => p.id === editingProgram.id
                    ? { ...editingProgram, ...data, student_quota: Number(data.student_quota), price: Number(data.price), status: data.status as StudyProgram['status'] }
                    : p
                ));
            } else {
                setPrograms([...programs, {
                    id: Date.now(),
                    ...data,
                    student_quota: Number(data.student_quota),
                    price: Number(data.price),
                    status: data.status as StudyProgram['status'],
                }]);
            }
            setProcessing(false);
            setShowForm(false);
            setData(emptyForm);
        }, 1000);
    }

    function handleDelete(id: number) {
        if (confirm('Yakin ingin menghapus program ini?')) {
            // TODO: ganti dengan api.delete('/admin/study-program/' + id)
            setPrograms(programs.filter(p => p.id !== id));
        }
    }

    return (
        <AdminLayout active="study-program">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Kelola Program</h1>
                    <p className="text-gray-500">Kelola program studi independen</p>
                </div>
                <button onClick={handleAdd} className="cursor-pointer bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">
                    Tambah Program
                </button>
            </div>

            {showForm && (
                <div className="mb-6 border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 font-bold">{editingProgram ? 'Edit Program' : 'Tambah Program'}</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-semibold">Nama Program</label>
                            <input type="text" value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                className="w-full border px-3 py-2 text-sm" />
                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold">Kuota</label>
                            <input type="number" value={data.student_quota}
                                onChange={(e) => setData({ ...data, student_quota: e.target.value })}
                                className="w-full border px-3 py-2 text-sm" />
                            {errors.student_quota && <p className="mt-1 text-xs text-red-500">{errors.student_quota}</p>}
                        </div>

                        <div className="col-span-2">
                            <label className="mb-1 block text-sm font-semibold">Deskripsi</label>
                            <textarea value={data.description}
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                rows={3} className="w-full border px-3 py-2 text-sm" />
                            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold">Harga</label>
                            <input type="number" value={data.price}
                                onChange={(e) => setData({ ...data, price: e.target.value })}
                                className="w-full border px-3 py-2 text-sm" />
                            {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold">Status</label>
                            <select value={data.status}
                                onChange={(e) => setData({ ...data, status: e.target.value })}
                                className="w-full border px-3 py-2 text-sm">
                                <option value="draft">Draft</option>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold">Pendaftaran Dibuka</label>
                            <input type="date" value={data.registration_open}
                                onChange={(e) => setData({ ...data, registration_open: e.target.value })}
                                className="w-full border px-3 py-2 text-sm" />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold">Pendaftaran Ditutup</label>
                            <input type="date" value={data.registration_close}
                                onChange={(e) => setData({ ...data, registration_close: e.target.value })}
                                className="w-full border px-3 py-2 text-sm" />
                        </div>

                        <div className="col-span-2 flex gap-2">
                            <button type="submit" disabled={processing}
                                className="bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50">
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </button>
                            <button type="button" onClick={() => setShowForm(false)}
                                className="border px-4 py-2 text-sm font-semibold hover:bg-gray-100">
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="border bg-white shadow-sm">
                <table className="w-full text-sm">
                    <thead className="border-b">
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
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">Belum ada program studi.</td>
                            </tr>
                        ) : (
                            programs.map((program) => (
                                <tr key={program.id} className="border-b last:border-0">
                                    <td className="px-6 py-4 text-center">{program.name}</td>
                                    <td className="px-6 py-4 text-center">{program.student_quota}</td>
                                    <td className="px-6 py-4 text-center">Rp {Number(program.price).toLocaleString('id-ID')}</td>
                                    <td className="px-6 py-4 text-center">{program.registration_open} s/d {program.registration_close}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-0.5 text-xs font-semibold ${statusStyles[program.status]}`}>
                                            {program.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => handleEdit(program)}
                                                className="cursor-pointer text-sm font-semibold text-blue-500 hover:text-blue-700">Edit</button>
                                            <button onClick={() => handleDelete(program.id)}
                                                className="cursor-pointer text-sm font-semibold text-red-500 hover:text-red-700">Hapus</button>
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