import { BiSolidComponent } from 'react-icons/bi';
import { BsBoxSeamFill, BsLayersFill } from 'react-icons/bs';
import { FaGifts } from 'react-icons/fa6';
import { RxMix } from 'react-icons/rx';
import { SiBookstack, SiGoogleclassroom } from 'react-icons/si';

export const menuProduk = [
    {
        kategori: 'Produk',
        menu: [
            {
                icon: SiGoogleclassroom,
                name: 'Kelas GO',
                submenu: [
                    // submenu
                    {
                        path: '/admin/produk/kelas-go/membuat-kelas-go',
                        name: 'Membuat Kelas GO',
                    },
                    {
                        path: '/admin/produk/kelas-go/list-kelas-go',
                        name: 'List Data Kelas GO',
                    },
                    {
                        path: '/admin/produk/kelas-go/peluncuran-kelas-go',
                        name: 'Peluncuran Kelas GO',
                    },
                    {
                        path: '/admin/produk/kelas-go/menjalankan-kelas-go',
                        name: 'Menjalankan Kelas GO',
                    },
                    {
                        path: '/admin/produk/kelas-go/persetujuan-re-kelas-go',
                        name: 'Persetujuan RE Kelas GO',
                    },
                    {
                        path: '/admin/produk/kelas-go/akhiri-kelas-go',
                        name: 'Akhiri Kelas GO',
                    },
                    {
                        path: '/admin/produk/kelas-go/fasilitas-kelas-go',
                        name: 'Fasilitas Kelas GO',
                    },
                ],
            },
            {
                icon: BsLayersFill,
                name: 'Paket Dan Bundel Soal',
                submenu: [
                    // submenu
                    {
                        path: '/admin/produk/paket-bundel-soal/membuat-bundle',
                        name: 'Membuat Bundle',
                    },
                    {
                        path: '/admin/produk/paket-bundel-soal/membuat-paket',
                        name: 'Membuat Paket',
                    },
                    {
                        path: '/admin/produk/paket-bundel-soal/produk-kelompok',
                        name: 'Produk Kelompok',
                    },
                ],
            },
            // komponen produk
            {
                icon: BiSolidComponent,
                name: 'Komponen Produk',
                submenu: [
                    // submenu
                    {
                        path: '/admin/produk/komponent-produk/list',
                        name: 'List',
                    },
                    {
                        path: '/admin/produk/komponent-produk/create',
                        name: 'Create',
                    },
                    {
                        path: '/admin/produk/komponent-produk/validasi',
                        name: 'Validasi',
                    },
                ],
            },
            // produk mix
            {
                icon: RxMix,
                name: 'Produk Mix',
                submenu: [
                    // submenu
                    {
                        path: '/admin/produk/produk-mix/list',
                        name: 'List',
                    },
                    {
                        path: '/admin/produk/produk-mix/create',
                        name: 'Create',
                    },
                    {
                        path: '/admin/produk/produk-mix/validasi',
                        name: 'Validasi',
                    },
                ],
            },
            // bundling
            {
                icon: SiBookstack,
                name: 'Bundling',
                submenu: [
                    // submenu
                    {
                        path: '/admin/produk/bundling/list',
                        name: 'List',
                    },
                    {
                        path: '/admin/produk/bundling/create',
                        name: 'Create',
                    },
                    {
                        path: '/admin/produk/bundling/verifikasi',
                        name: 'Verifikasi',
                    },
                    {
                        path: '/admin/produk/bundling/pengesahan',
                        name: 'Pengesahan',
                    },
                ],
            },
            // pemberlakuan produk
            {
                icon: BsBoxSeamFill,
                name: 'Pemberlakuan Produk',
                submenu: [
                    // submenu
                    {
                        path: '/admin/produk/pemberlakuan-produk/list-produk-dijual',
                        name: 'List Produk Dijual',
                    },
                    {
                        path: '/admin/produk/pemberlakuan-produk/penjualan-produk',
                        name: 'Penjualan Produk',
                    },
                    {
                        path: '/admin/produk/pemberlakuan-produk/persetujuan-produk',
                        name: 'Persetujuan Produk',
                    },
                ],
            },
            // produk teaser
            {
                icon: FaGifts,
                name: 'Produk Teaser',
                submenu: [
                    // submenu
                    {
                        path: '/admin/produk/produk-teaser/buku-teori-teaser',
                        name: 'Buku Teori Teaser',
                    },
                    {
                        path: '/admin/produk/produk-teaser/paket-soal-teaser',
                        name: 'Paket Soal Teaser',
                    },
                    {
                        path: '/admin/produk/produk-teaser/video-teaser',
                        name: 'Video Teaser',
                    },
                ],
            },
        ],
    },
];
