import { AiFillFolderOpen } from 'react-icons/ai';
import { FaSuitcaseRolling, FaUserGraduate } from 'react-icons/fa6';
import { GiGraduateCap } from 'react-icons/gi';
import { PiDeviceMobileCameraDuotone } from 'react-icons/pi';

export const menuSiswa = [
    {
        kategori: 'Siswa',
        menu: [
            {
                icon: FaUserGraduate,
                name: 'Data Siswa',
                submenu: [
                    // submenu
                    {
                        path: '#',
                        name: 'Registrasi Siswa',
                    },
                    {
                        path: '#',
                        name: 'Edit Data Siswa',
                    },
                    {
                        path: '#',
                        name: 'Produk GO Bimbel Siswa',
                    },
                ],
            },
            {
                icon: FaSuitcaseRolling,
                name: 'Perpindahan Siswa',
                submenu: [
                    // submenu
                    {
                        path: '#',
                        name: 'Gedung Siswa',
                    },
                    {
                        path: '#',
                        name: 'Produk Siswa',
                    },
                ],
            },
            // data kelulusan
            {
                icon: GiGraduateCap,
                name: 'Data Kelulusan',
                submenu: [
                    // submenu
                    {
                        path: '#',
                        name: 'Input No SNBP-SNBT',
                    },
                    {
                        path: '#',
                        name: 'Laporan No SNBP-SNBT',
                    },
                    {
                        path: '#',
                        name: 'Input Kelulusan',
                    },
                    {
                        path: '#',
                        name: 'Reset Kelulusan',
                    },
                    {
                        path: '#',
                        name: 'Laporan Kelulusan',
                    },
                ],
            },
            // device go bimbel
            {
                icon: PiDeviceMobileCameraDuotone,
                name: 'Device GO Bimbel',
                submenu: [
                    // submenu
                    {
                        path: '#',
                        name: 'Log Aktivitas',
                    },
                    {
                        path: '#',
                        name: 'Unduh EPB',
                    },
                    {
                        path: '#',
                        name: 'Reset Device',
                    },
                    {
                        path: '#',
                        name: 'Open Tiket',
                    },
                    {
                        path: '#',
                        name: 'Reset Pengerjaan Soal',
                    },
                    {
                        path: '#',
                        name: 'Unduh Nilai TO',
                    },
                    {
                        path: '#',
                        name: 'Unduh Rekap Hasil TO',
                    },
                    {
                        path: '#',
                        name: 'Input Pilihan Jurusan',
                    },
                    {
                        path: '#',
                        name: 'Input Nilai Rapor',
                    },
                ],
            },
            // simulasi snbp
            {
                icon: AiFillFolderOpen,
                name: 'Simulasi SNBP',
                submenu: [
                    // submenu
                    {
                        path: '#',
                        name: 'Input Pilihan Jurusan',
                    },
                    {
                        path: '#',
                        name: 'Input Nilai Rapor',
                    },
                    {
                        path: '#',
                        name: 'Simulasi SNBP',
                    },
                ],
            },
            {
                path: '#',
                icon: AiFillFolderOpen,
                name: 'Simulasi SNBT',
            },
        ],
    },
];
