import { getServerSession } from "next-auth";
import Image from "next/image";
import { options } from "../api/auth/[...nextauth]/options";
export default async function page() {
  //   const a = await GET();
  //   console.log("aaaaaaa", a);
  const session = await getServerSession(options);
  console.log("serverSession ,,,", session);
  return (
    <>
      {session ? (
        <div>
          <Image
            src={session?.user?.image as string}
            alt={session?.user?.name as string}
            width={300}
            height={300}
          />
        </div>
      ) : (
        <h1>No</h1>
      )}
    </>
  );
}
