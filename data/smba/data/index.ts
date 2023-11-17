import { SelectOptionsProps } from "@/types";
import { createStyles } from "@mantine/core";

export const PAGE_SIZES = [10, 20, 30];
export const useStyles = createStyles((theme) => ({
    expandIcon: {
        width: "15px",
        height: "15px",
        fontWeight: "bold",
        transition: "transform 0.2s ease",
    },
    expandIconRotated: {
        transform: "rotate(90deg)",
    },
}));
export const optionsJenisKelamin = [
    { label: "L", value: "L" },
    { label: "P", value: "P" },
];
export const optionsStatus = [
    { label: "AKTIF", value: "AKTIF" },
    { label: "TIDAK AKTIF", value: "TIDAK AKTIF" },
];
export const optionsAdaDiUtbk = [
    { label: "Ya", value: 1},
    { label: "TIDAK", value: 0},
];
export const optionsOpsi = [
    { label: "TAMBAH", value: "TAMBAH" },
    { label: "TIMPA", value: "TIMPA" },
];
export const optionsUrutBerdasarkan = [
    { label: "BAB", value: "BAB" },
    { label: "NOMOR", value: "NOMOR" },
];
export const optionsYaAtauTidak = [
    { label: "YA", value: "YA" },
    { label: "TIDAK", value: "TIDAK" },
];
export const optionsRole: SelectOptionsProps[] = [
    { value: "administrator", label: "administrator" },
    { value: "admin buku", label: "admin buku" },
    { value: "admin soal", label: "admin soal" },
];
export const optionsPelajaran: SelectOptionsProps[] = [
    { value: "bahasa indonesia", label: "Bahasa Indonesia" },
    { value: "bahasa inggris", label: "Bahasa Inggris" },
    { value: "matematika", label: "Matematika" },
];
export const optionsBab: SelectOptionsProps[] = [
    { value: "01.01", label: "01.01" },
    { value: "01.02", label: "01.02" },
    { value: "01.03", label: "01.03" },
];
export const optionsUplineBab: SelectOptionsProps[] = [
    { value: "01.01 PARAGRAF", label: "01.01 PARAGRAF" },
    { value: "01.02 TEKS BIOGRAFI", label: "01.02 TEKS BIOGRAFI" },
    { value: "01.03 TEKS CERAMAH", label: "01.03 TEKS CERAMAH" },
];
export const optionsPeluang: SelectOptionsProps[] = [
    { value: "SERING", label: "SERING" },
    { value: "NORMAL", label: "NORMAL" },
    { value: "JARANG", label: "JARANG" },
];
export const optionsTahun: SelectOptionsProps[] = [
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" },
    { label: "2021", value: "2021" },
];
export const optionsTahunAjaran: SelectOptionsProps[] = [
    { label: "2023/2024", value: "2023/2024" },
    { label: "2022/2023", value: "2022/2023" },
    { label: "2021/2022", value: "2021/2022" },
];
export const optionsJenisInstitusi: SelectOptionsProps[] = [
    { label: "SEKOLAH", value: "SEKOLAH" },
    { label: "PTN", value: "PTN" },
    { label: "GO", value: "GO" },
];
export const optionsSemester: SelectOptionsProps[] = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
];
export const optionsKurikulum: SelectOptionsProps[] = [
    { label: "CBSA", value: "CBSA" },
    { label: "KBK", value: "KBK" },
    { label: "KTSP", value: "KTSP" },
];
export const optionsTingkatKelas: SelectOptionsProps[] = [
    { label: "1 SD DASAR", value: "1 SD DASAR" },
    { label: "7 SMP DASAR", value: "7 SMP DASAR" },
    { label: "10 SMA DASAR", value: "10 SMA DASAR" },
];
export const optionsLayanan: SelectOptionsProps[] = [
    { label: "GOLD", value: "GOLD" },
    { label: "GOLD 12", value: "GOLD 12" },
    { label: "GOLD SD", value: "GOLD SD" },
];
export const optionsKelompokUjian: SelectOptionsProps[] = [
    { label: "MATEMATIKA", value: "MATEMATIKA" },
    { label: "LOGIKA", value: "LOGIKA" },
    { label: "BAHASA INGGIRS", value: "BAHASA INGGIRS" },
];
export const optionsJenisSumber: SelectOptionsProps[] = [
    { label: "AKM", value: "AKM" },
    { label: "Kedinasan", value: "Kedinasan" },
    { label: "Olimpiade", value: "Olimpiade" },
    { label: "Politeknik", value: "Politeknik" },
];
export const optionsPtn: SelectOptionsProps[] = [
    { label: "AKADEMI AKUNTASI BANDUNG", value: "AKADEMI AKUNTASI BANDUNG" },
    {
        label: "AKADEMI AKUNTASI SILIWANGI",
        value: "AKADEMI AKUNTASI SILIWANGI",
    },
    { label: "AKADEMI AKUNTASI GANESHA", value: "AKADEMI AKUNTASI GANESHA" },
];
export const optionsJenisProduk: SelectOptionsProps[] = [
    { label: "e-Empati Mandiri", value: "e-Empati Mandiri" },
    { label: "e-Empati Wajib", value: "e-Empati Wajib" },
    { label: "e-EPB", value: "e-EPB" },
];
export const optionsLevel: SelectOptionsProps[] = [
    { label: "SD", value: "SD" },
    { label: "SMP", value: "SMP" },
    { label: "SMA", value: "SMA" },
];
export const optionsKelengkapan: SelectOptionsProps[] = [
    { label: "LENGKAP", value: "LENGKAP" },
    { label: "SINGKAT", value: "SINGKAT" },
    { label: "RINGKAS", value: "RINGKAS" },
    { label: "RUMUS", value: "RUMUS" },
];
export const optionsZona: SelectOptionsProps[] = [
    { label: "BANDUNG ZONA 0", value: "LENGKAP" },
    { label: "BANDUNG ZONA 1", value: "LENGKAP" },
    { label: "BANDUNG ZONA 2", value: "LENGKAP" },
];
export const optionsMetodePengambilan: SelectOptionsProps[] = [
    { label: "ASLI", value: "ASLI" },
    { label: "REKONSTRUKSI", value: "REKONSTRUKSI" },
    { label: "MODIFIKASI", value: "MODIFIKASI" },
];
export const optionsLevelKognitif: SelectOptionsProps[] = [
    { label: "PENGETAHUAN", value: "PENGETAHUAN" },
    { label: "APLIKASI", value: "APLIKASI" },
    { label: "PENALARAN", value: "PENALARAN" },
];

export const OptionsKodePaket: DataKodePaketProps[] = [
    {
        label: "K001",
        value: "K001",
    },
    {
        label: "K002",
        value: "K002",
    },
    {
        label: "K003",
        value: "K003",
    },
];

export interface DataKodePaketProps {
    label: string;
    value: string;
}

export interface DataRolesProps {
    namaRole: string;
    jumlahMenu: number;
    status: string;
}
export interface DataRolesProps {
    namaRole: string;
    jumlahMenu: number;
    status: string;
}
interface DataMataPelajaranProps {
    mataPelajaran: string;
    singkatan: string;
    adaDiUtbk: string;
    status: string;
}
interface DataKurikulumProps {
    namaKurikulum: string;
    singkatan: string;
    tahunTerbit: string;
    tanggalAwal: string;
    tanggalAkhir: string;
    status: string;
}
interface BabProps {
    id: number;
    babId?: number;
    namaBab?: string;
    namaSubBab?: string;
    namaSubSubBab?: string;
    peluang: string;
    status: string;
}
interface DataSilabusProps {
    namaSilabus: string;
    kurikulum: string;
    tingkatKelas: string;
    jenisLayanan: string;
    kelompokUjian: string;
    jumlahPertemuan: number;
    jumlahEntri: number;
    status: string;
}
interface DataBahProps {
    kodeBah: string;
    kurikulum: string;
    tingkatKelas: string;
    jenisLayanan: string;
    kelompokUjian: string;
    jumlahPertemuan: number;
    salinanSilabus: number;
    status: string;
}
interface DataMataAjarProps {
    id: number;
    mataAjar: string;
    singkatan: string;
    status: string;
    idMataAjar: number;
}
interface DataSubMataAjarProps {
    id: number;
    idSub: number;
    mataAjar: string;
    singkatan: string;
    status: string;
    idMataAjar: number;
}
interface DataSumberSoalProps {
    namaSumber: string;
    jenis: string;
    totalDetail: number;
    status: string;
}
interface DataSumberSoalDetailProps {
    smt: number;
    kodeSoal: number;
    tahun: string;
    tingkatKelas: string;
    jenisInstitusi: string;
    provinsi?: string;
    kota?: string;
    institusi?: string;
    status: string;
}
interface DataWacanaProps {
    mataPelajaran: string;
    judulWacana: string;
    cuplikanTeks: string;
    keyword: string;
}
export interface DataAksesRolesModalProps {
    group: string;
    namaMenu: string;
    status: string;
}
export interface DataPetugasProps {
    nik: string | any;
    namaPetugas: string;
    role: string;
    status: string;
    akunDefault: string;
}
interface DataUploadVideoProps {
    idSoal: number;
    cuplikanSoal: string | any;
    judulVideo: string;
    deskripsi: string;
    linkVideo: string | any;
}
interface DataVerifikasiSoalProps {
    id: number;
    namaBab: string;
    peluang: string;
    jumlahSoal: number;
}
interface DataSubVerifikasiSoalProps {
    id: number;
    idBab: number;
    namaBab: string;
    peluang: string;
    jumlahSoal: number;
}
interface DataModalVerifikasiSoalProps {
    id: number;
    tipeSoal: string;
    sumber: string;
    kesulitan?: string;
    metode?: string;
    waktuPengerjaan?: string;
    wacana?: string;
    video?: any;
    kognitif?: string;
    totalBab?: number;
    nikPembuat?: string;
    namaPembuat?: string;
    tanggalPembuatan?: string | any;
    isVerifikasi?: string;
    nikVerifikasi?: string;
    namaVerifikasi?: string;
    tanggalVerifikasi?: string | any;
}
interface DataTargetPengerjaanSoalProps {
    mataUji: string;
    tanggalAwal: any;
    tanggalAkhir: any;
    jumlahTarget: number;
}
interface DataBundelSoalProps {
    kodeBundel: string;
    deskripsi: string;
    tingkatKelas: string;
    jumlahSoal: number;
    jumlahEntriSoal: number;
    status: string;
    urutBerdasarkan: string;
}
interface DataBundelSoalSubBabProps {
    subBab: string;
    jumlahSoal: number;
}
interface DataBundelSoalSubBabDetailProps {
    idSoal: number;
    cuplikanSoal: string;
    tipeSoal: string;
    kognitif: string;
    metodePengambilan: string;
    sumber: string;
    tingkatKelas: string;
}
interface DataDetailBundelSoalProps {
    idSoal: number;
    nomorSoal: number;
    cuplikanSoal: string;
    babTerkait: string;
}
interface DataMembuatPaketProps {
    kodePaket: string;
    jenisProduk: string;
    deskripsi: string;
    tanggalAwal: string;
    tanggalAkhir: string;
    status: string;
}
interface DataTambahBundelSoalProps {
    kodeBundel: string;
    deskripsi: string;
    jumlahSoal: number;
    jumlahEntriSoal: number;
    status: string;
    pilih: string;
}
interface DataEntriSoalProps {
    kodeBundel: string;
    deskripsi: string;
    jumlahSoal: number;
    jumlahEntriSoal: number;
    urutan: number;
}
interface DataMengisiTeoriProps {
    id: number;
    namaBab: string;
    jumlahTeori: number;
}
interface DataSubMengisiTeoriProps {
    id: number;
    idBab: number;
    namaBab: string;
    jumlahTeori: number;
}
interface DataDaftarTeoriProps {
    idTeori: number;
    uraian: string;
    level: string;
    kelengkapan: string;
    jumlahVideo: number;
}
interface DataDaftarVideoTeoriProps {
    judulVideo: string;
    deskripsi: string;
    linkVideo: string;
}
interface DataMembuatBukuProps {
    namaBuku: string;
    tingkatKelas: string;
    semester: number;
    kurikulum: string;
    jenis: string;
    kelompokUjian: string;
}
interface DataJpmpProps {
    idJuklak: number;
    kodeJuklak: string;
    namaJuklak: string;
    tanggalAwal: string;
    tanggalAkhir: string;
    hariBelajar: string;
    status: string;
    tanggalUpload: string;
    jumlahDetail: number;
}
interface DataJpmpKelasProps {
    kelas: string;
    statusKelas: string;
    namaJuklak: string;
    smt: number;
    pertemuan?: number;
    adaJuklak: string;
    pengajuanKe?: number;
    stPengajuan?: string;
    petugasPengajuan?: string;
    tanggalPengajuan?: string;
    alasan?: string;
    petugasAcc?: string;
    tanggalAcc?: string;
}
interface DataBuatJpmpKelasProps {
    tanggalAwal: string;
    tanggalAkhir: string;
    total: number;
}
interface DataValidasiPjmpProps {
    tanggalAwal: string;
    tanggalAkhir: string;
    df: number;
    pj: number;
}
export const dataRole = [
    {
        namaRole: "Administrator",
        totalMenu: 32,
        status: true,
    },
];
export const dataAksesModal = [{ group: "JPMP", namaMenu: "JPMP Kelas", status: true }];
export const dataPetugas = [
    {
        nik: 1080182081020,
        namaPetugas: "Rudi Jaya",
        role: "ADMINISTRATOR",
        status: true,
        akunDefault: true,
    },
];
export const dataMataPelajaran = [
    {
        mataPelajaran: "BAHASA INDONESIA",
        singkatan: "BI",
        adaDiUtbk: true,
        status: true,
    },
];
export const dataKurikulum = [
    {
        namaKurikulum: "KTSP",
        singkatan: "KTSP",
        tahunTerbit: "2006",
        tanggalAwal: "2006-01-01",
        tanggalAkhir: "2025-01-01",
        status: true,
    },
];
export const dataVideoTeaser = [
    {
        role: "Super Admin",
        tanggalAwal: "2006-01-01",
        tanggalAkhir: "2025-01-01",
        linkVideo: "https://www.youtube.com/",
    },
];
export const dataVideoEkstra: any[] = [
    {
        namaVideo: "Video Materi Matematika",
        role: "Siswa",
        jenisVideo: "Video TOBK",
        idProduk: "12",
        komponen: "Video 10 IPA",
        tanggalAwal: "2006-01-01",
        tanggalAkhir: "2025-01-01",
        linkVideo: "https://www.youtube.com/",
    },
];
export const babDatas: BabProps[] = [
    {
        id: 1,
        namaBab: "05.01. READING_GENRE OF THE TEXT",
        peluang: "Normal",
        status: "Aktif",
    },
    {
        id: 2,
        namaBab: "05.02. SPEAKING",
        peluang: "Normal",
        status: "Tidak Aktif",
    },
    {
        id: 3,
        namaBab: "05.03. READING_FUNCTIONAL TEXT",
        peluang: "Normal",
        status: "Tidak Aktif",
    },
];
export const subBabDatas: BabProps[] = [
    {
        id: 11,
        babId: 1,
        namaSubBab: "05.01.01 READING_GENRE OF THE TEXT",
        peluang: "Normal",
        status: "Aktif",
    },
    // {
    //     id: 21,
    //     babId: 2,
    //     namaSubBab: "05.02.01 NOTICE/WARNING/CAUTION",
    //     peluang: "Normal",
    //     status: "Tidak Aktif",
    // },
    {
        id: 31,
        babId: 3,
        namaSubBab: "05.03.01 Greeting",
        peluang: "Normal",
        status: "Aktif",
    },
];
export const subSubBabDatas: BabProps[] = [
    {
        id: 111,
        babId: 11,
        namaSubSubBab: "05.01.01.01 READING_GENRE OF THE TEXT",
        peluang: "Normal",
        status: "Aktif",
    },
    // {
    //     id: 211,
    //     babId: 21,
    //     namaSubSubBab: "05.02.01.01 NOTICE/WARNING/CAUTION",
    //     peluang: "Normal",
    //     status: "Tidak Aktif",
    // },
    // {
    //     id: 311,
    //     babId: 31,
    //     namaSubSubBab: "05.03.01.01 Greeting",
    //     peluang: "Normal",
    //     status: "Aktif",
    // },
];
export const dataSilabus: DataSilabusProps[] = [
    {
        namaSilabus: "2022/2023.15",
        kurikulum: "Kurikulum 2013 Revisi",
        tingkatKelas: "10 SMA MIA ",
        jenisLayanan: "SILVER 15",
        kelompokUjian: "MATEMATIKA WAJIB",
        jumlahPertemuan: 15,
        jumlahEntri: 15,
        status: "Create",
    },
    {
        namaSilabus: "2023/2024.16",
        kurikulum: "Kurikulum 2013 Revisi",
        tingkatKelas: "10 SMA MIA ",
        jenisLayanan: "SILVER 16",
        kelompokUjian: "MATEMATIKA WAJIB",
        jumlahPertemuan: 16,
        jumlahEntri: 16,
        status: "Sent",
    },
];
export const dataTambahSilabus = [
    {
        namaBab: "Bab 1",
    },
];

export const dataBah: DataBahProps[] = [
    {
        kodeBah: "2022/2023.15",
        kurikulum: "Kurikulum 2013 Revisi",
        tingkatKelas: "10 SMA MIA ",
        jenisLayanan: "SILVER 15",
        kelompokUjian: "MATEMATIKA WAJIB",
        jumlahPertemuan: 15,
        salinanSilabus: 15,
        status: "Create",
    },
    {
        kodeBah: "2023/2024.16",
        kurikulum: "Kurikulum 2013 Revisi",
        tingkatKelas: "10 SMA MIA ",
        jenisLayanan: "SILVER 16",
        kelompokUjian: "MATEMATIKA WAJIB",
        jumlahPertemuan: 16,
        salinanSilabus: 16,
        status: "Sent",
    },
];
export const dataMataAjar = [
    {
        kode_bab: 1,
        mataAjar: "AKM LITERASI (NA)",
        singkatan: "AKMLIT",
        status: true,
        idMataAjar: 41,
    },
    {
        kode_bab: 2,
        mataAjar: "AKM LITERASI MEMBACA",
        singkatan: "AKM LIT",
        status: true,
        idMataAjar: 95,
    },
    {
        kode_bab: 3,
        mataAjar: "AKM LITERASI SAINS",
        singkatan: "AKMSAINS",
        status: false,
        idMataAjar: 97,
    },
    {
        kode_bab: 4,
        mataAjar: "BAHASA INDONESIA",
        singkatan: "IND",
        status: false,
        idMataAjar: 40,
    },
];

export const dataSubMataAjar = [
    {
        kode_bab: 41,
        idSub: 4,
        mataAjar: "BAHASA INDONESIA -UTBK",
        singkatan: "INDO - UTB",
        status: true,
        idMataAjar: 129,
    },
    {
        kode_bab: 42,
        idSub: 4,
        mataAjar: "Kemampuan Memahami Bacaan dan Menulis",
        singkatan: "PMM",
        status: true,
        idMataAjar: 119,
    },
];
export const dataPertemuanBab: any = [
    {
        id: 1,
        pertemuan: "Pertemuan 1",
    },
    {
        id: 2,
        pertemuan: "Pertemuan 2",
    },
];
export const dataSubPertemuanBab: any = [
    {
        id: 11,
        babId: 1,
        namaBab: "01.01.01 Fungsi Komposisi",
    },
    {
        id: 12,
        babId: 1,
        namaBab: "01.01.02 Relasi",
    },
];
export const dataSumberSoal = [
    {
        namaSumber: "11 SMA UMUM",
        jenis: "Textbook",
        totalDetail: 1,
        status: true,
    },
    {
        namaSumber: "6 SD",
        jenis: "Textbook",
        totalDetail: 0,
        status: true,
    },
    {
        namaSumber: "6 SD DASAR",
        jenis: "Textbook",
        totalDetail: 0,
        status: true,
    },
    {
        namaSumber: "AKM/ANBK",
        jenis: "AKM",
        totalDetail: 40,
        status: false,
    },
];
export const dataSumberSoalDetail = [
    {
        smt: 3,
        kodeSoal: 0,
        tahun: "2022",
        tingkatKelas: "12 SMA IPA",
        jenisInstitusi: "PTN",
        provinsi: "PROVINSI JAWA BARAT",
        kota: "KOTA BANDUNG",
        institusi: "INSTITUT TEKNOLOGI BANDUNG",
        status: false,
    },
    {
        smt: 3,
        kodeSoal: 0,
        tahun: "2022",
        tingkatKelas: "12 SMA IPS",
        jenisInstitusi: "PTN",
        status: true,
    },
];
export const dataWacana: DataWacanaProps[] = [
    {
        mataPelajaran: "Biologi",
        judulWacana: "Diagram Kacang Ercis",
        cuplikanTeks: "Berikut diagram persilangan kacang ercis biji bulat-hijau (kedua sifat heterozigot) berikut ini.",
        keyword: "kacang ercis",
    },
];
export const dataUploadVideo: DataUploadVideoProps[] = [
    {
        idSoal: 381050,
        cuplikanSoal: "Perhatikan Gambar!",
        judulVideo: "381050 MATEMATIKA 06",
        deskripsi: "Pembahasan Soal MATEMATIKA No.06",
        linkVideo: "871309130978197.mp4",
    },
    {
        idSoal: 381052,
        cuplikanSoal: "Perhatikan Video!",
        judulVideo: "381050 BAHASA INDONESIA 06",
        deskripsi: "Pembahasan Soal BAHASA INDONESIA No.06",
        linkVideo: "87130913097892109.mp4",
    },
];
export const dataPetikanSoal = [
    {
        idSoal: 19280,
        petikanSoal: "Berikut diagram persilangan kacang ercis biji bulat-hijau (kedua sifat heterozigot) berikut ini.",
    },
];
export const dataVerifikasiSoal: DataVerifikasiSoalProps[] = [
    {
        id: 1,
        namaBab: "06.02 Ejaan",
        peluang: "Normal",
        jumlahSoal: 4,
    },
];
export const dataSubVerifikasiSoal: DataSubVerifikasiSoalProps[] = [
    {
        id: 11,
        idBab: 1,
        namaBab: "06.02 Ejaan",
        peluang: "Normal",
        jumlahSoal: 4,
    },
];
export const dataModalVerifikasiSoal = [
    {
        id: 10212,
        tipeSoal: "PGB",
        sumber: "SBMPTN",
        kesulitan: "",
        metode: "Modifikasi",
        waktuPengerjaan: "",
        wacana: "",
        video: "",
        kognitif: "Aplikasi",
        totalBab: 1,
        nikPembuat: "",
        namaPembuat: "",
        tanggalPembuatan: "2023-01-01",
        isVerifikasi: true,
        nikVerifikasi: "",
        namaVerifikasi: "",
        tanggalVerifikasi: "2023-01-01",
    },
];
export const dataTargetPengerjaanSoal: DataTargetPengerjaanSoalProps[] = [
    {
        mataUji: "MATEMATIKA",
        tanggalAwal: "2023-01-01",
        tanggalAkhir: "2023-01-05",
        jumlahTarget: 1,
    },
];
export const dataBundelSoal: DataBundelSoalProps[] = [
    {
        kodeBundel: "2022/2023.1.31.00001",
        deskripsi: "Uji Coba",
        tingkatKelas: "0 UMUM UMUM",
        jumlahSoal: 20,
        jumlahEntriSoal: 0,
        status: "Created",
        urutBerdasarkan: "BAB",
    },
];
export const dataBundelSoalSubBab: DataBundelSoalSubBabProps[] = [
    {
        subBab: "01.06.01. Sistem pertidaksamaan liniear dua variabel",
        jumlahSoal: 267,
    },
];
export const dataBundelSoalSubBabDetail: DataBundelSoalSubBabDetailProps[] = [
    {
        idSoal: 18450,
        cuplikanSoal: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dignissimos ea aliquam dolorem nesciunt. Perspiciatis odit accusamus a vel nesciunt!",
        tipeSoal: " PGB",
        kognitif: "Pengetahuan dan Pemahaman",
        metodePengambilan: "Modifikasi",
        sumber: "UN/USBN",
        tingkatKelas: "12 SMK TEKNOLOGI",
    },
];
export const dataDetailBundelSoal: DataDetailBundelSoalProps[] = [
    {
        idSoal: 10902,
        nomorSoal: 5,
        cuplikanSoal: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dignissimos ea aliquam dolorem nesciunt. Perspiciatis odit accusamus a vel nesciunt!",
        babTerkait: "BAB 2",
    },
];
export const dataMembuatPaket = [
    {
        kodePaket: "EMMA-005839",
        jenisProduk: "e-Empati Mandiri",
        deskripsi: "UJI COBA MANDIRI",
        tanggalAwal: "2023-11-09",
        tanggalAkhir: "2023-11-12",
        status: true,
    },
];
export const dataTambahBundelSoal = [
    {
        kodeBundel: "Mandiri",
        deskripsi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dignissimos ea aliquam dolorem nesciunt. Perspiciatis odit accusamus a vel nesciunt!",
        jumlahSoal: 20,
        jumlahEntriSoal: 5,
        status: true,
    },
];
export const dataEntriSoal: DataEntriSoalProps[] = [
    {
        kodeBundel: "Mandiri",
        deskripsi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dignissimos ea aliquam dolorem nesciunt. Perspiciatis odit accusamus a vel nesciunt!",
        jumlahSoal: 20,
        jumlahEntriSoal: 5,
        urutan: 10,
    },
];
export const dataMengisiTeori: DataMengisiTeoriProps[] = [
    {
        id: 1,
        namaBab: "01.01.01. Teks Anedot",
        jumlahTeori: 2,
    },
    {
        id: 2,
        namaBab: "01.01.02. Makna Kalimat",
        jumlahTeori: 1,
    },
];
export const dataSubMengisiTeori: DataSubMengisiTeoriProps[] = [
    {
        id: 11,
        idBab: 1,
        namaBab: "01.01.01. Teks Anedot",
        jumlahTeori: 2,
    },
    {
        id: 12,
        idBab: 2,
        namaBab: "01.01.02. Makna Kalimat",
        jumlahTeori: 1,
    },
];
export const dataDaftarTeori: DataDaftarTeoriProps[] = [
    {
        idTeori: 381050,
        uraian: "Teks Anedot",
        level: "SMA",
        kelengkapan: "LENGKAP",
        jumlahVideo: 1,
    },
];
export const dataDaftarVideoTeori: DataDaftarVideoTeoriProps[] = [
    {
        judulVideo: "Exposition",
        deskripsi:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, animi recusandae sapiente esse aperiam, commodi, itaque id sunt repellat sit cum. Quam minus dignissimos blanditiis odit obcaecati porro dolores sunt veniam, aut nihil illum atque laborum voluptatibus impedit, iusto praesentium architecto. Sit accusantium tenetur blanditiis magni cumque asperiores fugit non.",
        linkVideo: "Lorem ipsum dolor sit amet.mp4",
    },
];
export const dataMembuatBuku: DataMembuatBukuProps[] = [
    {
        namaBuku: "Buku Uji Coba",
        tingkatKelas: "0 UMUM UMUM",
        semester: 1,
        kurikulum: "CBSA",
        jenis: "Lengkap",
        kelompokUjian: "MATEMATIKA",
    },
];

export const dataJpmp = [
    {
        idJuklak: 37140,
        kodeJuklak: "S12345-GOL-6KREV-926",
        namaJuklak: "6 SD GOLD K13 R (PENDAFTAR BARU)",
        tanggalAwal: "2023-11-11",
        tanggalAkhir: "2023-11-17",
        hariBelajar: "SENIN(3)-KAMIS(3)",
        status: false,
        tanggalUpload: "2023-11-11",
        jumlahDetail: 5,
    },
];
export const dataJpmpKelas = [
    {
        kelas: "12-IPA-R-N-151",
        statusKelas: "Running",
        namaJuklak: "12 IPA REGULER 4 PERTEMUAN K13 REVISI",
        smt: 1,
        pertemuan: 76,
        adaJuklak: true,
        validatorKacab: true,
        validatorBmp: true,
        pengajuanKe: 2,
        stPengajuan: "",
        petugasPengajuan: "",
        tanggalPengajuan: "2023-11-11",
        alasan: "",
        petugasAcc: "",
        tanggalAcc: "",
    },
];
export const dataBuatJpmpKelas = [
    {
        tanggalAwal: "2023-11-11",
        tanggalAkhir: "2023-11-20",
        matematika: 0,
        fisika: 0,
        kimia: 0,
        biologi: 0,
        litbing: 0,
        kpupm1: 0,
        kkpm2: 0,
        bind: 0,
        total: 5,
    },
];
export const dataPjmpGrouping: DataValidasiPjmpProps[] = [
    {
        tanggalAwal: "2023-11-11",
        tanggalAkhir: "2023-11-17",
        df: 2,
        pj: 3,
    },
    {
        tanggalAwal: "2023-11-12",
        tanggalAkhir: "2023-11-18",
        df: 1,
        pj: 4,
    },
];

export const dataBukuTeoriTeaser = [
    {
        namaBuku: "Buku 1",
        tingkatKelas: "11 November 2023",
        semester: "23 November 2023",
        kurikulum: "Siswa",
    },
];

export const dataMenautkanBahKelas = [
    {
        namaBuku: "Buku 1",
        tingkatKelas: "11 November 2023",
        semester: "23 November 2023",
        kurikulum: "Siswa",
    },
];

export const dataMonitoringBahKelas = [
    {
        namaBuku: "Buku 1",
        tingkatKelas: "11 November 2023",
        semester: "23 November 2023",
        kurikulum: "Siswa",
    },
];
export const dataMembuatTOB = [
    {
        namaTob: "12IPA-K13R-S1-B.Indonesia-TA.23/24",
        jenisTob: "UTBK",
        jarak: 5,
        tanggalAwal: "2023-11-11",
        tanggalAkhir: "2023-11-17",
        format: false,
        status: true,
    },
];
export const dataTambahPaketSoal = [
    {
        kodePaket: "EMMA-005610",
        deskripsi: "EMMA-12IPA-K13R-S1-KIMIA",
        tanggalAwal: "2023-11-11",
        tanggalAkhir: "2023-11-17",
        blockingTime: false,
        random: false,
        urutan: 1,
    },
];
export const dataTambahKomponenProduk = [
    {
        id: 33025,
        komponen: "23_e-Buku Sakti Paket Soal Koding 12 SMA IPA K13R SMAN 3 Bandung S1",
    },
];
export const dataTambahSyaratEmpati = [
    {
        namaTO: "TO 1",
        syaratEmpati: "Syarat 1",
    },
];
export const dataPaketSoalTeaser = [
    {
        role: "No User",
        tanggalAwal: "2023-11-11",
        tanggalAkhir: "2023-11-17",
        namaTob: "BUNDLING UAT 12 SMA IPA_FI",
        jumlahProduk: 1,
    },
];
export const dataKelolaProdukKelompok = [
    {
        namaKelompok: "10 IPA-BIO-S_1_2324-K13R",
        kelompok: "PENGAJAR",
        jumlahAnggota: 554,
        jumlahProduk: 12,
    },
];
export const dataDaftarProduk = [
    {
        namaProduk: "34781 - P_e-Empati Mandiri-10 IPA-FI-S_1-23/24-K13R",
        jenisProduk: "e-Empati Mandiri",
        tanggalAwal: "2023-06-30",
        tanggalAkhir: "2023-12-16",
    },
];
