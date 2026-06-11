import { useForm } from '@inertiajs/react';
import React from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        email: '',
        password: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/admin/register', { onSuccess: () => reset() });
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md border p-8 shadow-md">
                <h1 className="mb-6 text-center text-2xl font-semibold">Registrasi Akun Admin</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="mb-1 block">
                            Nama Pengguna
                        </label>
                        <input
                            name="username"
                            id="username"
                            required
                            type="text"
                            min={6}
                            max={30}
                            value={data.username}
                            onChange={(event) => setData('username', event.target.value)}
                            className="block w-full border px-3 py-2"
                        />
                        {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-1 block">
                            Email
                        </label>
                        <input
                            name="email"
                            id="email"
                            type="email"
                            required
                            value={data.email}
                            onChange={(event) => setData('email', event.target.value)}
                            className="block w-full border px-3 py-2"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1 block">
                            Kata Sandi
                        </label>
                        <input
                            name="password"
                            id="password"
                            type="password"
                            required
                            min={6}
                            max={30}
                            value={data.password}
                            onChange={(event) => setData('password', event.target.value)}
                            className="block w-full border px-3 py-2"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-2 w-full cursor-pointer bg-black py-2 text-white transition hover:bg-gray-800"
                    >
                        {processing ? 'Memproses' : 'Daftar'}
                    </button>
                </form>

                <p className="mt-6 text-center">
                    Sudah memiliki akun?{' '}
                    <a href="/admin/login" className="cursor-pointer underline">
                        Silahkan masuk.
                    </a>
                </p>
            </div>
        </div>
    );
}
