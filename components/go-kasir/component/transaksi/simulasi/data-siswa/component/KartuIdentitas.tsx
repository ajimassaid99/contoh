import InputDate from "@/components/Ui/InputDate";
import Selects from "@/components/Ui/Selects";
import { optionsAgama } from "@/components/go-kasir/data";
import { Input, TextInput } from "@mantine/core";
import { SiMaildotru } from "react-icons/si";

export default function KartuIdentitasSiswa() {
    return (
        <>
            <div className="flex">
                <div>
                    <TextInput label="Nama Member" withAsterisk required />
                    <TextInput className="my-2" label="Nama Panggilan" />
                    <InputDate label="Tanggal Lahir" required />
                    <TextInput className="my-2" label="Umur (Min 6 Tahun)" />
                </div>
                <div>
                    <TextInput label="No HP/WA Member" withAsterisk required />
                    <Selects label="Agama" data={optionsAgama} />
                    <InputDate label="Tanggal Lahir" required />
                    <TextInput className="my-2" label="Umur (Min 6 Tahun)" />
                    <Input type="email" icon={<SiMaildotru />} placeholder="email" />
                </div>
            </div>
        </>
    );
}
