import { BiColumns, BiPackage } from 'react-icons/bi';
import { FaBook } from 'react-icons/fa6';
import { GoVideo } from 'react-icons/go';
import { VscSymbolString } from 'react-icons/vsc';

export const menumateri = [
    {
        kategori: 'Materi',
        menu: [
            {
                icon: GoVideo,
                name: 'Video Ekstra',
                path: '/admin/materi/video-ekstra',
            },
            {
                icon: VscSymbolString,
                name: 'Soal',
                submenu: [
                    // submenu
                    {
                        path: '/admin/materi/soal/sumber-soal',
                        name: 'Sumber Soal',
                    },
                    {
                        path: '/admin/materi/soal/wacana',
                        name: 'Wacana',
                    },
                    {
                        path: '/admin/materi/soal/mengisi-soal',
                        name: 'Mengisi Soal',
                    },
                    {
                        path: '/admin/materi/soal/verifikasi-soal',
                        name: 'Verifikasi Soal',
                    },
                    {
                        path: '/admin/materi/soal/target-pengerjaan-soal',
                        name: 'Target Pengerjaan Soal',
                    },
                    {
                        path: '/admin/materi/soal/kunci-jawaban',
                        name: 'Kunci Jawaban',
                    },
                ],
            },
            // buku
            {
                icon: FaBook,
                name: 'Buku',
                submenu: [
                    // submenu
                    {
                        path: '/admin/materi/buku/mengisi-teori',
                        name: 'Mengisi Teori',
                    },
                    {
                        path: '/admin/materi/buku/membuat-buku',
                        name: 'Membuat Buku',
                    },
                ],
            },
            // bah
            {
                icon: BiColumns,
                name: 'BAH',
                submenu: [
                    // submenu
                    {
                        path: '/admin/materi/bah/membuat-bah',
                        name: 'Membuat BAH',
                    },
                    {
                        path: '/admin/materi/bah/menautkan-bah-kelas',
                        name: 'Menautkan BAH-Kelas',
                    },
                    {
                        path: '/admin/materi/bah/monitoring-bah-kelas',
                        name: 'Monitoring BAH-Kelas',
                    },
                ],
            },
            // tob
            {
                icon: BiPackage,
                name: 'TOB',
                path: '/admin/materi/tob',
            },
        ],
    },
];
