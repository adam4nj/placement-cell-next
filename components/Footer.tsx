import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer aria-label="Site Footer" className="bg-black">
      <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-8 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          <div className="md:w-1/3 w-2/3 mx-5">
            <div className="text-white">
              <Image
                src="assets/logo-dark.svg"
                width={140}
                height={70}
                alt="Placement Cell Logo"
              />
            </div>

            <p className="mt-4 text-gray-300">
              Website of Placement Cell, Dr. JMC
              <br />
              Aranattukara, Thrissur
            </p>

            <div className="flex gap-6 mt-8">
              <Link
                href="https://github.com/adam4nj/placement-cell-next"
                rel="noreferrer"
                target="_blank"
                className="text-gray-300 transition hover:opacity-75"
              >
                <span className="sr-only">GitHub</span>

                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="w-2/3 flex flex-col space-y-3 mx-5 justify-left">
            <h6 className="text-white font-semibold text-2xl">Contact Us</h6>
            <div className="flex flex-col sm:flex-row w-fit md:w-4/5 justify-between gap-6">
              <p className="text-white text-left">
                <span className="font-medium">
                  CCSIT Dr. John Mathai Centre
                </span>
                ,
                <br /> Regional Centre,
                <br /> University of Calicut,
                <br /> Aranattukara, Thrissur,
                <br /> Kerala - 680 000
              </p>
              <p className="text-white text-left">
                <span className="font-medium">Email:</span> jmctsr@gmail.com
                <br />
                <span className="font-medium">Phone:</span> 00000 00000
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between mx-5 gap-2">
          <p className="text-xs text-gray-500">
            &copy; 2023. Placement Cell. All rights reserved.
          </p>
          <ul className="text-slate-100 text-sm flex flex-col md:flex-row md:mx-auto gap-10 justify-left md:justify-between">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
            <li>Complaints</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
