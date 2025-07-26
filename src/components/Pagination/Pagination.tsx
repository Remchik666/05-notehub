import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (selected: number) => void;
}

export default function Pagination({
    totalPages,
    currentPage,
    onPageChange,
}: PaginationProps) {
    const handlePageClick = (event: { selected: number }) => {
        onPageChange(event.selected + 1);
    };

    if (totalPages <= 1) return null;

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="→"
            previousLabel="←"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={totalPages}
            forcePage={currentPage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
        />
    );
}