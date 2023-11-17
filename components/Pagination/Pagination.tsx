import { Button } from '@material-tailwind/react';
import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

interface Props {
    itemsCount: any;
    itemsPerPage: any;
    currentPage: any;
    setCurrentPage: any;
    onChange: any;
}

const Pagination = ({ itemsCount, itemsPerPage, currentPage, setCurrentPage, onChange }: Props) => {
    const pagesCount = Math.ceil(itemsCount / itemsPerPage);
    const isCurrentPageFirst = currentPage === 1;
    const isCurrentPageLast = currentPage === pagesCount;

    const setOffset = (page: any) => {
        const newOffset = (page - 1) * itemsPerPage;
        const offset = { offset: newOffset };
        onChange(offset);
    };

    const changePage = (number: any) => {
        if (currentPage === number) return;
        setCurrentPage(number);
    };

    const onPageNumberClick = (pageNumber: any) => {
        setOffset(pageNumber);
        changePage(pageNumber);
    };

    const onPreviousPageClick = () => {
        const page = currentPage - 1;
        setOffset(page);
        changePage((page: any) => page - 1);
    };

    const onNextPageClick = () => {
        const page = currentPage + 1;
        setOffset(page);
        changePage((page: any) => page + 1);
    };

    let isPageNumberOutOfRange: any;

    const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
        const pageNumber = index + 1;
        const isPageNumberFirst = pageNumber === 1;
        const isPageNumberLast = pageNumber === pagesCount;
        const isCurrentPageWithinTwoPageNumbers = Math.abs(pageNumber - currentPage) <= 2;

        if (isPageNumberFirst || isPageNumberLast || isCurrentPageWithinTwoPageNumbers) {
            isPageNumberOutOfRange = false;
            return (
                <Button
                    key={pageNumber}
                    variant="text"
                    onClick={() => onPageNumberClick(pageNumber)}
                    className={`${pageNumber === currentPage ? '  text-black' : 'bg-transparent text-gray-600'} !p-2`}
                >
                    {pageNumber}
                </Button>
            );
        }

        if (!isPageNumberOutOfRange) {
            isPageNumberOutOfRange = true;
            return <div key={pageNumber} />;
        }

        return null;
    });

    return (
        <div className="mt-5 flex items-center justify-end">
            <div>
                <div className="flex items-center">
                    <button className="flex h-10 items-center gap-2 border-none bg-gray-700 px-2 text-white" onClick={onPreviousPageClick} disabled={isCurrentPageFirst || itemsCount === 0}>
                        <MdKeyboardArrowLeft size={20} />
                        Sebelumnya
                    </button>

                    <div className="flex h-10 items-center gap-2 bg-gray-300">{pagesCount > 1 ? pageNumbers : null}</div>

                    <button className="flex h-10 items-center gap-2 border-none bg-gray-700 px-2 text-white" onClick={onNextPageClick} disabled={isCurrentPageLast || itemsCount === 0}>
                        Selanjutnya
                        <MdKeyboardArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
