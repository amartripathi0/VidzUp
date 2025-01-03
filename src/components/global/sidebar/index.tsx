"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { getWorkSpaces } from "@/actions/workspace";
import { WorkspaceProps } from "@/types/index.types";
import { PlusCircle } from "lucide-react";
import Modal from "../modal";
type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {

  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["user-workspaces"],
    queryFn: getWorkSpaces,
  });
  const { data: workspaceData } = data as WorkspaceProps;
  function onChangeActiveWorkspace(value: string) {
    router.push(`/dashboard/${value}`);
  }
  console.log(data)
  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0 ">
        {/* <Image src="/opal-logo.svg" height={40} width={40} alt="logo" /> */}
        <p className="text-2xl">VidzUp</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
            {workspaceData?.workspace.map((workspace) => (
              <SelectItem value={workspace.id} key={workspace.id}>
                {workspace.name}
              </SelectItem>
            ))}
            <Separator />
            {workspaceData?.members.length > 0 &&
              workspaceData.members.map(
                (workspace) =>
                  workspace.WorkSpace && (
                    <SelectItem
                      value={workspace.WorkSpace.id}
                      key={workspace.WorkSpace.id}
                    >
                      {workspace.WorkSpace.name}
                    </SelectItem>
                  )
              )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Modal
        trigger={
          <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90  hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
            <PlusCircle
              size={15}
              className="text-neutral-800/90 fill-neutral-500"
            />
            <span className="text-neutral-400 font-semibold text-xs">
              Invite To Workspace
            </span>
          </span>
        }
        title="Invite To Workspace"
        description="Invite other users to your workspace"
      >
        {/* <Search workspaceId={activeWorkspaceId} /> */}
      </Modal>
    </div>
  );
};

export default Sidebar;
