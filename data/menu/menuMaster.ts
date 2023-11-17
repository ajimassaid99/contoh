import { AiFillDatabase } from 'react-icons/ai';
import { MdLocationCity } from 'react-icons/md';
import { PiBooksFill } from 'react-icons/pi';

export const menuMaster = [
    {
        kategori: 'Master',
        menu: [
            {
                icon: PiBooksFill,
                name: 'Materi',
                submenu: [
                    // submenu
                    {
                        path: '/admin/master/materi/mata-pelajaran',
                        name: 'Mata Pelajaran',
                    },
                    {
                        path: '/admin/master/materi/kurikulum',
                        name: 'Kurikulum',
                    },
                    {
                        path: '/admin/master/materi/bab',
                        name: 'BAB',
                    },
                    {
                        path: '/admin/master/materi/silabus',
                        name: 'Silabus',
                    },
                    {
                        path: '/admin/master/materi/mata-ajar',
                        name: 'Mata Ajar',
                    },
                    {
                        path: '/admin/master/materi/tahun',
                        name: 'Tahun',
                    },
                    {
                        path: '/admin/master/materi/tahun-ajaran',
                        name: 'Tahun Ajaran',
                    },
                    {
                        path: '/admin/master/materi/tingkat-kelas',
                        name: 'Tingkat Kelas',
                    },
                    {
                        path: '/admin/master/materi/jurusan-kelas',
                        name: 'Jurusan Kelas',
                    },
                ],
            },
            // region
            {
                icon: MdLocationCity,
                name: 'Region',
                submenu: [
                    // submenu
                    {
                        path: '/admin/master/region/provinsi',
                        name: 'Provinsi',
                    },
                    {
                        path: '/admin/master/region/kota',
                        name: 'Kota',
                    },
                    {
                        path: '/admin/master/region/kota-go',
                        name: 'Kota GO',
                    },
                    {
                        path: '/admin/master/region/cabang',
                        name: 'Cabang',
                    },
                    {
                        path: '/admin/master/region/gedung',
                        name: 'Gedung',
                    },
                    {
                        path: '/admin/master/region/ruangan',
                        name: 'Ruangan',
                    },
                    {
                        path: '/admin/master/region/bidang',
                        name: 'Bidang',
                    },
                ],
            },
            // produk
            {
                icon: AiFillDatabase,
                name: 'Produk',
                submenu: [
                    // submenu
                    {
                        path: '/admin/master/produk/jenis-komponent-produk',
                        name: 'Jenis Komponen Produk',
                    },
                    {
                        path: '/admin/master/produk/jenis-produk',
                        name: 'Jenis Produk',
                    },
                ],
            },
        ],
    },
];
