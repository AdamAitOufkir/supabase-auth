import Logout from "@/components/Logout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
    // return (
    //   <main className="h-screen flex items-center justify-center bg-gray-800 p-6">
    //     <div className="flex flex-col">
    //       <h1 className="mb-2">You are not logged in</h1>
    //       <Link
    //         href={"/login"}
    //         className="w-full p-3 rounded-md text-center bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
    //       >
    //         Login
    //       </Link>
    //     </div>
    //   </main>
    // );
  }

  return (
    <main className="h-screen flex items-center justify-center bg-gray-800 p-6">
      <div className="flex flex-col">
        <h1 className="mb-2 text-xl">Hello {user.email}</h1>
        <h1 className="mb-2">
          You created your account at {user.created_at.split("T", 1)}
        </h1>
        <h1 className="mb-2">
          Your last sign in was at {user.last_sign_in_at.split("T", 1)}
        </h1>
        <Logout />
      </div>
    </main>
  );
}
