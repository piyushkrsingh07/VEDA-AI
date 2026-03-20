import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};



export default function Home() {
  return (
    <div className="text-red-600 text-2xl ">
     hello from piyush
    </div>
  );
}
