import StudentLayout from '@/layouts/student/student-layout';
import { usePage } from '@inertiajs/react';

interface StudentProfile {
    full_name: string;
    gender: string;
    birth_date: string;
    birth_place: string;
    address: string;
    city: string;
    province: string;
    phone_number: string;
    institution_name: string;
    major: string;
    semester: number;
}

interface PageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
    profile: StudentProfile;
    [key: string]: unknown;
}

export default function Profile() {
    const { auth, profile } = usePage<PageProps>().props;

    return (
        <StudentLayout active="profile">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Profil Saya</h1>
            </div>

            <div className="border bg-white p-8 shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="flex h-16 w-16 items-center justify-center bg-black text-2xl text-white">
                        {profile?.full_name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-xl">{profile?.full_name}</h2>
                        <p className="text-gray-500">{auth?.user?.email}</p>
                    </div>
                </div>

                <hr className="my-6" />

                <div className="grid grid-cols-2 gap-4">
                    <div className="border p-4">
                        <p className="text-xs tracking-widest text-gray-400 uppercase">Username</p>
                        <p className="mt-1">{auth?.user?.username}</p>
                    </div>
                    <div className="border p-4">
                        <p className="text-xs tracking-widest text-gray-400 uppercase">Email</p>
                        <p className="mt-1">{auth?.user?.email}</p>
                    </div>
                    <div className="border p-4">
                        <p className="text-xs tracking-widest text-gray-400 uppercase">Nama Lengkap</p>
                        <p className="mt-1">{profile?.full_name}</p>
                    </div>
                    <div className="border p-4">
                        <p className="text-xs tracking-widest text-gray-400 uppercase">Jenis Kelamin</p>
                        <p className="mt-1 capitalize">{profile?.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</p>
                    </div>
                    <div className="border p-4">
                        <p className="text-xs tracking-widest text-gray-400 uppercase">Tanggal Lahir</p>
                        <p className="mt-1">{profile?.birth_date}</p>
                    </div>
                    <div className="border p-4">
                        <p className="text-xs tracking-widest text-gray-400 uppercase">Tempat Lahir</p>
                        <p className="mt-1">{profile?.birth_place}</p>
                    </div>
                    <div className="col-span-2 border p-4">
                        <p className="text-xs tracking-widest text-gray-400 uppercase">Alamat</p>
                        <p className="mt-1">{profile?.address}</p>
                    </div>
                    <div className="border p-4">
                        <p className="text-xs tracking-widest text-gray-400 uppercase">Kota</p>
                        <p className="mt-1">{profile?.city}</p>
                    </div>
                    <div className="border p-4">
                        <p className="text-xs tracking-widest text-gray-400 uppercase">Provinsi</p>
                        <p className="mt-1">{profile?.province}</p>
                    </div>
                    <div className="border p-4">
                        <p className="text-xs tracking-widest text-gray-400 uppercase">Nomor Telepon</p>
                        <p className="mt-1">{profile?.phone_number}</p>
                    </div>
                    <div className="border p-4">
                        <p className="text-xs tracking-widest text-gray-400 uppercase">Universitas</p>
                        <p className="mt-1">{profile?.institution_name}</p>
                    </div>
                    <div className="border p-4">
                        <p className="text-xs tracking-widest text-gray-400 uppercase">Program Studi</p>
                        <p className="mt-1">{profile?.major}</p>
                    </div>
                    <div className="border p-4">
                        <p className="text-xs tracking-widest text-gray-400 uppercase">Semester</p>
                        <p className="mt-1">Semester {profile?.semester}</p>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
