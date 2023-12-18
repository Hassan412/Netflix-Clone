import React from "react";
import { AddIcon } from "@chakra-ui/icons";
const SecoundFavoriteButton = () => {
  return (
    <div
      className={`py-1 text-white md:py-2 px-2 md:px-6 gap-2 uppercase w-auto text-xs lg:text-lg flex flex-row items-center transition cursor-pointer mr-1 border border-neutral-400 hover:opacity-60`}
    >
      <AddIcon />
      My List
    </div>
  );
};

export default SecoundFavoriteButton;
