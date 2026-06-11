import AdminLayout from '@/layouts/admin/admin-layout';
import { Mail, RectangleEllipsis } from 'lucide-react';
import { useState } from 'react';

export default function EmailPassword() {
    const [showEmailPopup, setShowEmailPopup] = useState(false);
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);

    const [email, setEmail] = useState('');
    const [emailProcessing, setEmailProcessing] = useState(false);

    const [passwordData, setPasswordData] = useState({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });
    const [passwordProcessing, setPasswordProcessing] = useState(false);

    const submitEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setShowEmailPopup(true);
    };

    const confirmUpdateEmail = () => {
        setEmailProcessing(true);
        // TODO: api.put('/admin/email-password/email', { email })
        console.log('Update email:', email);
        setTimeout(() => {
            setEmailProcessing(false);
            setShowEmailPopup(false);
            setEmail('');
        }, 1000);
    };

    const submitPassword = (e: React.FormEvent) => {
        e.preventDefault();
        setShowPasswordPopup(true);
    };

    const confirmUpdatePassword = () => {
        setPasswordProcessing(true);
        // TODO: api.put('/admin/email-password/password', passwordData)
        console.log('Update password:', passwordData);
        setTimeout(() => {
            setPasswordProcessing(false);
            setShowPasswordPopup(false);
            setPasswordData({ current_password: '', new_password: '', new_password_confirmation: '' });
        }, 1000);
    };

    return (
        <AdminLayout active="email-password">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Email & Password</h1>
                    <p className="mt-2 max-w-2xl text-gray-500">Kelola email dan password akun admin Anda untuk menjaga keamanan akun.</p>
                </div>

                <div className="space-y-5">
                    {/* Form Email */}
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Masukkan email baru"
                                        className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={emailProcessing}
                                    className="mt-5 bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                                >
                                    {emailProcessing ? 'Menyimpan...' : 'Simpan Email'}
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Popup Konfirmasi Email */}
                    {showEmailPopup && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                            <div className="w-full max-w-md bg-white p-6 shadow-xl">
                                <h2 className="text-xl font-bold text-gray-800">Konfirmasi Perubahan</h2>
                                <p className="mt-3 text-sm text-gray-500">Apakah Anda yakin ingin mengganti email akun ini?</p>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        onClick={() => { setShowEmailPopup(false); setEmail(''); }}
                                        className="border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={confirmUpdateEmail}
                                        disabled={emailProcessing}
                                        className="bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                                    >
                                        {emailProcessing ? 'Menyimpan...' : 'Ya, Ganti Email'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form Password */}
                    <form onSubmit={submitPassword} className="border bg-white p-6 shadow-sm">
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
                                            value={passwordData.current_password}
                                            onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                                            placeholder="Masukkan password lama"
                                            className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Password Baru</label>
                                        <input
                                            type="password"
                                            required
                                            value={passwordData.new_password}
                                            onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                                            placeholder="Masukkan password baru"
                                            className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Konfirmasi Password</label>
                                        <input
                                            type="password"
                                            required
                                            value={passwordData.new_password_confirmation}
                                            onChange={(e) => setPasswordData({ ...passwordData, new_password_confirmation: e.target.value })}
                                            placeholder="Konfirmasi password baru"
                                            className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={passwordProcessing}
                                    className="mt-5 bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                                >
                                    {passwordProcessing ? 'Menyimpan...' : 'Simpan Password'}
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Popup Konfirmasi Password */}
                    {showPasswordPopup && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                            <div className="w-full max-w-md bg-white p-6 shadow-xl">
                                <h2 className="text-xl font-bold text-gray-800">Konfirmasi Password</h2>
                                <p className="mt-3 text-sm text-gray-500">Apakah Anda yakin ingin mengganti password akun ini?</p>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        onClick={() => { setShowPasswordPopup(false); setPasswordData({ current_password: '', new_password: '', new_password_confirmation: '' }); }}
                                        className="border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={confirmUpdatePassword}
                                        disabled={passwordProcessing}
                                        className="bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                                    >
                                        {passwordProcessing ? 'Menyimpan...' : 'Ya, Ganti Password'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}