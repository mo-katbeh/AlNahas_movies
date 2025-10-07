import useMovieMenubarStore from "@/state-management/useMovieMenubarStore";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
} from "../ui/menubar";
const MovieMenubar = () => {
  const { isOpen } = useMovieMenubarStore();
  if (!isOpen) return null;
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarContent>
          <MenubarItem>new</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MovieMenubar;
