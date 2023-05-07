interface Job {
  id: number;
  title: string;
  desc: string;
  location: string;
}

export default function JobItem({ id, title, desc, location }: Job) {
  return (
    <li
      className="group rounded-lg border border-transparent hover:border-gray-300 hover:bg-gray-100 shadow-md"
      key={id}
    >
      <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap -mx-3">
            <div className="flex-none w-2/3 max-w-full px-3">
              <div>
                <p className="py-3 font-sans font-semibold leading-normal text-sm">
                  {title}
                </p>
                <h5 className="py-3 font-bold">
                  {desc}
                  <span className="leading-normal text-sm font-weight-bolder text-lime-500">
                    {location}
                  </span>
                </h5>
              </div>
              <a
                className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                href="/download"
              >
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <svg
                    className="h-5 w-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4">
                  Apply
                </span>
              </a>
            </div>
            <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
              <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                <i
                  className="ni ni-money-coins text-lg relative top-3.5 text-white"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
