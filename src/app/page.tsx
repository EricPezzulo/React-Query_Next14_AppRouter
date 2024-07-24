import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div className="flex w-full items-center justify-center">
          <h1 className="text-3xl font-semibold">Learn React Query</h1>
          <div className="pl-3">
            <Image
              alt="react-query-logo"
              width={45}
              height={45}
              src="https://seeklogo.com/images/R/react-query-logo-1340EA4CE9-seeklogo.com.png"
            />
          </div>
        </div>
        <div className="flex flex-col pt-5">
          <button
            className="h-8 w-20 rounded-md bg-teal-500 text-teal-900 duration-100 ease-in-out hover:bg-teal-400"
            type="button"
          >
            <Link className="font-medium" role="button" href={"/blog"}>
              Blogs
            </Link>
          </button>
          <button
            className="mt-5 h-8 w-20 rounded-md bg-teal-500 text-teal-900 duration-100 ease-in-out hover:bg-teal-400"
            type="button"
          >
            <Link className="font-medium" role="button" href={"/admin"}>
              Admin
            </Link>
          </button>
        </div>
      </div>
    </main>
  );
}
