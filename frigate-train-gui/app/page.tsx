import Image from "next/image";
import Face from "@/components/Face";
import { main } from "bun";

export default function Home() {
  return (
    <main>
      <Face img="https://placehold.co/400x400" name="John" percent={75}/>


    </main>





  );
}
