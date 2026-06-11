import StudentLayout from '@/layouts/student/student-layout';
import { useForm } from '@inertiajs/react';
import { Mail, RectangleEllipsis } from 'lucide-react';
import React, { useState } from 'react';

export default function EmailPassword() {
    const [showEmailPopup, setShowEmailPopup] = useState(false);
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);

    const emailForm = useForm({
        email: '',
    });

    const passwordForm = useForm({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });

    const submitEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setShowEmailPopup(true);
    };

    const confirmUpdateEmail = () => {
        emailForm.put('/student/dashboard/email-password/email', {
            onSuccess: () => {
                setShowEmailPopup(false);
            },
        });
        emailForm.setData('email', '');
    };

    const submitPassword = (e: React.FormEvent) => {
        e.preventDefault();
        setShowPasswordPopup(true);
    };

    const confirmUpdatePassword = () => {
        passwordForm.put('/student/dashboard/email-password/password', {
            onSuccess: () => {
                setShowPasswordPopup(false);

                passwordForm.reset();
            },
        });
    };

    return (
        <StudentLayout active="email-password">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Email & Password</h1>

                    <p className="mt-2 max-w-2xl text-gray-500">Kelola email dan password akun admin Anda untuk menjaga keamanan akun.</p>
                </div>

                <div className="space-y-5">
                    <form onSubmit={submitEmail} className="border bg-white p-6 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 text-blue-600">
                                <Mail size={22} />
                            </div>

                            <div className="w-full">
                                <h2 className="text-lg font-semibold text-gray-800">Ganti Email</h2>

                                <p className="mt-1 text-sm text-gray-500">Gunakan email aktif untuk menerima notifikasi akun.</p>

                                <div className="mt-5">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Email Baru</label>

                                    <input
                                        type="email"
                                        required
                                        value={emailForm.data.email}
                                        onChange={(e) => emailForm.setData('email', e.target.value)}
                                        placeholder="Masukkan email baru"
                                        className="w-full border border-gray-300 px-4 py-3 transition outline-none focus:border-black"
                                    />

                                    {emailForm.errors.email && <p className="mt-2 text-sm text-red-500">{emailForm.errors.email}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={emailForm.processing}
                                    className="mt-5 bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
                                >
                                    {emailForm.processing ? 'Menyimpan...' : 'Simpan Email'}
                                </button>
                            </div>
                        </div>
                    </form>

                    {showEmailPopup && (
                        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/40">
                            <div className="w-full max-w-md bg-white p-6 shadow-xl">
                                <h2 className="text-xl font-bold text-gray-800">Konfirmasi Perubahan</h2>

                                <p className="mt-3 text-sm text-gray-500">Apakah Anda yakin ingin mengganti email akun ini?</p>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        onClick={() => {
                                            setShowEmailPopup(false);
                                            emailForm.setData('email', '');
                                        }}
                                        className="border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                                    >
                                        Batal
                                    </button>

                                    <button
                                        onClick={confirmUpdateEmail}
                                        disabled={emailForm.processing}
                                        className="bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
                                    >
                                        {emailForm.processing ? 'Menyimpan...' : 'Ya, Ganti Email'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={submitPassword} className="border bg-white p-6 shadow-sm transition hover:shadow-md">
                        <div className="flex items-start gap-4">
                            <div className="bg-red-100 p-3 text-red-600">
                                <RectangleEllipsis size={22} />
                            </div>

                            <div className="w-full">
                                <h2 className="text-lg font-semibold text-gray-800">Ganti Password</h2>

                                <p className="mt-1 text-sm text-gray-500">Gunakan password yang kuat agar akun lebih aman.</p>

                                <div className="mt-5 space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Password Lama</label>

                                        <input
                                            type="password"
                                            required
                                            value={passwordForm.data.current_password}
                                            onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                            placeholder="Masukkan password lama"
                                            className="w-full border border-gray-300 px-4 py-3 transition outline-none focus:border-black"
                                        />

                                        {passwordForm.errors.current_password && (
                                            <p className="mt-2 text-sm text-red-500">{passwordForm.errors.current_password}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Password Baru</label>

                                        <input
                                            type="password"
                                            required
                                            value={passwordForm.data.new_password}
                                            onChange={(e) => passwordForm.setData('new_password', e.target.value)}
                                            placeholder="Masukkan password baru"
                                            className="w-full border border-gray-300 px-4 py-3 transition outline-none focus:border-black"
                                        />

                                        {passwordForm.errors.new_password && (
                                            <p className="mt-2 text-sm text-red-500">{passwordForm.errors.new_password}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Konfirmasi Password</label>

                                        <input
                                            type="password"
                                            required
                                            value={passwordForm.data.new_password_confirmation}
                                            onChange={(e) => passwordForm.setData('new_password_confirmation', e.target.value)}
                                            placeholder="Konfirmasi password baru"
                                            className="w-full border border-gray-300 px-4 py-3 transition outline-none focus:border-black"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="mt-5 bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
                                >
                                    {passwordForm.processing ? 'Menyimpan...' : 'Simpan Password'}
                                </button>
                            </div>
                        </div>
                    </form>

                    {showPasswordPopup && (
                        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/40">
                            <div className="w-full max-w-md bg-white p-6 shadow-xl">
                                <h2 className="text-xl font-bold text-gray-800">Konfirmasi Password</h2>

                                <p className="mt-3 text-sm text-gray-500">Apakah Anda yakin ingin mengganti password akun ini?</p>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        onClick={() => {
                                            setShowPasswordPopup(false);

                                            passwordForm.reset();
                                        }}
                                        className="border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                                    >
                                        Batal
                                    </button>

                                    <button
                                        onClick={confirmUpdatePassword}
                                        disabled={passwordForm.processing}
                                        className="bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
                                    >
                                        {passwordForm.processing ? 'Menyimpan...' : 'Ya, Ganti Password'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </StudentLayout>
    );
}
