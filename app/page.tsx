import Image from "next/image";
import styles from "./page.module.css";
import Memories from "@/components/Memorie";

function Home() {
  return(
    <main>
      <Memories />
    </main>
  )
}

export default Home;