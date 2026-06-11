import { Link } from '@inertiajs/react';
import { BookOpen, ContactRound, CreditCard, FileText, KeyRound, Layers, LogOut, User } from 'lucide-react';
import React, { useState } from 'react';

interface Props {
    children: React.ReactNode;
    active: 'profile' | 'programs' | 'payment' | 'contact' | 'email-password' | 'loa';
}

const menuItems = [
    { key: 'profile', label: 'Profil', href: '/student/dashboard/profile', icon: <User size={18} /> },
    { key: 'programs', label: 'Program Studi', href: '/student/dashboard/programs', icon: <BookOpen size={18} /> },
    { key: 'payment', label: 'Pembayaran', href: '/student/dashboard/payment', icon: <CreditCard size={18} /> },
    { key: 'loa', label: 'LOA', href: '/student/dashboard/loa', icon: <FileText size={18} /> },
    { key: 'contact', label: 'Kontak Admin', href: '/student/dashboard/contact', icon: <ContactRound size={18} /> },
    { key: 'email-password', label: 'Email dan Password', href: '/student/dashboard/email-password', icon: <KeyRound size={18} /> },
];

interface LogoutPopupProps {
    onClose: () => void;
}

function LogoutPopUp({ onClose }: LogoutPopupProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-[350px] bg-white p-6 shadow-lg">
                <h1 className="mb-4 text-lg font-semibold">Apakah Anda yakin ingin keluar?</h1>
                <p className="mb-6 text-sm text-gray-600">
                    Anda akan keluar dari akun siswa. Dan Anda perlu melakukan login kembali untuk mengakses dashboard.
                </p>
                <div className="flex gap-3">
                    <button onClick={onClose} className="w-full cursor-pointer bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300">
                        Batal
                    </button>
                    <Link
                        href="/student/logout"
                        method="post"
                        as="button"
                        className="w-full cursor-pointer bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                    >
                        Iya
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function StudentLayout({ children, active }: Props) {
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);

    return (
        <div className="flex h-screen">
            <aside className="flex h-screen w-66 flex-col border-r bg-white">
                <div className="flex items-center justify-center gap-2 border-b px-6 py-5">
                    <Layers />
                    <span className="text-lg font-bold">DASHBOARD SISWA</span>
                </div>

                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
                    {menuItems.map((item) => {
                        const isActive = active === item.key;
                        return (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={`mb-2 flex items-center gap-3 px-4 py-2.5 text-sm transition ${
                                    isActive ? 'bg-black font-semibold text-white' : 'bg-gray-100 text-gray-600'
                                }`}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t p-3">
                    <button
                        onClick={() => setShowLogoutPopup(true)}
                        className="flex w-full cursor-pointer items-center gap-3 bg-red-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-400"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto p-8">{children}</main>

            {showLogoutPopup && <LogoutPopUp onClose={() => setShowLogoutPopup(false)} />}
        </div>
    );
}
