import { cn } from "@/lib/utils";
import React from "react";
import { BsChevronLeft } from "react-icons/bs";

const SwiperPrev = ({
  Ref,
  className,
}: {
  Ref: React.RefObject<HTMLButtonElement>;
  className?: React.ReactNode;
}) => {
  return (
    <button
      ref={Ref}
      className={cn("h-full absolute left-0 top-0 bottom-0 z-50 bg-black/30 transition hover:bg-black/20", className)}
    >
      <BsChevronLeft className="text-white" size={50} />
    </button>
  );
};

export default SwiperPrev;
