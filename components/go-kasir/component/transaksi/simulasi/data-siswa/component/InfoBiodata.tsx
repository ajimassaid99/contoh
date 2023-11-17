import InputDate from "@/components/Ui/InputDate";
import Selects from "@/components/Ui/Selects";
import Switch from "@/components/Ui/Switch";
import { optionsAgama, optionsKecamatan, optionsKota, optionsProvinsi } from "@/components/go-kasir/data";
import { optionsJenisKelamin } from "@/data/smba/data";
import { TextInput, Textarea } from "@mantine/core";
import { Button } from "@material-tailwind/react";
import { SiMaildotru } from "react-icons/si";

export default function InfoBiodataSiswa() {
    return (
        <>
            <div className="flex gap-x-20">
                <div className="w-1/2">
                    <TextInput placeholder="Nama Member" label="Nama Member" withAsterisk required />
                    <TextInput placeholder="Nama Panggilan" className="my-2" label="Nama Panggilan" />
                    <InputDate label="Tanggal Lahir" required />
                    <TextInput placeholder="18 Tahun" className="my-2" label="Umur (Min 6 Tahun)" disabled />
                    <Textarea placeholder="Alamat" label="Alamat" withAsterisk />
                    <Selects label="Provinsi Alamat" className="my-2" data={optionsProvinsi} withAsterisk />
                    <Selects label="Kota Alamat" data={optionsKota} withAsterisk />
                    <Selects label="Kecamatan Alamat" className="my-2" data={optionsKecamatan} withAsterisk />
                    <Selects label="Kelurahan Alamat" data={optionsKecamatan} withAsterisk />
                    <TextInput placeholder="40183" className="mt-2" label="Kode Pos" withAsterisk disabled />
                </div>
                <div className="w-1/2">
                    <TextInput placeholder="No HP/WA Member" label="No HP/WA Member" withAsterisk required />
                    <Selects className="my-2" label="Agama" data={optionsAgama} />
                    <TextInput label="Email" type="email" icon={<SiMaildotru />} placeholder="Email" withAsterisk />
                    {/* <Switch label="Jenis Kelamin" options={optionsJenisKelamin} /> */}
                    <TextInput label="Nama Ortu" placeholder="Nama Ortu" withAsterisk />
                    <TextInput className="my-2" placeholder="No HP/WA Ortu/Wali" label="No HP/WA Ortu/Wali" withAsterisk required />
                    <TextInput label="Email Ortu" type="email" icon={<SiMaildotru />} placeholder="Email Ortu" withAsterisk />
                    <TextInput className="my-2" placeholder="Pekerjaan Ortu" label="Pekerjaan Ortu" withAsterisk required />
                    <TextInput placeholder="Hubungan" label="Hubungan" withAsterisk required />
                    <div className="mt-4 grid grid-cols-2 gap-x-4">
                        <Button className="bg-success">Simpan</Button>
                        <Button className="bg-danger">Tutup</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
