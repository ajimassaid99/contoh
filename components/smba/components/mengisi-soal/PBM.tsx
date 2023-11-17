import { Input, Modal, Radio } from "@mantine/core";
import { Button, Card, CardBody } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";

const Editor = dynamic(() => import("@/components/Editor/Editor"), { ssr: false });

const PBM = () => {
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState<any>();

    const { control, watch, getValues, setValue, register } = useForm();
    const {
        fields: fieldKolom,
        append: appendKolom,
        remove: removeKolom,
    } = useFieldArray({
        control,
        name: "pertanyaan",
    });

    const {
        fields: fieldPertanyaan,
        append: appendPertanyaan,
        remove: removePertanyaan,
    } = useFieldArray({
        control,
        name: "pernyataan",
    });

    return (
        <>
            <>
                <div className="w-full">
                    <div className="flex flex-col gap-4 md:flex-row ">
                        <div className="flex flex-1 flex-col gap-4">
                            <div>
                                <div className="bg-black py-3 px-5">
                                    <h1 className="text-white">Kolom</h1>
                                </div>

                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="w-24">Opsi</th>
                                                <th>Pernyataan</th>
                                                <th className="w-24">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {fieldKolom.map((item: any, index: any) => {
                                                return (
                                                    <tr key={item?.id}>
                                                        <td>
                                                            <Controller
                                                                control={control}
                                                                name={`kolom.${index}.kolom`}
                                                                render={({ field: { onChange, value } }) => (
                                                                    <>
                                                                        <Input
                                                                            type="text"
                                                                            value={value}
                                                                            onChange={(e) => {
                                                                                onChange(e.target.value);
                                                                            }}
                                                                        />
                                                                    </>
                                                                )}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Controller
                                                                control={control}
                                                                name={`kolom.${index}.namaKolom`}
                                                                render={({ field: { onChange, value } }) => (
                                                                    <>
                                                                        <Input
                                                                            type="text"
                                                                            value={value}
                                                                            onChange={(e) => {
                                                                                onChange(e.target.value);
                                                                            }}
                                                                        />
                                                                    </>
                                                                )}
                                                            />
                                                        </td>
                                                        <td>
                                                            <div className="flex items-center gap-2">
                                                                <BiTrashAlt onClick={() => removeKolom(index)} size={20} className="cursor-pointer" />
                                                                <AiOutlineEye
                                                                    size={20}
                                                                    className="cursor-pointer"
                                                                    onClick={() => {
                                                                        setSelectedRowData(getValues(`kolom.${index}`));
                                                                        setOpenModalDetail(!openModalDetail);
                                                                    }}
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="my-3 flex  items-center justify-end">
                                    <Button
                                        color="indigo"
                                        className="capitalize"
                                        size="md"
                                        onClick={() =>
                                            appendKolom({
                                                // kolom: "",
                                                // namaKolom: "",
                                            })
                                        }
                                    >
                                        Tambah Opsi
                                    </Button>
                                </div>

                                <p className="border-2 border-dashed border-info p-2 text-info">
                                    <b className="font-bold">Keterangan: </b>Klik tambah opsi untuk menambahkan pilihan.
                                </p>
                            </div>

                            <div>
                                <div className="bg-black py-3 px-5">
                                    <h1 className="text-white">Pertanyaan</h1>
                                </div>

                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="w-24">Pertanyaan</th>
                                                <th className="w-24">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {fieldPertanyaan.map((item: any, index: any) => (
                                                <tr key={item?.id}>
                                                    <td className="min-w-[500px]">
                                                        <Controller
                                                            control={control}
                                                            name={`pertanyaan.${index}.pertanyaan`}
                                                            render={({ field: { onChange, value } }) => (
                                                                <>
                                                                    <Editor
                                                                        isParent={true}
                                                                        id={`text pbm` + ` ${index}`}
                                                                        onEditorChange={(e: any) => {
                                                                            onChange(e);
                                                                        }}
                                                                        value={value}
                                                                        height={150}
                                                                    />
                                                                </>
                                                            )}
                                                        />
                                                    </td>

                                                    <td>
                                                        <div className="flex items-center gap-2">
                                                            <BiTrashAlt onClick={() => removePertanyaan(index)} size={20} className="cursor-pointer" />
                                                            <AiOutlineEye
                                                                size={20}
                                                                className="cursor-pointer"
                                                                onClick={() => {
                                                                    setSelectedRowData(getValues(`opsi.${index}`));
                                                                    setOpenModalDetail(!openModalDetail);
                                                                }}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="my-3 flex  items-center justify-end">
                                    <Button color="indigo" className="capitalize" size="md" onClick={() => appendPertanyaan({})}>
                                        Tambah Opsi
                                    </Button>
                                </div>

                                <p className="border-2 border-dashed border-info p-2 text-info">
                                    <b className="font-bold">Keterangan: </b>Klik tambah opsi untuk menambahkan pilihan.
                                </p>
                            </div>
                        </div>

                        <Card className="h-fit md:min-w-[400px]">
                            <CardBody>
                                <h1 className="mb-5 text-lg font-semibold text-black">Credits</h1>

                                <div className="flex flex-col gap-3">
                                    <Input.Wrapper label="Full Credit">
                                        <Input type="number" value={selectedRowData?.pilihan} defaultValue={0} />
                                    </Input.Wrapper>

                                    <Input.Wrapper label="Half Credit">
                                        <Input type="number" value={selectedRowData?.pilihan} defaultValue={0} />
                                        <span className="italic">* input -1 jika tidak ada half credit</span>
                                    </Input.Wrapper>

                                    <Input.Wrapper label="Zero Credit">
                                        <Input type="number" value={selectedRowData?.pilihan} defaultValue={0} />
                                    </Input.Wrapper>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>

                {/* MODAL DETAIL TABLE */}
                <Modal size={"50%"} opened={openModalDetail} onClose={() => setOpenModalDetail(!openModalDetail)} title="Detail" centered>
                    <div className="flex flex-col gap-4 p-5">
                        <Input.Wrapper label="Kolom">
                            <Input type="text" disabled value={selectedRowData?.kolom} />
                        </Input.Wrapper>

                        <Input.Wrapper label="Nama Kolom">
                            <Input type="text" disabled value={selectedRowData?.namaKolom} />
                        </Input.Wrapper>
                    </div>
                </Modal>
            </>
        </>
    );
};

export default PBM;
