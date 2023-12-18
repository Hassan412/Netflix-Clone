import NetflixIcon from "@/components/Netflix-icon";
import Link from "next/link";
export default function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex gap-5 items-center flex-col min-h-full w-full bg-[url('/images/Hero.jpg')] bg-fixed bg-cover">
      <div className="w-full flex justify-start h-24">
        <Link href={"/"} className="h-full relative block w-40 ml-8 z-40">
          <NetflixIcon/>
        </Link>
      </div>
      <div className="absolute inset-0 bg-black opacity-80 sm:opacity-50" />
      {children}
    </div>
  );
}
