import AdminLayout from '@/layouts/admin/admin-layout';

const dummyUser = {
    username: 'didik_sujatmiko',
    email: 'didik@example.com',
};

export default function Profile() {
    // TODO: ganti dengan fetch api.get('/user')
    const user = dummyUser;

    return (
        <AdminLayout active="profile">
            <div className="border bg-white p-8 shadow-sm">
                <div className="flex items-center gap-6">
                    <div>
                        <h2 className="text-xl">{user.username}</h2>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>

                <hr className="my-6" />

                <div className="grid grid-cols-2 gap-4">
                    <div className="border p-4">
                        <p className="text-xs tracking-widest text-gray-400 uppercase">Username</p>
                        <p className="mt-1">{user.username}</p>
                    </div>
                    <div className="border p-4">
                        <p className="text-xs tracking-widest text-gray-400 uppercase">Email</p>
                        <p className="mt-1">{user.email}</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}