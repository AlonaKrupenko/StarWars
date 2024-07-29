"use client";
import Loader from "@/app/loading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

const PAGE_SIZE = 10;

const Pagination = ({ hasNext, hasPrevious, totalHeroes }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || 1;
  const params = new URLSearchParams(searchParams);

  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState(parseInt(page));

  const handleChangePage = (type, number) => {
    switch (type) {
      case "previous":
        params.set("page", parseInt(currentPage) - 1);
        setCurrentPage((prev) => prev - 1);
        break;
      case "next":
        params.set("page", parseInt(currentPage) + 1);
        setCurrentPage((prev) => prev + 1);
        break;
      case "number":
        params.set("page", parseInt(number));
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
            onClick={() => handleChangePage("previous")}
            className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded select-none hover:bg-yellow-200 active:bg-yellow-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
                    ? "relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded bg-black text-center align-middle text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    : "relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded text-center align-middle font-sans text-xs font-medium uppercase text-black transition-all hover:bg-yellow-200 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                }
                type="button"
                onClick={() => handleChangePage("number", number)}
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
            onClick={() => handleChangePage("next")}
            className="cursor-pointer flex items-center gap-2 px-6 py-3 text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded select-none hover:bg-yellow-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
