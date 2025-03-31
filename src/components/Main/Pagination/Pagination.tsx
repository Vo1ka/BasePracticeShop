import './pagination.css';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange
}: PaginationProps) =>{
    return(
        <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`pagination-button ${
                    currentPage === page ? 'active' : ''
                }`}>
                {page}
                </button>
             ))}
        </div>
    )
}