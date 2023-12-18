import { cn } from "@/lib/utils";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  const MobileMenuData = [
    "Home",
    "Series",
    "Films",
    "New & Popular",
    "My List",
    "Browse by languages",
  ];
  return (
    <div
      className={cn(
        "bg-black w-56 absolute top-8 left-0 flex py-5 flex-col border-2 border-gray-800 transition translate-y-6 opacity-0",
        visible ? "translate-y-0 opacity-100" : ""
      )}
    >
      <div className="flex flex-col gap-4">
        {MobileMenuData.map((Item) => (
          <div key={Item} className="px-3 text-center text-white hover:underline">
           {Item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
