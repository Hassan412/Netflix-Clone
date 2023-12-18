"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  Checkbox,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  Stack,
  HStack,
} from "@chakra-ui/react";

interface SearchModelProps {
  visible?: boolean;
}

const SearchModel: React.FC<SearchModelProps> = ({ visible }) => {
  interface SearchProps {
    search: string;
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SearchProps>();
  if (!visible) {
    return null;
  }
  return (
    <div className="absolute bg-black z-50 inset-0 p-20 flex items-center flex-col">
      <Stack>
        <Input
          placeholder="Search"
          background={"transparent"}
          className="py-5 text-white rounded-md max-w-sm min-w-[20rem]"
          focusBorderColor="red.600"
          type="search"
          size={"sm"}
          id="Search"
          {...register("search", {
            required: "Email is required",
            minLength: { value: 8, message: "Please enter a valid email" },
          })}
          disabled={isSubmitting}
        />
        {errors.search && (
          <FormErrorMessage>{errors.search.message}</FormErrorMessage>
        )}
      </Stack>
    </div>
  );
};

export default SearchModel;
