import { FaMoneyBill1Wave, FaMoneyBillTransfer } from 'react-icons/fa6';
import { MdOutlineAccountBalanceWallet, MdPayments } from 'react-icons/md';
import { TbReportMoney } from 'react-icons/tb';

export const menuPayment = [
    {
        kategori: 'Payment',
        menu: [
            // rekening
            {
                icon: MdOutlineAccountBalanceWallet,
                name: 'Rekening',
                submenu: [
                    // submenu
                    {
                        path: '#',
                        name: 'Upload Virtual Account',
                    },
                ],
            },
            // transaksi
            {
                icon: FaMoneyBillTransfer,
                name: 'Transaksi',
                submenu: [
                    // submenu
                    {
                        path: '#',
                        name: 'Simulasi',
                    },
                    {
                        path: '#',
                        name: 'Pendaftaran',
                    },
                    {
                        path: '#',
                        name: 'Pembayaran Cicilan',
                    },
                ],
            },
            // transaksi paket satuan
            {
                icon: FaMoneyBill1Wave,
                name: 'Transaksi Paket Satuan',
                submenu: [
                    // submenu
                    {
                        path: '#',
                        name: 'Simulasi',
                    },
                    {
                        path: '#',
                        name: 'Pembayaran',
                    },
                ],
            },
            // penagihan
            {
                icon: MdPayments,
                name: 'Penagihan',
                submenu: [
                    // submenu
                    {
                        path: '#',
                        name: 'Penagihan Pusat',
                    },
                    {
                        path: '#',
                        name: 'Penagihan Cabang',
                    },
                ],
            },
            // laporan keuangan
            {
                icon: TbReportMoney,
                name: 'Laporan Keuangan',
                submenu: [
                    // submenu
                    {
                        path: '#',
                        name: 'Laporan Audit Transaksi Pembayaran',
                    },
                    {
                        path: '#',
                        name: 'Laporan Audit Penggunaan Diskon',
                    },
                    {
                        path: '#',
                        name: 'Laporan Audit Penggunaan Diskon 2',
                    },
                    {
                        path: '#',
                        name: 'Laporan Pelunasan',
                    },
                    {
                        path: '#',
                        name: 'Laporan Potensi Pembayaran',
                    },
                ],
            },
        ],
    },
];
