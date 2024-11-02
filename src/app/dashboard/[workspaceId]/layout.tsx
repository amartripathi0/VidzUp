import { getNotifications, onAuthenticateUser } from "@/actions/user";
import { getAllUserVideos, getWorkspaceFolders, getWorkSpaces, verifyAccessToWorkspace } from "@/actions/workspace";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import {QueryClient} from '@tanstack/react-query'
type Props = {
  params: {
    workspaceId: string;
  };
  children: ReactNode;
};
export default async function Layout({ params: { workspaceId } }: Props) {
  // check if user is authenticated or isAuth but don't have workspace for some reason => sign-in
  const auth = await onAuthenticateUser();
  if (!auth?.user?.workspace) return redirect("/auth/sign-in");
  if (!auth?.user?.workspace.length) return redirect("/auth/sign-in");

  const hasWorkspaceAccess = await verifyAccessToWorkspace(workspaceId);
  if(hasWorkspaceAccess.status !== 200) return redirect(`/dashboard/${auth.user.workspace[0].id}`);
  if(!hasWorkspaceAccess.data?.workspace) return null;

  const query = new QueryClient()
// prefetching and storing data in state
  await query.prefetchQuery({
    queryKey : ['workspace-folders'],
    queryFn : () => getWorkspaceFolders(workspaceId)
  })
  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkSpaces(),
  });
  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotifications(),
  });
  return <div>Layout</div>;
}
