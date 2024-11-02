"use server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 403 };
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        workspace: {
          where: {
            User: {
              clerkid: user.id,
            },
          },
        },
      },
    });
    if (existingUser) return { status: 200, user: existingUser };

    const newUser = await prisma.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        image: user.imageUrl,
        subscription: {
          create: {},
        },
        workspace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: "PERSONAL",
          },
        },
      },
      include: {
        workspace: {
          where: {
            User: {
              clerkid: user.id,
            },
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (newUser) return { status: 201, newUser };
  } catch (error) {
    console.log("🔴 ERROR", error);
    return { status: 500 };
  }
};

export const getNotifications = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 403 };
    }

    const notifications  = await prisma.user.findUnique({
      where : {
        clerkid : user.id
      },
      select : {
        notification : true,
        _count : {
          select : {
            notification:true
          }
        }
      }
    })

    if(notifications && notifications.notification.length >0) {
      return {status : 200 , notifications}
    }
    return { status: 403, notifications : [] };
  } catch (error) {
        return { status: 403, notifications: [] };

  }
};
