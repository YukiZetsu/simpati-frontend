import { useForm } from '@inertiajs/react';
import React from 'react';

export default function FillBiodata() {
    const provinsi = [
        'Aceh',
        'Sumatera Utara',
        'Sumatera Barat',
        'Riau',
        'Jambi',
        'Sumatera Selatan',
        'Bengkulu',
        'Lampung',
        'Kepulauan Bangka Belitung',
        'Kepulauan Riau',
        'DKI Jakarta',
        'Jawa Barat',
        'Jawa Tengah',
        'DI Yogyakarta',
        'Jawa Timur',
        'Banten',
        'Bali',
        'Nusa Tenggara Barat',
        'Nusa Tenggara Timur',
        'Kalimantan Barat',
        'Kalimantan Tengah',
        'Kalimantan Selatan',
        'Kalimantan Timur',
        'Kalimantan Utara',
        'Sulawesi Utara',
        'Sulawesi Tengah',
        'Sulawesi Selatan',
        'Sulawesi Tenggara',
        'Gorontalo',
        'Sulawesi Barat',
        'Maluku',
        'Maluku Utara',
        'Papua Barat',
        'Papua',
    ];

    const semester = Array.from({ length: 14 }, (_, i) => i + 1);

    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        gender: '',
        birth_date: '',
        birth_place: '',
        address: '',
        city: '',
        province: '',
        phone_number: '',
        institution_name: '',
        major: '',
        semester: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/fill-biodata');
    };

    return (
        <div className="flex min-h-screen items-center justify-center py-10">
            <div className="w-full max-w-2xl border p-8 shadow-md">
                <h1 className="mb-6 text-center text-2xl font-semibold">Isi Biodata Anda</h1>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Nama Lengkap <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            placeholder="Masukkan nama lengkap Anda"
                            className="block w-full border px-3 py-2 text-sm"
                        />
                        {errors.full_name && <p className="mt-1 text-xs text-red-500">{errors.full_name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <label className="flex cursor-pointer items-center gap-2 border px-4 py-2 text-sm has-[:checked]:border-black has-[:checked]:bg-gray-100">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={data.gender === 'male'}
                                onChange={(e) => setData('gender', e.target.value)}
                                className="accent-black"
                            />
                            Laki-laki
                        </label>
                        <label className="flex cursor-pointer items-center gap-2 border px-4 py-2 text-sm has-[:checked]:border-black has-[:checked]:bg-gray-100">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={data.gender === 'female'}
                                onChange={(e) => setData('gender', e.target.value)}
                                className="accent-black"
                            />
                            Perempuan
                        </label>
                        {errors.gender && <p className="col-span-2 text-xs text-red-500">{errors.gender}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Tanggal Lahir <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={data.birth_date}
                                onChange={(e) => setData('birth_date', e.target.value)}
                                className="block w-full border px-3 py-2 text-sm"
                            />
                            {errors.birth_date && <p className="mt-1 text-xs text-red-500">{errors.birth_date}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Tempat Lahir <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.birth_place}
                                onChange={(e) => setData('birth_place', e.target.value)}
                                placeholder="Contoh: Surabaya"
                                className="block w-full border px-3 py-2 text-sm"
                            />
                            {errors.birth_place && <p className="mt-1 text-xs text-red-500">{errors.birth_place}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Alamat <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="Masukkan alamat lengkap Anda"
                            rows={3}
                            className="block w-full border px-3 py-2 text-sm"
                        />
                        {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Kota/Kabupaten <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                                placeholder="Masukkan kota/kabupaten"
                                className="block w-full border px-3 py-2 text-sm"
                            />
                            {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Provinsi <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.province}
                                onChange={(e) => setData('province', e.target.value)}
                                className="block w-full border px-3 py-2 text-sm"
                            >
                                <option value="">Pilih Provinsi</option>
                                {provinsi.map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </select>
                            {errors.province && <p className="mt-1 text-xs text-red-500">{errors.province}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Nomor Telepon <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            value={data.phone_number}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            placeholder="+62 89130050790"
                            className="block w-full border px-3 py-2 text-sm"
                        />
                        {errors.phone_number && <p className="mt-1 text-xs text-red-500">{errors.phone_number}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Nama Universitas / Institusi <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.institution_name}
                            onChange={(e) => setData('institution_name', e.target.value)}
                            placeholder="Contoh: Universitas Negeri Surabaya"
                            className="block w-full border px-3 py-2 text-sm"
                        />
                        {errors.institution_name && <p className="mt-1 text-xs text-red-500">{errors.institution_name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Program Studi <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.major}
                                onChange={(e) => setData('major', e.target.value)}
                                placeholder="Contoh: Teknik Informatika"
                                className="block w-full border px-3 py-2 text-sm"
                            />
                            {errors.major && <p className="mt-1 text-xs text-red-500">{errors.major}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Semester <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.semester}
                                onChange={(e) => setData('semester', e.target.value)}
                                className="block w-full border px-3 py-2 text-sm"
                            >
                                <option value="">Pilih Semester</option>
                                {semester.map((s) => (
                                    <option key={s} value={s}>
                                        Semester {s}
                                    </option>
                                ))}
                            </select>
                            {errors.semester && <p className="mt-1 text-xs text-red-500">{errors.semester}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-2 w-full cursor-pointer bg-black py-2 text-sm text-white transition hover:bg-gray-800 disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </form>
            </div>
        </div>
    );
}
