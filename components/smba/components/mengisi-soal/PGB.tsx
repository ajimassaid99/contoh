import { Input, Modal } from "@mantine/core";
import { Button } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";

const Editor = dynamic(() => import("@/components/Editor/Editor"), { ssr: false });

const PGB = () => {
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState<any>();

    const { control, watch, getValues, setValue } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "opsi",
    });

    return (
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th className="w-24">Opsi</th>
                            <th>Text</th>
                            <th className="w-28">Bobot</th>
                            <th className="w-24">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {fields.map((item: any, index: any) => (
                            <tr key={item?.id}>
                                <td>
                                    <Controller
                                        control={control}
                                        name={`opsi.${index}.pilihan`}
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
                                        name={`opsi.${index}.text`}
                                        render={({ field: { onChange, value } }) => (
                                            <>
                                                <Editor
                                                    isParent={true}
                                                    id={`text pgb` + ` ${index}`}
                                                    onEditorChange={(e) => {
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
                                        name={`opsi.${index}.bobot`}
                                        render={({ field: { onChange, value } }) => (
                                            <>
                                                <Input
                                                    rightSection={"%"}
                                                    type="number"
                                                    placeholder="Bobot"
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
                                        <BiTrashAlt onClick={() => remove(index)} size={20} className="cursor-pointer" />
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

                <div className="my-3 flex  items-center justify-end">
                    <Button
                        color="indigo"
                        className="capitalize"
                        size="md"
                        onClick={() =>
                            append({
                                pilihan: "",
                                text: "",
                                bobot: 0,
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

            {/* MODAL DETAIL TABLE */}
            <Modal size={"50%"} opened={openModalDetail} onClose={() => setOpenModalDetail(!openModalDetail)} title="Detail" centered>
                <div className="flex flex-col gap-4 p-5">
                    <Input.Wrapper label="Opsi">
                        <Input type="text" disabled value={selectedRowData?.pilihan} />
                    </Input.Wrapper>

                    <Input.Wrapper label="Text">
                        <Editor isParent={false} id={`detail`} value={selectedRowData?.text} />
                    </Input.Wrapper>

                    <Input.Wrapper label="Bobot">
                        <Input type="number" disabled value={selectedRowData?.bobot} />
                    </Input.Wrapper>
                </div>
            </Modal>
        </>
    );
};

export default PGB;
