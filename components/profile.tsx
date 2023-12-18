"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { UserData } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Profile = () => {
  const { data, error, isLoading } = useCurrentUser();

  const user: UserData = data;
  const router = useRouter()

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => router.push("/")}>
            <div className="group flex-row w-44 mx-auto">
              <div
                className="
                  w-44 h-44
                  rounded-md
                  flex
                  items-center
                  justify-center
                  border-2
                  border-transparent
                  group-hover:cursor-pointer
                  group-hover:border-white
                  overflow-hidden
                  relative
                  "
              >
                <Image
                  src={"/images/default-blue.png"}
                  fill
                  alt="Profile"
                  priority
                />
              </div>
              <div className="mt-4 text-gray-400 text-3xl text-center group-hover:text-white">
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
