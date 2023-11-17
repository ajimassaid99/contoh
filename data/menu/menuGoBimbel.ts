import { BsPersonLock } from 'react-icons/bs';

export const menuGoBimbel = [
    {
        kategori: 'Go Bimbel',
        menu: [
            {
                icon: BsPersonLock,
                name: 'Akses GO Bimbel',
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
                icon: BsPersonLock,
                name: 'List TOBK Nasional',
                submenu: [],
            },
            {
                icon: BsPersonLock,
                name: 'Mading',
                submenu: [],
            },
            {
                icon: BsPersonLock,
                name: 'Banner',
                submenu: [],
            },
            {
                icon: BsPersonLock,
                name: 'Testimoni Produk Kami',
                submenu: [],
            },
            {
                icon: BsPersonLock,
                name: 'FAQ',
                submenu: [],
            },
        ],
    },
];
