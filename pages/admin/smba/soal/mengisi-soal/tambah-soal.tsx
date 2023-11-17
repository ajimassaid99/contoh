import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Tabs } from "@mantine/core";
import PGB from "@/components/smba/components/mengisi-soal/PGB";
import InformasiUmum from "@/components/smba/components/mengisi-soal/InformasiUmum";
import PBK from "@/components/smba/components/mengisi-soal/PBK";
import PBT from "@/components/smba/components/mengisi-soal/PBT";
import PBB from "@/components/smba/components/mengisi-soal/PBB";
import PBM from "@/components/smba/components/mengisi-soal/PBM";
import PBCT from "@/components/smba/components/mengisi-soal/PBCT";
import Essay from "@/components/smba/components/mengisi-soal/Essay";
import EssayMajemuk from "@/components/smba/components/mengisi-soal/EssayMajemuk";

const TambahSoal = () => {
    const router = useRouter();

    const [data, setData] = useState({
        tipeSoal: "",
        levelKognitif: "",
        tingkatKesulitan: "",
        metodePengambilan: "",
        saranPenggunaan: "",
        waktuPengerjaan: "",
    });

    return (
        <>
            <div className="flex flex-col gap-5">
                <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FiArrowLeft onClick={() => router.back()} size={25} />
                        <h1 className="text-lg font-bold text-black">Tambah Soal</h1>
                    </div>
                </div>

                <Tabs color="indigo" radius="xl" defaultValue="informasi-umum">
                    <Tabs.List className="mb-5 ">
                        <Tabs.Tab value="informasi-umum">Informasi Umum</Tabs.Tab>
                        <Tabs.Tab value="pgb" disabled={data?.tipeSoal !== "pgb"}>
                            PGB
                        </Tabs.Tab>
                        <Tabs.Tab value="pbk" disabled={data?.tipeSoal !== "pbk"}>
                            PBK
                        </Tabs.Tab>
                        <Tabs.Tab value="pbt" disabled={data?.tipeSoal !== "pbt"}>
                            PBT
                        </Tabs.Tab>
                        <Tabs.Tab value="pbb" disabled={data?.tipeSoal !== "pbb"}>
                            PBB
                        </Tabs.Tab>
                        <Tabs.Tab value="pbm" disabled={data?.tipeSoal !== "pbm"}>
                            PBM
                        </Tabs.Tab>
                        <Tabs.Tab value="pbct" disabled={data?.tipeSoal !== "pbct"}>
                            PBCT
                        </Tabs.Tab>
                        <Tabs.Tab value="essay" disabled={data?.tipeSoal !== "essay"}>
                            Essay
                        </Tabs.Tab>
                        <Tabs.Tab value="essay-majemuk" disabled={data?.tipeSoal !== "essay-majemuk"}>
                            Essay Majemuk
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="informasi-umum">
                        <InformasiUmum data={data} setData={setData} />
                    </Tabs.Panel>

                    <Tabs.Panel value="pgb">
                        <div className="w-3/4">
                            <PGB />
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="pbk">
                        <PBK />
                    </Tabs.Panel>

                    <Tabs.Panel value="pbt">
                        <PBT />
                    </Tabs.Panel>

                    <Tabs.Panel value="pbb">
                        <PBB />
                    </Tabs.Panel>

                    <Tabs.Panel value="pbm">
                        <PBM />
                    </Tabs.Panel>

                    <Tabs.Panel value="pbct">
                        <PBCT />
                    </Tabs.Panel>

                    <Tabs.Panel value="essay">
                        <Essay />
                    </Tabs.Panel>

                    <Tabs.Panel value="essay-majemuk">
                        <EssayMajemuk />
                    </Tabs.Panel>
                </Tabs>
            </div>
        </>
    );
};

export default TambahSoal;
