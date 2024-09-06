import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      id="login"
      className="flex justify-center items-center h-screen w-full"
    >
      <div className="text-center">
        <div className="pb-10 flex justify-center">
          <Image
            src="./assets/logo/flipflop_logo.png"
            width={200}
            height={200}
            alt="logo"
          />
        </div>
        <h1 className="text-[20px] font-bold pb-2">Welcome to FlipFlop</h1>
        <p className="pb-10 font-medium">
          We are connecting you with digital life.
        </p>
        <p className="pb-2">Continue with:</p>
        <div className="flex justify-center pb-4">
          <Image
            className="w-20 py-1 border rounded-xl cursor-pointer"
            src="./assets/logo/facebook_logo.png"
            width={1000}
            height={1000}
            alt="facebook"
          />
        </div>

        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          {/* <p
            className={`absolute font-medium -translate-x-1/2  left-1/2 ${
              themeColor === "dark"
                ? "text-white bg-black"
                : "bg-white text-gray-900 px-3"
            }`}
          >
            or
          </p> */}
        </div>

        <div className="w-full flex flex-col space-y-2">
          <Button className="bg-[#F3BE22] hover:bg-[#fad56d] rounded-xl text-white">
            Create an account
          </Button>
          <Link className="w-full" href="/">
            <Button
              variant="outline"
              className="w-full rounded-xl border-[#F3BE22] text-[#F3BE22] hover:text-[#f9d977]"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
