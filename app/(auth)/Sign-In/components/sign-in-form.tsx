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
  HStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
interface UserProps {
  email: string;
  password: string;
}
const SignInForm = () => {
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
      await signIn("credentials", {
        ...values,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("/");
    } catch (error) {
      console.log("Sign-In", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-transparent sm:bg-black/70 p-8 sm:p-16 flex flex-col gap-8 z-50"
    >
      <h2 className="text-3xl font-semibold text-white">Sign In</h2>
      <FormControl
        className="flex flex-col gap-8"
        isInvalid={Boolean(errors.email || errors.password)}
      >
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
              {...register("password", {
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
          {errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
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
        Sign In
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
          New to Netflix?{" "}
          <Link href={"/Sign-Up"} className="text-white hover:underline">
            Sign up now.
          </Link>
        </div>
      </div>
      <HStack className="gap-2 justify-center">
        <div
          onClick={() => {
            signIn("google", { callbackUrl: "/" });
          }}
          className="rounded-full h-10 w-10 flex items-center justify-center bg-white hover:opacity-70 transition cursor-pointer"
        >
          <FcGoogle size={30} />
        </div>
        <div
          onClick={() => {
            signIn("github", { callbackUrl: "/" });
          }}
          className="rounded-full h-10 w-10 flex items-center justify-center bg-white hover:opacity-70 transition cursor-pointer"
        >
          <FaGithub size={30} />
        </div>
      </HStack>
    </form>
  );
};

export default SignInForm;
