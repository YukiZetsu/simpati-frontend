import { ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
    const contacts = [
        { name: 'Ahmad Azmiy Fawwaz', phone: '+62 821-3140-0557', wa: '6282131400557' },
        { name: 'Didik Sujatmiko', phone: '+62 877-6049-8320', wa: '6287760498320' },
        { name: 'Lukman Adi Wijaya', phone: '+62 851-3608-5201', wa: '6285136085201' },
        { name: 'Muhammad Ridwan', phone: '+62 821-2514-8174', wa: '6282125148174' },
        { name: 'Naufal Andrianto Nugraha', phone: '+62 821-3235-0796', wa: '6282132350796' },
    ];

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md border p-8 shadow-md">
                <div className="mb-6 text-center">
                    <h1 className="text-justify text-2xl font-semibold">Lupa Kata Sandi</h1>
                    <p className="mt-2 text-justify text-sm text-gray-500">
                        Silahkan hubungi salah satu admin di bawah ini. Kami siap membantu Anda mendapatkan atau membuat ulang kata sandi.
                    </p>
                </div>

                <div className="border-t pt-5">
                    <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Kontak Admin</p>
                    <div className="flex flex-col gap-3">
                        {contacts.map((c) => (
                            <a href={`https://wa.me/${c.wa}`} key={c.name} className="flex items-center gap-3 border bg-gray-50 px-3 py-2.5">
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{c.name}</p>
                                    <p className="text-xs text-gray-500">{c.phone}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="gap mt-5 border-t pt-4 text-center">
                    <a href="/login" className="flex items-center gap-2 text-sm text-gray-500 hover:text-black">
                        <ArrowLeft size={15} />
                        <span>Kembali ke halaman masuk</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
