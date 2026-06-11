import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

// Opsi tambahan agar breadcrumb di atasnya rapi
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '#' },
    { title: 'Profil', href: '/admin/profile' },
];

export default function Profile() {
    // State data dummy pengganti usePage() Inertia
    const auth = {
        user: {
            username: "didik_sujatmiko",
            email: "didik@example.com"
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-1 flex-col p-4 lg:p-8">
                {/* Card Utama: Putih bersih dengan border abu-abu tipis sesuai Figma */}
                <div className="border border-gray-200 bg-white p-8 shadow-sm rounded-sm max-w-4xl">
                    <div className="flex items-center gap-6">
                        <div>
                            {/* Heading Nama & Email */}
                            <h2 className="text-xl font-medium text-gray-900">{auth.user.username}</h2>
                            <p className="text-sm text-gray-500">{auth.user.email}</p>
                        </div>
                    </div>

                    {/* Garis Pembatas Tipis */}
                    <hr className="my-6 border-gray-200" />

                    {/* Grid Kotak Read-Only */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 p-4 rounded-sm">
                            <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">Username</p>
                            <p className="text-sm text-gray-900">{auth.user.username}</p>
                        </div>
                        <div className="border border-gray-200 p-4 rounded-sm">
                            <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">Email</p>
                            <p className="text-sm text-gray-900">{auth.user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}