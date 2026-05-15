import { type FC } from "react";
import { SectionControl, SectionReserves, SectionUser } from "../components";
import { useSidebarStore } from "@/presentation/zustand";
import { ESidebar } from "@/presentation/toolbox";

export const Dashboard: FC = () => {
  const { selected } = useSidebarStore();

  const renderContent = () => {
    switch (selected) {
      case ESidebar.USUARIOS:
        return <SectionUser />;
      case ESidebar.RESERVAS:
        return <SectionReserves />;
      case ESidebar.CONTROL:
        return <SectionControl />;
      default:
        return <></>;
    }
  };

  return renderContent();
};
