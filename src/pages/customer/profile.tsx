import StudentLayout from '@/layouts/student/student-layout';

const dummyAuth = { user: { username: 'budi_santoso', email: 'budi@example.com' } };
const dummyProfile = { full_name: 'Budi Santoso', gender: 'male', birth_date: '2000-01-01', birth_place: 'Surabaya', address: 'Jl. Contoh No. 1', city: 'Surabaya', province: 'Jawa Timur', phone_number: '+62 812-3456-7890', institution_name: 'Universitas Negeri Surabaya', major: 'Teknik Informatika', semester: 5 };

export default function Profile() {
    // TODO: ganti dengan fetch api.get('/user') dan api.get('/student/profile')
    const auth = dummyAuth;
    const profile = dummyProfile;

    const fields = [
        { label: 'Username', value: auth.user.username },
        { label: 'Email', value: auth.user.email },
        { label: 'Nama Lengkap', value: profile.full_name },
        { label: 'Jenis Kelamin', value: profile.gender === 'male' ? 'Laki-laki' : 'Perempuan' },
        { label: 'Tanggal Lahir', value: profile.birth_date },
        { label: 'Tempat Lahir', value: profile.birth_place },
        { label: 'Kota', value: profile.city },
        { label: 'Provinsi', value: profile.province },
        { label: 'Nomor Telepon', value: profile.phone_number },
        { label: 'Universitas', value: profile.institution_name },
        { label: 'Program Studi', value: profile.major },
        { label: 'Semester', value: `Semester ${profile.semester}` },
    ];

    return (
        <StudentLayout active="profile">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Profil Saya</h1>
            </div>
            <div className="border bg-white p-8 shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="flex h-16 w-16 items-center justify-center bg-black text-2xl text-white">
                        {profile.full_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-xl">{profile.full_name}</h2>
                        <p className="text-gray-500">{auth.user.email}</p>
                    </div>
                </div>
                <hr className="my-6" />
                <div className="grid grid-cols-2 gap-4">
                    {fields.map(({ label, value }) => (
                        <div key={label} className={`border p-4 ${label === 'Alamat' ? 'col-span-2' : ''}`}>
                            <p className="text-xs tracking-widest text-gray-400 uppercase">{label}</p>
                            <p className="mt-1">{value}</p>
                        </div>
                    ))}
                    <div className="col-span-2 border p-4">
                        <p className="text-xs tracking-widest text-gray-400 uppercase">Alamat</p>
                        <p className="mt-1">{profile.address}</p>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}