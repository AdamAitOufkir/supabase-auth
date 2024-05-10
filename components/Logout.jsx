"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full p-3 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none"
    >
      Log Out
    </button>
  );
};

export default Logout;
