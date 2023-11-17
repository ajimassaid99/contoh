import { BiSolidDiscount } from 'react-icons/bi';
import { CiDiscount1 } from 'react-icons/ci';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';

export const menuDiskon = [
    {
        kategori: 'Diskon',
        menu: [
            {
                icon: BiSolidDiscount,
                name: 'Jenis Diskon',
                submenu: [
                    // submenu
                    {
                        path: '/admin/diskon/jenis-diskon/list',
                        name: 'List',
                    },
                    {
                        path: '/admin/diskon/jenis-diskon/create',
                        name: 'Create',
                    },
                    {
                        path: '/admin/diskon/jenis-diskon/validasi',
                        name: 'Validasi',
                    },
                ],
            },
            // jenis diskon mix
            {
                icon: CiDiscount1,
                name: 'Jenis Diskon Mix',
                submenu: [
                    // submenu
                    {
                        path: '/admin/diskon/jenis-diskon-mix/list',
                        name: 'List',
                    },
                    {
                        path: '/admin/diskon/jenis-diskon-mix/create',
                        name: 'Create',
                    },
                    {
                        path: '/admin/diskon/jenis-diskon-mix/validasi',
                        name: 'Validasi',
                    },
                ],
            },
            // dokumen diskon
            {
                icon: HiOutlineClipboardDocumentList,
                name: 'Dokumen Diskon',
                submenu: [
                    // submenu
                    {
                        path: '/admin/diskon/dokumen-diskon/unggah-dokumen-diskon',
                        name: 'Unggah Dokumen Diskon',
                    },
                    {
                        path: '/admin/diskon/dokumen-diskon/validasi-dokumen-diskon',
                        name: 'Validasi Dokumen Diskon',
                    },
                ],
            },
        ],
    },
];
