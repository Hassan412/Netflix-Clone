import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { cn } from "@/lib/utils";
import useSearchBar from "@/hooks/useSearchBar";
import { useCallback, memo, useState } from "react";
import { useShallow } from 'zustand/react/shallow'

const SearchBar = () => {
  const { onOpen, onClose, isOpen, Query } = useSearchBar();
  const setQuery = useSearchBar(useShallow((state)=> state.setQuery))
  const [search, setSearch] = useState("")
  const handleOpen = useCallback(() => {
    onOpen();
    setQuery("");
  }, [onOpen, setQuery]);

  return (
    <InputGroup>
      <InputLeftElement
        className="h-full z-50"
        onClick={handleOpen}
      >
        <SearchIcon color={"white"} cursor={"pointer"} boxSize={isOpen ? 4 : 6} />
      </InputLeftElement>
      <Input
        placeholder="Search"
        background={"transparent"}
        className={cn(
          "text-white max-w-sm transition-all duration-1000",
          isOpen ? "max-w-sm" : "max-w-0 border-none !p-5"
        )}
        // onChange={(e) => setQuery(e.target.value)}
        onChange={(e)=> {
          setQuery(e.currentTarget.value);
          setSearch(e.target.value)
        }}
        value={search}
        autoComplete={"off"}
        focusBorderColor="red.600"
        borderRadius={"none"}
        type="search"
        size={"sm"}
        id="Search"
      />

      <InputRightElement
        className="h-full"
        onClick={onClose}
      >
        {isOpen && (
          <CloseIcon className="text-white cursor-pointer" boxSize={3} />
        )}
      </InputRightElement>
    </InputGroup>
  );
};

export default memo(SearchBar);