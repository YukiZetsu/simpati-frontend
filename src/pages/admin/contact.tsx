import AdminLayout from '@/layouts/admin/admin-layout';
import { MessageSquarePlus } from 'lucide-react';

const contacts = [
    { name: 'Ahmad Azmiy Fawwaz', phone: '+62 821-3140-0557', wa: '6282131400557' },
    { name: 'Didik Sujatmiko', phone: '+62 877-6049-8320', wa: '6287760498320' },
    { name: 'Lukman Adi Wijaya', phone: '+62 851-3608-5201', wa: '6285136085201' },
    { name: 'Muhammad Ridwan', phone: '+62 821-2514-8174', wa: '6282125148174' },
    { name: 'Naufal Andrianto Nugraha', phone: '+62 821-3235-0796', wa: '6282132350796' },
];

export default function Contact() {
    return (
        <AdminLayout active="contact">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Kontak Pengembang</h1>
                <p className="w-3/5 text-justify text-gray-500">
                    Apabila Anda mengalami kesulitan dalam menjalankan website atau terdapat hal yang tidak diekspetasi, seperti bug, dan lain-lain,
                    Anda dapat menghubungi salah satu nomor pengembang yang dicantumkan.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {contacts.map((contact) => (
                    <div key={contact.name} className="flex items-center justify-between border bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div>
                                <p className="font-semibold">{contact.name}</p>
                                <p className="text-sm text-gray-500">{contact.phone}</p>
                            </div>
                        </div>

                        <a
                            href={`https://wa.me/${contact.wa}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 px-3 py-2 text-xs font-semibold text-white hover:bg-green-600"
                        >
                            <MessageSquarePlus />
                        </a>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
