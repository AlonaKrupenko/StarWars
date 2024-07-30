"use client";
import Loader from "@/app/loading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

const PAGE_SIZE = 10;
const NEXT_PAGE = "next";
const PREVIOUS_PAGE = "previous";
const PAGE_NUMBER = "number";
const PAGE = "page";

/**
 * Pagination component for navigating through a list of heroes.
 * @param {Object} props - The component props.
 * @param {boolean} props.hasNext - Indicates if there is a next page.
 * @param {boolean} props.hasPrevious - Indicates if there is a previous page.
 * @param {number} props.totalHeroes - The total number of heroes.
 * @returns {JSX.Element} The pagination component.
 */
const Pagination = ({ hasNext, hasPrevious, totalHeroes }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get(PAGE) || 1;
  const params = new URLSearchParams(searchParams);

  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState(parseInt(page));

  const nextPreviousButtonClasses =
    "cursor-pointer flex items-center gap-2 px-6 py-3 text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded select-none hover:bg-yellow-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";
  const activeNumbersButtonClasses =
    "bg-black relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded text-center align-middle text-xs font-medium uppercase text-white transition-all";
  const numbersButtonClasses =
    "relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded text-center align-middle text-xs font-medium uppercase text-black transition-all hover:bg-yellow-200 ";

  const handleChangePage = (type, number) => {
    switch (type) {
      case PREVIOUS_PAGE:
        params.set(PAGE, parseInt(currentPage) - 1);
        setCurrentPage((prev) => prev - 1);
        break;
      case NEXT_PAGE:
        params.set(PAGE, parseInt(currentPage) + 1);
        setCurrentPage((prev) => prev + 1);
        break;
      case PAGE_NUMBER:
        params.set(PAGE, parseInt(number));
        setCurrentPage(number);
        break;
      default:
        break;
    }
    startTransition(() => {
      replace(`${pathname}?${params}`);
    });
  };

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalHeroes / PAGE_SIZE); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul className="list-style-none flex justify-center content-center flex-wrap gap-2">
        <li>
          <button
            disabled={!hasPrevious}
            onClick={() => handleChangePage(PREVIOUS_PAGE)}
            className={nextPreviousButtonClasses}
          >
            Previous
          </button>
        </li>

        {pageNumbers.map((number) => {
          return (
            <li key={number}>
              <button
                className={
                  Number(currentPage) === number
                    ? activeNumbersButtonClasses
                    : numbersButtonClasses
                }
                type="button"
                onClick={() => handleChangePage(PAGE_NUMBER, number)}
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  {number}
                </span>
              </button>
            </li>
          );
        })}

        <li>
          <button
            disabled={!hasNext}
            onClick={() => handleChangePage(NEXT_PAGE)}
            className={nextPreviousButtonClasses}
          >
            Next
          </button>
        </li>
      </ul>
      {isPending && <Loader />}
    </>
  );
};

export default Pagination;
