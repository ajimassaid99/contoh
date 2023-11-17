import { AiFillSchedule } from 'react-icons/ai';
import { BsCalendarDate } from 'react-icons/bs';
import { FaBusinessTime } from 'react-icons/fa6';
import { GiTeacher } from 'react-icons/gi';

export const menuPengajar = [
    {
        kategori: 'Pengajar',
        menu: [
            {
                icon: GiTeacher,
                name: 'Data Pengajar',
                submenu: [
                    // submenu
                    {
                        path: '#',
                        name: 'List Pengajar',
                    },
                    {
                        path: '#',
                        name: 'Tambah Pengajar',
                    },
                    {
                        path: '#',
                        name: 'Edit Data Pengajar',
                    },
                ],
            },
            {
                icon: AiFillSchedule,
                name: 'Jadwal Pengajar',
                submenu: [
                    // submenu
                    {
                        path: '#',
                        name: 'Kelompok Pengajar',
                    },
                    {
                        path: '/admin/rencana-kerja-pengajar',
                        name: 'Rencana Kerja Pengajar',
                    },
                    {
                        path: '#',
                        name: 'Ketersediaan Pengajar',
                    },
                ],
            },
            // jpmp
            {
                icon: BsCalendarDate,
                name: 'JPMP',
                submenu: [
                    // submenu
                    {
                        path: '#',
                        name: 'JPMP',
                    },
                    {
                        path: '#',
                        name: 'JPMP Kelas',
                    },
                    {
                        path: '#',
                        name: 'Validasi JPMP Kelas',
                    },
                ],
            },
            {
                icon: FaBusinessTime,
                name: 'Tutorial Service Time',
                submenu: [
                    // submenu
                    {
                        path: '#',
                        name: 'Permintaan TST',
                    },
                    {
                        path: '#',
                        name: 'Jadwal TST',
                    },
                    {
                        path: '#',
                        name: 'Realiasi TST',
                    },
                ],
            },
        ],
    },
];
