import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    // <div className="w-full bg-blue-300 flex justify-end">
    //   <UserButton afterSignOutUrl="/" />
    // </div>

    <div>
      <h1>click to sign up or sign in</h1>
      <button type="button"> click</button>
    </div>
  );
}
