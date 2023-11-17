import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiBook, BiVideo } from "react-icons/bi";
import { BsBox2, BsJournalBookmarkFill, BsKey, BsListUl, BsPersonLock, BsStack } from "react-icons/bs";
import { FaBoxArchive, FaRectangleList } from "react-icons/fa6";

export const menuSmba = [
    {
        kategori: "SMBA",
        menu: [
            {
                icon: BsPersonLock,
                name: "Akses SMBA",
                submenu: [
                    {
                        name: "Role",
                        path: "/admin/smba/akses/roles",
                    },
                    {
                        name: "Petugas",
                        path: "/admin/smba/akses/petugas",
                    },
                ],
            },
            {
                icon: BiBook,
                name: "Master SMBA",
                submenu: [
                    {
                        name: "Mata Pelajaran",
                        path: "/admin/smba/master/mata-pelajaran",
                    },
                    {
                        name: "Kurikulum",
                        path: "/admin/smba/master/kurikulum",
                    },
                    {
                        name: "Bab",
                        path: "/admin/smba/master/bab",
                    },
                    {
                        name: "Silabus",
                        path: "/admin/smba/master/silabus",
                    },
                    {
                        name: "Mata Ajar",
                        path: "/admin/smba/master/mata-ajar",
                    },
                ],
            },
            {
                icon: BsListUl,
                name: "Soal",
                submenu: [
                    {
                        name: "Sumber Soal",
                        path: "/admin/smba/soal/sumber-soal",
                    },
                    {
                        name: "Wacana",
                        path: "/admin/smba/soal/wacana",
                    },
                    {
                        name: "Upload Video",
                        path: "/admin/smba/soal/upload-video",
                    },
                    {
                        name: "Mengisi Soal",
                        path: "/admin/smba/soal/mengisi-soal/mengisi-soal",
                    },
                    {
                        name: "Verifikasi Soal",
                        path: "/admin/smba/soal/verifikasi-soal",
                    },
                    {
                        name: "Target Pengerjaan Soal",
                        path: "/admin/smba/soal/target-pengerjaan-soal",
                    },
                ],
            },
            {
                icon: FaBoxArchive,
                name: "Paket dan Bundel Soal",
                submenu: [
                    {
                        name: "Membuat Bundel",
                        path: "/admin/smba/paketbundel/membuat-bundel",
                    },
                    {
                        name: "Membuat Paket",
                        path: "/admin/smba/paketbundel/membuat-paket",
                    },
                ],
            },
            {
                icon: BsJournalBookmarkFill,
                name: "Buku",
                submenu: [
                    {
                        name: "Mengisi Teori",
                        path: "/admin/smba/buku/mengisi-teori",
                    },
                    {
                        name: "Membuat Buku",
                        path: "/admin/smba/buku/membuat-buku",
                    },
                    {
                        name: "Buku Teori Teaser",
                        path: "/admin/smba/buku/buku-teori-teaser",
                    },
                ],
            },
            {
                icon: FaRectangleList,
                name: "BAH",
                submenu: [
                    {
                        name: "Membuat BAH",
                        path: "/admin/smba/bah/membuat-bah",
                    },
                    {
                        name: "Menautkan BAH-Kelas",
                        path: "/admin/smba/bah/menautkan-bah-kelas",
                    },
                    {
                        name: "Monitoring BAH-Kelas",
                        path: "/admin/smba/bah/monitoring-bah-kelas",
                    },
                ],
            },
            {
                icon: BsBox2,
                name: "TOB",
                submenu: [
                    {
                        name: "Membuat TOB",
                        path: "/admin/smba/tob/membuat-tob",
                    },
                    {
                        name: "Paket Soal Teaser",
                        path: "/admin/smba/tob/paket-soal-teaser",
                    },
                ],
            },
            {
                icon: BiVideo,
                name: "Video Teaser",
                submenu: [
                    {
                        name: "Membuat Video Teaser",
                        path: "/admin/smba/video-teaser/",
                    },
                ],
            },
            {
                icon: BiVideo,
                name: "Video Ekstra",
                submenu: [
                    {
                        name: "Membuat Video Ekstra",
                        path: "/admin/smba/video-ekstra/",
                    },
                ],
            },
            {
                icon: AiOutlineShoppingCart,
                name: "Produk Kelompok",
                submenu: [
                    {
                        name: "Kelola Produk Kelompok",
                        path: "/admin/smba/produk-kelompok/",
                    },
                ],
            },
            {
                icon: BsStack,
                name: "JPMP",
                submenu: [
                    {
                        name: "JPMP",
                        path: "/admin/smba/jpmp",
                    },
                    {
                        name: "JPMP Kelas",
                        path: "/admin/smba/jpmp/kelas",
                    },
                    {
                        name: "Validasi JPMP Kelas",
                        path: "/admin/smba/jpmp/validasi",
                    },
                ],
            },
            {
                icon: BsKey,
                name: "Kunci Jawaban",
                submenu: [
                    {
                        name: "Download Kunci Jawaban",
                        path: "/admin/smba/kunci-jawaban",
                    },
                ],
            },
        ],
    },
];
