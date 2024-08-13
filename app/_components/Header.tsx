import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-100">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-orange-500 hover:text-orange-600 font-extrabold">SKETCHSYNC</h1>
          <div className="flex flex-1 items-center justify-end">
            <div className="hidden md:flex items-center gap-4">
              <LoginLink>
                <Button className="block rounded-md px-5 py-2.5 text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 transition">
                  Login
                </Button>
              </LoginLink>
              <RegisterLink>
                <Button className="block rounded-md bg-orange-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600">
                  Register
                </Button>
              </RegisterLink>
            </div>

            <button
              className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col items-center space-y-4 mt-4">
              <LoginLink>
                <Button className="block w-full rounded-md px-5 py-2.5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 transition">
                  Login
                </Button>
              </LoginLink>
              <RegisterLink>
                <Button className="block w-full rounded-md px-5 py-2.5 text-sm font-medium text-white bg-orange-500 transition hover:bg-orange-600">
                  Register
                </Button>
              </RegisterLink>
            </div>
          </div>
        )}
      </header>
      <div className="border-b border-gray-200"></div> {/* Separator line */}
    </>
  );
}

export default Header;
