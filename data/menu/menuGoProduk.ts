import { BsPersonLock } from 'react-icons/bs';
import { HiOutlineArchive } from 'react-icons/hi';
import { IoMdPricetags } from 'react-icons/io';
import { MdOutlinePriceChange } from 'react-icons/md';
import { PiShoppingCartSimpleBold, PiStackFill } from 'react-icons/pi';
import { RxMix } from 'react-icons/rx';

export const menuGoProduk = [
    {
        kategori: 'Go Produk',
        menu: [
            {
                icon: BsPersonLock,
                name: 'Akses GO Produk',
                submenu: [
                    {
                        name: 'Role',
                        path: '/admin/roles',
                    },
                    {
                        name: 'Petugas',
                        path: '/admin/petugas',
                    },
                ],
            },
            {
                icon: IoMdPricetags,
                name: 'Jenis Diskon',
                submenu: [
                    {
                        name: 'Daftar Jenis Diskon',
                        path: '#',
                    },
                    {
                        name: 'Membuat Jenis Diskon',
                        path: '#',
                    },
                    {
                        name: 'Validasi Jenis Diskon',
                        path: '#',
                    },
                ],
            },
            {
                icon: MdOutlinePriceChange,
                name: 'Jenis Diskon Kota',
                submenu: [
                    {
                        name: 'Daftar Diskon Kota ',
                        path: '#',
                    },
                    {
                        name: 'Membuat Diskon Kota',
                        path: '#',
                    },
                    {
                        name: 'Validasi Diskon Kota',
                        path: '#',
                    },
                ],
            },
            {
                icon: HiOutlineArchive,
                name: 'Komponen Produk',
                submenu: [
                    {
                        name: 'Daftar',
                        path: '#',
                    },
                    {
                        name: 'Membuat',
                        path: '#',
                    },
                    {
                        name: 'Validasi',
                        path: '#',
                    },
                ],
            },
            {
                icon: RxMix,
                name: 'Produk Mix',
                submenu: [
                    {
                        name: 'Daftar',
                        path: '#',
                    },
                    {
                        name: 'Pembuatan',
                        path: '#',
                    },
                    {
                        name: 'Validasi',
                        path: '#',
                    },
                    {
                        name: 'Pengesahan',
                        path: '#',
                    },
                ],
            },
            {
                icon: PiShoppingCartSimpleBold,
                name: 'Pemberlakuan Produk',
                submenu: [
                    {
                        name: 'Daftar Produk Dijual',
                        path: '#',
                    },
                    {
                        name: 'Penjualan Produk',
                        path: '#',
                    },
                    {
                        name: 'Persetujuan Produk',
                        path: '#',
                    },
                ],
            },
            {
                icon: PiStackFill,
                name: 'Bundling',
                submenu: [
                    {
                        name: 'Daftar Bundling',
                        path: '#',
                    },
                    {
                        name: 'Pembuatan Bundling',
                        path: '#',
                    },
                    {
                        name: 'Verifikasi Bundling',
                        path: '#',
                    },
                    {
                        name: 'Pengesahan Bundling',
                        path: '#',
                    },
                ],
            },
        ],
    },
];
