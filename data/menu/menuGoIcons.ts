import { BiBuilding, BiLibrary } from 'react-icons/bi';
import { BsFileEarmark, BsFileEarmarkPersonFill, BsFillCameraVideoFill, BsFillHddStackFill, BsPersonFill, BsPersonLinesFill, BsPersonLock } from 'react-icons/bs';
import { FaMoneyBillWave } from 'react-icons/fa6';
import { FiPackage } from 'react-icons/fi';
import { LiaUniversalAccessSolid } from 'react-icons/lia';
import { MdOutlineFileCopy, MdOutlinePersonalVideo, MdOutlinePhoneIphone, MdPersonOutline, MdWorkOutline } from 'react-icons/md';
import { RiBillLine } from 'react-icons/ri';
import { TbBuildingBank, TbBuildingCottage, TbReportAnalytics, TbZoomMoney } from 'react-icons/tb';

export const menuGoIcons = [
    {
        kategori: 'Go Icons',
        menu: [
            {
                icon: BsPersonLock,
                name: 'Akses GO Icons',
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
                icon: BsFillHddStackFill,
                name: 'Master GO Icons',
                submenu: [
                    {
                        name: 'Tingkat Cakupan Kerja',
                        path: '#',
                    },
                    {
                        name: 'Cakupan Kerja',
                        path: '#',
                    },
                    {
                        name: 'Kota GO',
                        path: '#',
                    },
                    {
                        name: 'Bidang',
                        path: '#',
                    },
                    {
                        name: 'Jabatan Posisi',
                        path: '#',
                    },
                    {
                        name: 'Level Jabatan',
                        path: '#',
                    },
                    {
                        name: 'Zona Kerja',
                        path: '#',
                    },
                    {
                        name: 'Jenis Barang',
                        path: '#',
                    },
                    {
                        name: 'Satuan Barang',
                        path: '#',
                    },
                    {
                        name: ' Barang',
                        path: '#',
                    },
                    {
                        name: 'Target Minimal Lulus GOA',
                        path: '#',
                    },
                    {
                        name: 'Kelompok Karyawan',
                        path: '#',
                    },
                    {
                        name: 'Mata Pelajaran',
                        path: '#',
                    },
                ],
            },
            {
                icon: BiBuilding,
                name: 'Gedung',
                submenu: [
                    {
                        name: 'Data Gedung',
                        path: '#',
                    },
                    {
                        name: 'Kepemilikan',
                        path: '#',
                    },
                ],
            },
            {
                icon: TbBuildingBank,
                name: 'Kelas',
                submenu: [
                    {
                        name: 'Buat Kelas Baru',
                        path: '#',
                    },
                    {
                        name: 'Daftar Data Kelas',
                        path: '#',
                    },
                    {
                        name: 'Peluncuran Kelas',
                        path: '#',
                    },
                    {
                        name: 'Menjalankan Kelas',
                        path: '#',
                    },
                    {
                        name: 'Persetujuan RE',
                        path: '#',
                    },
                    {
                        name: 'Akhiri Kelas',
                        path: '#',
                    },
                    {
                        name: 'Kelas Fasilitas',
                        path: '#',
                    },
                ],
            },
            {
                icon: TbBuildingCottage,
                name: 'Ruangan',
                submenu: [
                    {
                        name: 'Jenis Ruangan',
                        path: '#',
                    },
                    {
                        name: 'Peruntukan Ruangan',
                        path: '#',
                    },
                    {
                        name: 'Buat Ruangan Baru',
                        path: '#',
                    },
                    {
                        name: 'Daftar Ruangan',
                        path: '#',
                    },
                ],
            },
            {
                icon: RiBillLine,
                name: 'Mutasi Usulan',
                submenu: [
                    {
                        name: 'Pengajuan',
                        path: '#',
                    },
                    {
                        name: 'Daftar Pengajuan',
                        path: '#',
                    },
                    {
                        name: 'Persetujuan BSGA',
                        path: '#',
                    },
                    {
                        name: 'Persetujuan Keuangan',
                        path: '#',
                    },
                ],
            },
            {
                icon: MdPersonOutline,
                name: 'Siswa',
                submenu: [
                    {
                        name: 'Edit Data Siswa',
                        path: '#',
                    },
                    {
                        name: 'Edit Data Siswa(Keuangan)',
                        path: '#',
                    },
                    {
                        name: 'Produk GO Kreasi Siswa',
                        path: '#',
                    },
                ],
            },
            {
                icon: MdOutlineFileCopy,
                name: 'Data Kelulusan',
                submenu: [
                    {
                        name: 'Input No SNBP-SNBT',
                        path: '#',
                    },
                    {
                        name: 'Laporan No SNBP-SNBT',
                        path: '#',
                    },
                    {
                        name: 'Input Kelulusan',
                        path: '#',
                    },
                    {
                        name: 'Reset Kelulusan',
                        path: '#',
                    },
                    {
                        name: 'Laporan Kelulusan',
                        path: '#',
                    },
                ],
            },
            {
                icon: BsPersonLinesFill,
                name: 'Karyawan',
                submenu: [
                    {
                        name: 'Karyawan Baru',
                        path: '#',
                    },
                    {
                        name: 'Daftar Karyawan',
                        path: '#',
                    },
                    {
                        name: 'Edit Karyawan',
                        path: '#',
                    },
                ],
            },
            {
                icon: MdOutlinePersonalVideo,
                name: 'Persensi Karyawan',
                submenu: [
                    {
                        name: 'Jadwal Rencana Kerja',
                        path: '#',
                    },
                    {
                        name: 'Lihat Data Persensi',
                        path: '#',
                    },
                    {
                        name: 'Validasi Persensi',
                        path: '#',
                    },
                    {
                        name: 'QR Kehadiran Pengajar',
                        path: '#',
                    },
                ],
            },
            {
                icon: BsPersonFill,
                name: 'Pengajar',
                submenu: [
                    {
                        name: 'Pengajar Baru',
                        path: '#',
                    },
                    {
                        name: 'Daftar Pengajar',
                        path: '#',
                    },
                    {
                        name: 'Edit Pengajar',
                        path: '#',
                    },
                ],
            },
            {
                icon: BsFileEarmark,
                name: 'Perjanjian Kerja',
                submenu: [
                    {
                        name: 'Pegawai PKWT',
                        path: '#',
                    },
                    {
                        name: 'Distribusi',
                        path: '#',
                    },
                    {
                        name: 'Penilaian Cabang',
                        path: '#',
                    },
                    {
                        name: 'Penilaian Bidang',
                        path: '#',
                    },
                    {
                        name: 'Penilaian BSDM',
                        path: '#',
                    },
                    {
                        name: 'Keputusan',
                        path: '#',
                    },
                    {
                        name: 'Upload Surat',
                        path: '#',
                    },
                ],
            },
            {
                icon: MdOutlinePhoneIphone,
                name: 'Go Kreasi',
                submenu: [
                    {
                        name: 'Registrasi Go Kreasi',
                        path: '#',
                    },
                    {
                        name: 'Log Aktifitas',
                        path: '#',
                    },
                    {
                        name: 'Unduh EPB',
                        path: '#',
                    },
                    {
                        name: 'Reset Device',
                        path: '#',
                    },
                    {
                        name: 'Open Ticket',
                        path: '#',
                    },
                    {
                        name: 'Reset Pengerjaan Soal',
                        path: '#',
                    },
                    {
                        name: 'Unduh Nilai TO',
                        path: '#',
                    },
                    {
                        name: 'Unduh Rekap Hasil TO',
                        path: '#',
                    },
                ],
            },
            {
                icon: BsFillCameraVideoFill,
                name: 'Rapat',
                submenu: [
                    {
                        name: 'Buat Notulen Rapat',
                        path: '#',
                    },
                    {
                        name: 'Lihat Status Notulen',
                        path: '#',
                    },
                ],
            },
            {
                icon: BsFileEarmarkPersonFill,
                name: 'Simulasi SNBP',
                submenu: [
                    {
                        name: 'Input Pilihan Jurusan',
                        path: '#',
                    },
                    {
                        name: 'Input Nilai Rapor',
                        path: '#',
                    },
                    {
                        name: 'Simulasi SNBP',
                        path: '#',
                    },
                ],
            },
            {
                icon: BsFileEarmarkPersonFill,
                name: 'Simulasi SNBT',
                submenu: [
                    {
                        name: 'Simulasi SNBP',
                        path: '#',
                    },
                ],
            },
            {
                icon: MdWorkOutline,
                name: 'Pusat Riso dan Vendor',
                submenu: [
                    {
                        name: 'Pusat Riso',
                        path: '#',
                    },
                    {
                        name: 'Pusat Riso Gedung',
                        path: '#',
                    },
                    {
                        name: 'Vendor',
                        path: '#',
                    },
                ],
            },
            {
                icon: FaMoneyBillWave,
                name: 'Survey Harga Barang',
                submenu: [
                    {
                        name: 'Lihat Status Survei',
                        path: '#',
                    },
                    {
                        name: 'Survei Harga Barang',
                        path: '#',
                    },
                    {
                        name: 'Laporan Hasil Survei',
                        path: '#',
                    },
                    {
                        name: 'Pernyataan Selesai Survei',
                        path: '#',
                    },
                ],
            },
            {
                icon: FiPackage,
                name: 'Pengajuan Barang',
                submenu: [
                    {
                        name: 'Cakupan Kerja DPPB',
                        path: '#',
                    },
                    {
                        name: 'Lihat Status DPPB',
                        path: '#',
                    },
                    {
                        name: 'Buat DPPB',
                        path: '#',
                    },
                    {
                        name: 'Persetujuan Kacab',
                        path: '#',
                    },
                    {
                        name: 'Persetujuan Bidang',
                        path: '#',
                    },
                    {
                        name: 'Persetujuan Logistik',
                        path: '#',
                    },
                    {
                        name: 'Laporan DPPB',
                        path: '#',
                    },
                    {
                        name: 'Laporan Histori Status DPPB',
                        path: '#',
                    },
                ],
            },
            {
                icon: TbZoomMoney,
                name: 'Anggaran',
                submenu: [
                    {
                        name: 'Lihat Status Kegiatan',
                        path: '#',
                    },
                    {
                        name: 'Izin Prinsip',
                        path: '#',
                    },
                    {
                        name: 'Penetapan Tanggal Kegiatan',
                        path: '#',
                    },
                    {
                        name: 'Persetujuan Kacab Kegiatan',
                        path: '#',
                    },
                    {
                        name: 'Acc Kegiatan Oleh Bidang',
                        path: '#',
                    },
                    {
                        name: 'Rekap Pengajuan Dana',
                        path: '#',
                    },
                    {
                        name: 'Petugas PPA',
                        path: '#',
                    },
                    {
                        name: 'Bank',
                        path: '#',
                    },
                    {
                        name: 'Entri Data Nomor Rekening',
                        path: '#',
                    },
                    {
                        name: 'Pengajuan Anggaran Kegiatan',
                        path: '#',
                    },
                    {
                        name: 'Proses LK',
                        path: '#',
                    },
                    {
                        name: 'PPA',
                        path: '#',
                    },
                    {
                        name: 'ACC Kabag',
                        path: '#',
                    },
                    {
                        name: 'ACC Manajer',
                        path: '#',
                    },
                    {
                        name: 'Lihat Status Anggaran',
                        path: '#',
                    },
                    {
                        name: 'Resume Progres Ajuan Anggaran',
                        path: '#',
                    },
                    {
                        name: 'Rekap Permohonan Transfer Anggaran',
                        path: '#',
                    },
                ],
            },
            {
                icon: BiLibrary,
                name: '3B-Belajar',
                submenu: [
                    {
                        name: 'Laporan Tes VAK Siswa',
                        path: '#',
                    },
                    {
                        name: 'Laporan Tes GOA Siswa',
                        path: '#',
                    },
                    {
                        name: 'Laporan# Persensi Siswa',
                        path: '#',
                    },
                ],
            },
            {
                icon: TbReportAnalytics,
                name: 'Laporan',
                submenu: [
                    {
                        name: 'Laporan',
                        path: '#',
                    },
                ],
            },
            {
                icon: LiaUniversalAccessSolid,
                name: 'Akses',
                submenu: [
                    {
                        name: 'Menu',
                        path: '#',
                    },
                    {
                        name: 'Role Menu',
                        path: '#',
                    },
                    {
                        name: 'Petugas Icons',
                        path: '#',
                    },
                ],
            },
        ],
    },
];
