import { Typography } from '@material-tailwind/react'
import React from 'react'
import { BsInbox } from 'react-icons/bs'

const TableKuncijawaban = ({ refTable, data, TABLE_HEAD }: any) => {
    return (
        <table className="w-full min-w-max table-auto text-left" ref={refTable}>
            <thead>
                <tr>
                    {TABLE_HEAD.map((head) => (
                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                            >
                                {head}
                            </Typography>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? data.map((item, index) => {
                    return (
                        <tr key={index}>
                            {Object.values(item).map((value, subIndex) => (
                                <td key={subIndex}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {value}
                                    </Typography>
                                </td>
                            ))}
                        </tr>
                    )
                }) :
                    <tr>
                        <td colSpan={TABLE_HEAD.length} className="text-center">
                            <div className="flex justify-center items-center my-20 w-full">
                                <div className="grid justify-items-center opacity-50">
                                    <BsInbox className="w-10 h-10 text-center" />
                                    <p className="text-center text-xl font-normal">
                                        Empty Data
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    )
}

export default TableKuncijawaban