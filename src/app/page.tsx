import Image from "next/image";
import styles from "./page.module.css";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(options);
  console.log(session?.user);
  console.log("session", session);
  const {
    user: { name },
  } = session;
  return (
    <main>{session ? <h1>ok , {name}</h1> : <h1>You shall not pass</h1>}</main>
  );
}
