import { Button } from "./ui/button";

interface PaginationProps {
  page: number;
  length: number;
  setPage: (cbFn: (page: number) => number) => void;
}

const Pagination = ({ page, setPage, length }: PaginationProps) => {
  const handlePrevPage = () => {
    if (page < 2) return;
    setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page > 99) return;
    setPage((prev) => prev + 1);
  };

  if (length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <Button variant={"ghost"} onClick={handlePrevPage} disabled={page < 2}>
        Previous
      </Button>
      <Button
        variant={"ghost"}
        onClick={handleNextPage}
        disabled={page > 99 || length < 20}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
