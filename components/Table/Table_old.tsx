import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { HiXMark } from 'react-icons/hi2'
import { BiCheck } from 'react-icons/bi'

import Link from "next/link";

interface TableProps {
  headData: string[];
  rowsData: { [key: string]: string }[];
}

interface RightClickOptionProps {
  xPos: number;
  yPos: number;
  onClose: () => void;
}


export default function Table({ headData, rowsData }: TableProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);

  const RightClickOption: React.FC<RightClickOptionProps> = ({
    xPos,
    yPos,
    onClose,
  }) => {
    return (
      <section
        className="fixed bg-white rounded shadow-md"
        style={{ top: yPos, left: xPos }}
      >
        <ul className="text-gray-900 dark:text-gray-50 text-sm">
          <Link href={"#"} passHref>
            <li className="flex gap-2 items-center py-2 px-4 cursor-pointer hover:bg-gray-100">
              <HiOutlinePencilAlt className="w-4 h-4" />
              <span>Ubah</span>
            </li>
          </Link>
          <Link href={"#"} passHref>
            <li className="flex gap-2 items-center py-2 px-4 cursor-pointer hover:bg-gray-100">
              <BiCheck className="w-4 h-4" />
              <span>Aktif</span>
            </li>
          </Link>
          <Link href={"#"} passHref>
            <li className="flex gap-2 items-center py-2 px-4 cursor-pointer hover:bg-gray-100">
              <HiXMark className="w-4 h-4" />
              <span>Tidak Aktif</span>
            </li>
          </Link>
        </ul>
      </section>
    );
  };

  const handleContextMenu = (
    event: React.MouseEvent<HTMLTableRowElement>,
    rowIndex: number
  ) => {
    event.preventDefault();
    setShowMenu(true);
    setSelectedRowIndex(rowIndex);
    setMenuPosition({ x: event.clientX, y: event.clientY });
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
    setSelectedRowIndex(-1);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
        setSelectedRowIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <Card className="rounded shadow">
      <table className="text-left">
        <thead>
          <tr>
            <th
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              key="__number__" // Add a special key for the number column
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                No.
              </Typography>
            </th>
            {headData.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
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
          {rowsData.map((row, index) => {
            const isLast = index === rowsData.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr
                key={index}
                className={selectedRowIndex === index ? "bg-blue-100" : ""}
                onContextMenu={(event) => handleContextMenu(event, index)}
              >
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {index + 1} {/* Display the auto-incremented row number */}
                  </Typography>
                </td>
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex} className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {cell}
                    </Typography>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {showMenu && (
        <div ref={contextMenuRef}>
          <RightClickOption
            xPos={menuPosition.x}
            yPos={menuPosition.y}
            onClose={handleCloseMenu}
          />
        </div>
      )}
    </Card>
  );
}
