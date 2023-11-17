import { BiBuilding, BiLibrary } from "react-icons/bi";
import { BsFileEarmark, BsFillHddStackFill, BsPersonLock } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa6";
import { FiPackage } from "react-icons/fi";
import { MdOutlineFileCopy, MdWorkOutline } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";

export const menuGoKasir = [
    {
        kategori: "Go Kasir",
        menu: [
            {
                icon: BsPersonLock,
                name: "Akses GO Kasir",
                submenu: [
                    {
                        name: "Role",
                        path: "/admin/go-kasir/akses/role",
                    },
                    {
                        name: "Petugas",
                        path: "/admin/go-kasir/akses/petugas",
                    },
                ],
            },
            {
                icon: BsFillHddStackFill,
                name: "Rekening",
                submenu: [
                    {
                        name: "Upload Virtual Account",
                        path: "/admin/go-kasir/rekening",
                    },
                ],
            },
            {
                icon: MdOutlineFileCopy,
                name: "Transaksi",
                submenu: [
                    {
                        name: "Simulasi",
                        path: "/admin/go-kasir/transaksi/simulasi",
                    },
                    {
                        name: "Pendaftaran",
                        path: "/admin/go-kasir/transaksi/pendaftaran",
                    },
                    {
                        name: "/admin/go-kasir/transaksi/cicilan",
                        path: "#",
                    },
                ],
            },
            {
                icon: MdOutlineFileCopy,
                name: "Transaksi Artikel",
                submenu: [
                    {
                        name: "Simulasi Artikel",
                        path: "#",
                    },
                    {
                        name: "Pembayaran Artikel",
                        path: "#",
                    },
                ],
            },
            {
                icon: FaMoneyBillWave,
                name: "Dokumen Diskon",
                submenu: [
                    {
                        name: "Unggah Dokumen Diskon",
                        path: "/admin/go-kasir/dokumen-diskon/unggah",
                    },
                    {
                        name: "Validasi Dokumen Diskon",
                        path: "/admin/go-kasir/dokumen-diskon/validasi",
                    },
                ],
            },
            {
                icon: BiLibrary,
                name: "Penagihan",
                submenu: [
                    {
                        name: "Penagihan Pusat",
                        path: "#",
                    },
                    {
                        name: "Penagihan Cabang",
                        path: "#",
                    },
                ],
            },
            {
                icon: TbReportAnalytics,
                name: "BASTUP",
                submenu: [
                    {
                        name: "Pembuatan BASTUP",
                        path: "#",
                    },
                    {
                        name: "Validasi BASTUP",
                        path: "#",
                    },
                ],
            },
            {
                icon: MdWorkOutline,
                name: "BASTPH",
                submenu: [
                    {
                        name: "Pembuatan BASTPH",
                        path: "#",
                    },
                    {
                        name: "Validasi BASTPH",
                        path: "#",
                    },
                ],
            },
            {
                icon: BiBuilding,
                name: "LSPH",
                submenu: [
                    {
                        name: "Pembuatan LSPH",
                        path: "#",
                    },
                ],
            },
            {
                icon: BsPersonLock,
                name: "MDR",
                submenu: [
                    {
                        name: "MDR",
                        path: "#",
                    },
                ],
            },
            {
                icon: FiPackage,
                name: "GO Kreasi",
                submenu: [
                    {
                        name: "Registrasi",
                        path: "#",
                    },
                ],
            },
            {
                icon: BsFileEarmark,
                name: "Bimker",
                submenu: [
                    {
                        name: "Daftar Bimker",
                        path: "#",
                    },
                    {
                        name: "Buat Bimker",
                        path: "#",
                    },
                    {
                        name: "Verifikasi Bimker",
                        path: "#",
                    },
                    {
                        name: "Persetujuan Bimker",
                        path: "#",
                    },
                    {
                        name: "Entri Siswa Bimker",
                        path: "#",
                    },
                ],
            },
            {
                icon: BsPersonLock,
                name: "Laporan Keuangan",
                submenu: [
                    {
                        name: "Laporan Audit Transaksi Pembayaran",
                        path: "#",
                    },
                    {
                        name: "Laporan Audit Penggunaan Diskon",
                        path: "#",
                    },
                    {
                        name: "Laporan Audit Penggunaan Diskon 2",
                        path: "#",
                    },
                    {
                        name: "Laporan Pelunasan",
                        path: "#",
                    },
                    {
                        name: "Laporan Potensi Pembayaran",
                        path: "#",
                    },
                    {
                        name: "Laporan Pembayaran Bimker",
                        path: "#",
                    },
                ],
            },
        ],
    },
];
