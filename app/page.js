import Image from "next/image";
import NavBar from "./components/NavBar";
import Calculator from "./components/Calculator";

export default function Home() {
  return (
    <div>
      <NavBar/>
      <Calculator/>
    </div>
  );
}
