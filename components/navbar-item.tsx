import { cn } from "@/lib/utils"

interface NavbarItemProps {
    label: string,
    ClassName?: React.ReactNode
}

const NavbarItem: React.FC<NavbarItemProps> = ({
    label,
    ClassName
}) => {
  return (
    <div className={cn("text-white text-sm whitespace-nowrap cursor-pointer hover:text-gray-300 transition",ClassName)}>
        {label}
    </div>
  )
}

export default NavbarItem