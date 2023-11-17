import { BiSolidDashboard } from 'react-icons/bi';
import { GiBookshelf } from 'react-icons/gi';
import { RiSecurePaymentFill } from 'react-icons/ri';

export const dashboardMenu = [
    {
        kategori: 'Dashboard',
        menu: [
            {
                icon: GiBookshelf,
                name: 'Dashboard Paket & Soal',
                path: '/',
                submenu: null,
            },
            {
                icon: RiSecurePaymentFill,
                name: 'Dashboard Keuangan',
                path: '/dashboard-keuangan',
                submenu: null,
            },
            {
                icon: BiSolidDashboard,
                name: 'Dashboard User',
                path: '/dashboard-user',
                submenu: null,
            },
        ],
    },
];
