import { Card, CardBody, Spinner } from '@material-tailwind/react';
import React from 'react';

interface Props {
    data: any;
    column: any;
    isLoading: boolean;
}

const Table = ({ data, column, isLoading }: Props) => {
    return (
        <Card>
            <CardBody className="no-scrollbar w-full overflow-scroll rounded-md bg-white dark:bg-black dark:text-white-light">
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            {column?.map((item: any, key: any) => (
                                <th key={key}>{item?.title}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan={column?.length + 1} className="w-full">
                                    <div className="my-4 flex items-center justify-center">
                                        <Spinner className="h-14 w-14" />
                                    </div>
                                </td>
                            </tr>
                        )}

                        {data === null ||
                            data === undefined ||
                            (data?.length === 0 && (
                                <tr>
                                    <td colSpan={column?.length + 1} className="w-full">
                                        <div className="my-4 flex items-center justify-center">
                                            <p className="text-lg">Tidak ada data</p>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        {data &&
                            data?.map((item: any, key: any) => (
                                <tr key={key}>
                                    <td>{++key}</td>

                                    {column?.map((itemColumn: any, keyColumn: any) =>
                                        itemColumn.render ? (
                                            itemColumn.dataIndex === 'action' ? (
                                                <td key={itemColumn.dataIndex + key + keyColumn}>
                                                    <span>{itemColumn.render(itemColumn.dataIndex, item, ++key)}</span>
                                                </td>
                                            ) : (
                                                <td key={itemColumn.dataIndex + key + keyColumn}>
                                                    <span>{itemColumn.render(item[itemColumn.dataIndex], item, ++key)}</span>
                                                </td>
                                            )
                                        ) : (
                                            <td key={itemColumn.dataIndex + key + keyColumn}>
                                                <span>{item[itemColumn.dataIndex]}</span>
                                            </td>
                                        )
                                    )}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
};

export default Table;
