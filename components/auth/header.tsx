import { cn } from "@/lib/utils";

interface HeaderProps {
  label?: string;
  heading: string;
}

const Header = ({ label, heading }: HeaderProps) => {
  return (
    <div className={"w-full flex flex-col gap-y-1 items-center justify-center"}>
      <h1 className={cn("text-3xl font-semibold", )}>{heading}</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default Header;
