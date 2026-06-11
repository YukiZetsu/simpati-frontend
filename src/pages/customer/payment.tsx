import StudentLayout from '@/layouts/student/student-layout';
import { useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

interface Payment {
    id: number;
    file: string;
    status: 'pending' | 'accepted' | 'rejected';
}

interface Registration {
    id: number;
    status: 'pending' | 'accepted' | 'rejected';
    program: {
        name: string;
        price: number;
    };
    payment: Payment | null;
}

interface PageProps {
    registrations: Registration[];
    [key: string]: unknown;
}

function UploadModal({ registration, onClose }: { registration: Registration; onClose: () => void }) {
    const { setData, post, processing, errors } = useForm<{ registration_id: number; file: File | null }>({
        registration_id: registration.id,
        file: null,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/student/dashboard/payment', {
            forceFormData: true,
            onSuccess: () => onClose(),
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md bg-white p-6 shadow-xl">
                <h2 className="mb-2 text-lg font-bold">Upload Bukti Pembayaran</h2>
                <p className="mb-4 text-sm text-gray-500">{registration.program.name}</p>

                <div className="mb-4 border p-4 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Total Pembayaran</span>
                        <span className="font-semibold">Rp {Number(registration.program.price).toLocaleString('id-ID')}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">File Bukti Pembayaran</label>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) => setData('file', e.target.files?.[0] || null)}
                            className="block w-full border px-3 py-2 text-sm"
                        />
                        <p className="mt-1 text-xs text-gray-400">Format: JPG, PNG, PDF. Maks 2MB.</p>
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

function CancelModal({
    registration,
    onConfirm,
    onClose,
    processing,
}: {
    registration: Registration;
    onConfirm: () => void;
    onClose: () => void;
    processing: boolean;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md bg-white p-6 shadow-xl">
                <h2 className="mb-2 text-lg font-bold">Batalkan Pendaftaran</h2>
                <p className="mb-1 text-sm text-gray-500">Anda akan membatalkan pendaftaran ke program:</p>
                <p className="mb-6 font-semibold">{registration.program.name}</p>

                <p className="mb-6 text-sm text-red-500">
                    Tindakan ini tidak dapat dibatalkan. Anda harus mendaftar ulang jika ingin bergabung kembali.
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={processing}
                        className="flex-1 border py-2 text-sm font-semibold hover:bg-gray-100 disabled:opacity-50"
                    >
                        Kembali
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={processing}
                        className="flex-1 border border-red-500 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:opacity-50"
                    >
                        {processing ? 'Membatalkan...' : 'Ya, Batalkan'}
                    </button>
                </div>
            </div>
        </div>
    );
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

export default function Payment() {
    const { registrations } = usePage<PageProps>().props;
    const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
    const [cancelRegistration, setCancelRegistration] = useState<Registration | null>(null);
    const { delete: destroy, processing: cancelling } = useForm({});

    function handleCancel(registration: Registration) {
        destroy('/student/register-program/' + registration.id, {
            onSuccess: () => setCancelRegistration(null),
        });
    }

    return (
        <StudentLayout active="payment">
            {selectedRegistration && <UploadModal registration={selectedRegistration} onClose={() => setSelectedRegistration(null)} />}

            {cancelRegistration && (
                <CancelModal
                    registration={cancelRegistration}
                    onConfirm={() => handleCancel(cancelRegistration)}
                    onClose={() => setCancelRegistration(null)}
                    processing={cancelling}
                />
            )}

            <div className="mb-6">
                <h1 className="text-2xl font-bold">Pembayaran</h1>
                <p className="text-gray-500">Upload bukti pembayaran program studi</p>
            </div>

            <div className="flex flex-col gap-4">
                {registrations.length === 0 ? (
                    <p className="text-gray-400">Anda belum mendaftar ke program apapun.</p>
                ) : (
                    registrations.map((registration) => (
                        <div key={registration.id} className="border bg-white p-6 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="font-bold">{registration.program.name}</h2>
                                    <p className="mt-1 text-sm text-gray-500">Rp {Number(registration.program.price).toLocaleString('id-ID')}</p>
                                </div>
                                <StatusBadge status={registration.status} />
                            </div>

                            <hr className="my-4" />

                            {registration.payment && registration.payment.status !== 'rejected' ? (
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Bukti Pembayaran</p>
                                        <p className="text-xs text-gray-400">Sudah diupload</p>
                                    </div>
                                    <StatusBadge status={registration.payment.status} />
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-500">
                                        {registration.payment?.status === 'rejected'
                                            ? 'Pembayaran ditolak, silahkan upload ulang'
                                            : 'Belum upload bukti pembayaran'}
                                    </p>
                                    <button
                                        onClick={() => setSelectedRegistration(registration)}
                                        className="bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                                    >
                                        {registration.payment?.status === 'rejected' ? 'Upload Ulang' : 'Upload Bukti'}
                                    </button>
                                </div>
                            )}

                            {registration.status !== 'accepted' && (
                                <button
                                    onClick={() => setCancelRegistration(registration)}
                                    className="mt-4 w-full border border-red-500 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
                                >
                                    Batalkan Pendaftaran
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </StudentLayout>
    );
}
