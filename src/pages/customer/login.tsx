import { useForm } from '@inertiajs/react';
import React from 'react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/login');
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md border p-8 shadow-md">
                <h1 className="mb-6 text-center text-2xl font-semibold">Masuk Akun</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="mb-1 block">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="block w-full border px-3 py-2"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                        <div className="flex justify-between">
                            <label htmlFor="password" className="mb-1 block">
                                Kata Sandi
                            </label>
                            <a href="/forgot-password" className="underline">
                                Lupa kata sandi?
                            </a>
                        </div>
                        <input
                            id="password"
                            type="password"
                            required
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="block w-full border px-3 py-2"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-2 w-full cursor-pointer bg-black py-2 text-white transition hover:bg-gray-800"
                    >
                        {processing ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>

                <p className="mt-6 text-center">
                    Belum memiliki akun?{' '}
                    <a href="/register" className="cursor-pointer underline">
                        Silahkan daftar.
                    </a>
                </p>
            </div>
        </div>
    );
}
