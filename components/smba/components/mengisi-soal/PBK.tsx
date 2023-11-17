import { Input, Modal, Checkbox } from "@mantine/core";
import { Button, Card, CardBody } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";

const Editor = dynamic(() => import("@/components/Editor/Editor"), { ssr: false });

const PBK = () => {
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState<any>();

    const { control, register, watch, getValues, setValue } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "opsi",
    });

    // console.log(watch());

    return (
        <>
            <div className="flex flex-col gap-4 md:flex-row ">
                <div className="flex-1">
                    <table>
                        <thead>
                            <tr>
                                <th className="w-24">Opsi</th>
                                <th>Text</th>
                                <th className="w-28">Benar</th>
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
                                                        id={`text pbk` + ` ${index}`}
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
                                        <div className="flex items-center justify-center">
                                            <Controller
                                                control={control}
                                                name={`opsi.${index}.benar`}
                                                render={({ field: { onChange, value } }) => (
                                                    <>
                                                        <Checkbox
                                                            value={value}
                                                            onChange={(e) => {
                                                                onChange(e.target.checked);
                                                            }}
                                                        />
                                                    </>
                                                )}
                                            />
                                        </div>
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
                    <Input.Wrapper label="Opsi">
                        <Input type="text" disabled value={selectedRowData?.pilihan} />
                    </Input.Wrapper>

                    <Input.Wrapper label="Text">
                        <Editor isParent={false} id={`detail`} value={selectedRowData?.text} height={400} />
                    </Input.Wrapper>

                    <Input.Wrapper label="Benar" className="flex w-full flex-col">
                        <Input type="text" disabled value={selectedRowData?.benar === true ? "Ya" : "Tidak"} />
                    </Input.Wrapper>
                </div>
            </Modal>
        </>
    );
};

export default PBK;
