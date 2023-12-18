"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  FormControl,
  FormErrorMessage,
  Checkbox,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
interface UserProps {
  name: string;
  email: string;
  hashPassword: string;
}
const SignUpForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UserProps>();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();

  const onSubmit = async (values: UserProps) => {
    try {
      await axios.post("/api/register",values)
      await signIn("credentials", {
        email: values.email,
        password: values.hashPassword,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("/");
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-transparent sm:bg-black/70 p-8 sm:p-16 flex flex-col gap-8 z-50"
    >
      <h2 className="text-3xl font-semibold text-white">Sign Up</h2>
      <FormControl
        className="flex flex-col gap-8"
        isInvalid={Boolean(errors.email || errors.hashPassword || errors.name)}
      >
        <Stack>
        <Input
              placeholder="Username"
              background={"transparent"}
              className="py-6 text-white rounded-md"
              size={"sm"}
              id="name"
              {...register("name", {
                required: "Username is required",
                minLength: {
                  value: 8,
                  message: "Username minimum length should be 8",
                },
              })}
              disabled={isSubmitting}
            />
            {errors.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </Stack>
        <Stack>
          <Input
            placeholder="Email"
            background={"transparent"}
            className="py-6 text-white rounded-md"
            type="email"
            size={"sm"}
            id="email"
            {...register("email", {
              required: "Email is required",
              minLength: { value: 8, message: "Please enter a valid email" },
            })}
            disabled={isSubmitting}
          />
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </Stack>
        <Stack>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Password"
              background={"transparent"}
              className="py-6 text-white rounded-md"
              size={"sm"}
              id="password"
              {...register("hashPassword", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password minimum length should be 8",
                },
              })}
              disabled={isSubmitting}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                variant={"unstyled"}
                className="text-white font-light top-1"
                size="sm"
                onClick={handleClick}
              >
                {show ? "HIDE" : "SHOW"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.hashPassword && (
            <FormErrorMessage>{errors.hashPassword.message}</FormErrorMessage>
          )}
        </Stack>
      </FormControl>
      <Button
        type="submit"
        colorScheme="red"
        className="bg-red bg-red-600"
        size={"lg"}
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        Sign Up
      </Button>
      <div className="flex justify-between flex-wrap items-center gap-3">
        <Checkbox
          colorScheme="dark"
          color={"white"}
          className="font-light font-1xl"
          size={"md"}
          disabled={isSubmitting}
        >
          Remember me
        </Checkbox>
        <div className="text-zinc-200/70 text-sm">
          Already have an account?{" "}
          <Link href={"/Sign-In"} className="text-white hover:underline">
            Sign In.
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
