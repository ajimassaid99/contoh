import TagsInput from "@/components/Forms/TagsInput/TagsInput";
import { Input, Modal } from "@mantine/core";
import { Button, Card, CardBody } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";

const Editor = dynamic(() => import("@/components/Editor/Editor"), { ssr: false });

const EssayMajemuk = () => {
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState<any>();

    const { control, watch, getValues, setValue, register } = useForm();
    const {
        fields: fieldSoal,
        append: appendSoal,
        remove: removeSoal,
    } = useFieldArray({
        control,
        name: "soal",
    });
    const {
        fields: fieldKeywords,
        append: appendKeywords,
        remove: removeKeywords,
    } = useFieldArray({
        control,
        name: "keywords",
    });

    return (
        <>
            <div className="flex flex-col gap-4 md:flex-row ">
                <div className=" flex flex-1 flex-col gap-4">
                    <div>
                        <div className="bg-black py-3 px-5">
                            <h1 className="text-white">Soal Soal</h1>
                        </div>

                        <div className="no-scrollbar overflow-scroll md:max-h-[500px]">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="w-20">No</th>
                                        <th>Soal</th>
                                        <th>Full Credit</th>
                                        <th>Half Credit</th>
                                        <th>Zero Credit</th>
                                        <th className="w-20">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {fieldSoal.map((item: any, index: any) => {
                                        return (
                                            <tr key={item?.id}>
                                                <td>
                                                    <Controller
                                                        control={control}
                                                        name={`soal.${index}.no`}
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
                                                <td className="min-w-[700px]">
                                                    <Controller
                                                        control={control}
                                                        name={`soal.${index}.soal`}
                                                        render={({ field: { onChange, value } }) => (
                                                            <>
                                                                <Editor
                                                                    isParent={true}
                                                                    id={`text pbct` + ` ${index}`}
                                                                    onEditorChange={(e: any) => {
                                                                        onChange(e);
                                                                    }}
                                                                    value={value}
                                                                    height={200}
                                                                />
                                                            </>
                                                        )}
                                                    />
                                                </td>
                                                <td>
                                                    <Controller
                                                        control={control}
                                                        name={`soal.${index}.fullCredit`}
                                                        render={({ field: { onChange, value } }) => (
                                                            <>
                                                                <Input
                                                                    type="number"
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
                                                        name={`soal.${index}.halfCredit`}
                                                        render={({ field: { onChange, value } }) => (
                                                            <>
                                                                <Input
                                                                    type="number"
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
                                                        name={`soal.${index}.zeroCredit`}
                                                        render={({ field: { onChange, value } }) => (
                                                            <>
                                                                <Input
                                                                    type="number"
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
                                                        <BiTrashAlt onClick={() => removeSoal(index)} size={20} className="cursor-pointer" />
                                                        <AiOutlineEye
                                                            size={20}
                                                            className="cursor-pointer"
                                                            onClick={() => {
                                                                setSelectedRowData(getValues(`soal.${index}`));
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
                            <Button color="indigo" className="capitalize" size="md" onClick={() => appendSoal({})}>
                                Tambah Opsi
                            </Button>
                        </div>

                        <p className="border-2 border-dashed border-info p-2 text-info">
                            <b className="font-bold">Keterangan: </b>Klik tambah opsi untuk menambahkan pilihan.
                        </p>
                    </div>

                    <div>
                        <div className="bg-black py-3 px-5">
                            <h1 className="text-white">List Kata Kunci</h1>
                        </div>

                        <div className="no-scrollbar overflow-scroll md:max-h-[500px]">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="w-20">No</th>
                                        <th>List Keywords</th>
                                        <th className="w-20">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {fieldKeywords.map((item: any, index: any) => {
                                        return (
                                            <tr key={item?.id}>
                                                <td>
                                                    <Controller
                                                        control={control}
                                                        name={`keywords.${index}.no`}
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
                                                <td className="min-w-[700px]">
                                                    <Controller
                                                        control={control}
                                                        name={`keywords.${index}.keywords`}
                                                        render={({ field: { onChange, value } }) => (
                                                            <>
                                                                <TagsInput />
                                                            </>
                                                        )}
                                                    />
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-2">
                                                        <BiTrashAlt onClick={() => removeKeywords(index)} size={20} className="cursor-pointer" />
                                                        <AiOutlineEye
                                                            size={20}
                                                            className="cursor-pointer"
                                                            onClick={() => {
                                                                setSelectedRowData(getValues(`keywords.${index}`));
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
                            <Button color="indigo" className="capitalize" size="md" onClick={() => appendKeywords({})}>
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
    );
};

export default EssayMajemuk;
