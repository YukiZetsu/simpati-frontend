import AdminLayout from '@/layouts/admin/admin-layout';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface StudentProfile {
    full_name: string;
}

interface Student {
    username: string;
    studentProfile: StudentProfile | null;
}

interface Program {
    name: string;
    price: number;
}

interface Registration {
    id: number;
    status: 'pending' | 'accepted' | 'rejected';
    student: Student;
    program: Program;
}

interface Payment {
    id: number;
    file: string;
    status: 'pending' | 'accepted' | 'rejected';
    registration: Registration;
}

interface PageProps {
    payments: Payment[];
    [key: string]: unknown;
}

function StatusBadge({ status }: { status: 'pending' | 'accepted' | 'rejected' }) {
    const styles = {
        pending: 'bg-yellow-100 text-yellow-700',
        accepted: 'bg-green-100 text-green-700',
        rejected: 'bg-red-100 text-red-700',
    };

    const labels = {
        pending: 'Menunggu',
        accepted: 'Diterima',
        rejected: 'Ditolak',
    };

    return <span className={'px-2 py-0.5 text-xs font-semibold ' + styles[status]}>{labels[status]}</span>;
}

function VerifyModal({ payment, onClose }: { payment: Payment; onClose: () => void }) {
    const acceptForm = useForm({ status: 'accepted' });
    const rejectForm = useForm({ status: 'rejected' });

    const processing = acceptForm.processing || rejectForm.processing;

    function handleAccept() {
        acceptForm.put('/admin/dashboard/payment/' + payment.id, {
            onSuccess: () => onClose(),
        });
    }

    function handleReject() {
        rejectForm.put('/admin/dashboard/payment/' + payment.id, {
            onSuccess: () => onClose(),
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md bg-white p-6 shadow-xl">
                <h2 className="mb-2 text-lg font-bold">Verifikasi Pembayaran</h2>

                <div className="mb-4">
                    <p className="text-sm text-gray-500">Mahasiswa</p>
                    <p className="font-semibold">{payment.registration.student.studentProfile?.full_name ?? payment.registration.student.username}</p>
                </div>

                <div className="mb-4">
                    <p className="text-sm text-gray-500">Program</p>
                    <p className="font-semibold">{payment.registration.program.name}</p>
                </div>

                <div className="mb-6">
                    <p className="text-sm text-gray-500">Total Pembayaran</p>
                    <p className="font-semibold">Rp {Number(payment.registration.program.price).toLocaleString('id-ID')}</p>
                </div>

                <div className="mb-6">
                    <p className="mb-2 text-sm text-gray-500">Bukti Pembayaran</p>
                    <a href={'/storage/' + payment.file} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline">
                        Lihat File
                    </a>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={processing}
                        className="flex-1 border py-2 text-sm font-semibold hover:bg-gray-100 disabled:opacity-50"
                    >
                        Batal
                    </button>

                    <button
                        onClick={handleReject}
                        disabled={processing}
                        className="flex-1 border border-red-500 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:opacity-50"
                    >
                        Tolak
                    </button>

                    <button
                        onClick={handleAccept}
                        disabled={processing}
                        className="flex-1 bg-black py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                    >
                        {processing ? 'Memproses...' : 'Terima'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Payment() {
    const { payments } = usePage<PageProps>().props;
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
    const [search, setSearch] = useState('');

    const filtered = payments.filter((payment) => {
        const name = payment.registration.student.studentProfile?.full_name ?? payment.registration.student.username;
        const program = payment.registration.program.name;
        return name.toLowerCase().includes(search.toLowerCase()) || program.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <AdminLayout active="payment">
            {selectedPayment && <VerifyModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} />}

            <div className="mb-6">
                <h1 className="text-2xl font-bold">Verifikasi Pembayaran</h1>
                <p className="text-gray-500">Verifikasi bukti pembayaran mahasiswa</p>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Cari mahasiswa atau program..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border bg-white px-4 py-3 text-sm focus:outline-none"
                />
            </div>

            <div className="overflow-x-auto border bg-white shadow-sm">
                <table className="w-full text-sm">
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-center font-semibold">Mahasiswa</th>
                            <th className="px-6 py-3 text-center font-semibold">Program</th>
                            <th className="px-6 py-3 text-center font-semibold">Harga</th>
                            <th className="px-6 py-3 text-center font-semibold">Status Pembayaran</th>
                            <th className="px-6 py-3 text-center font-semibold">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                                    Tidak ada data yang ditemukan.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((payment) => (
                                <tr key={payment.id} className="border-b last:border-0">
                                    <td className="px-6 py-4 text-center">
                                        {payment.registration.student.studentProfile?.full_name ?? payment.registration.student.username}
                                    </td>
                                    <td className="px-6 py-4 text-center">{payment.registration.program.name}</td>
                                    <td className="px-6 py-4 text-center">Rp {Number(payment.registration.program.price).toLocaleString('id-ID')}</td>
                                    <td className="px-6 py-4 text-center">
                                        <StatusBadge status={payment.status} />
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {payment.status === 'pending' ? (
                                            <button
                                                onClick={() => setSelectedPayment(payment)}
                                                className="text-sm font-semibold underline hover:text-gray-600"
                                            >
                                                Verifikasi
                                            </button>
                                        ) : (
                                            <span className="text-sm text-gray-400">Selesai</span>
                                        )}
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
