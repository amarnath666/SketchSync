import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { nanoid } from "nanoid";

export const getTeam = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        const allTeams = await ctx.db
            .query("teams")
            .filter(q => 
                q.or(
                    q.eq(q.field("createdBy"), args.email),
                    q.and(
                        q.neq(q.field("members"), undefined),
                        q.eq(q.field("members"), args.email)
                    )
                )
            )
            .collect();

        return allTeams;
    }
});

export const createTeam = mutation({
    args: {
        teamName: v.string(),
        createdBy: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert("teams", {
            teamName: args.teamName,
            createdBy: args.createdBy,
            members: [],
        })
        return result;
    }
});

export const generateShareLink = mutation({
    args: {
        teamId: v.id("teams")
    },
    handler: async(ctx, args) => {
        const team = await ctx.db.get(args.teamId);
        if (!team) throw new Error("Team not found");

        const shareCode = nanoid(10); // Generate a unique code
        await ctx.db.patch(args.teamId, { shareCode });

        return `http://localhost:3000/join/${shareCode}`
    }
})

export const addMemberToTeam = mutation({
    args: {
        shareCode: v.string(),
        memberEmail: v.string(),
    },
    handler: async (ctx, args) => {
        const team = await ctx.db
            .query("teams")
            .filter(q => q.eq(q.field("shareCode"), args.shareCode))
            .first();

        if (!team) throw new Error("Invalid share link");

        // Check if the member is already in the team
        const currentMembers = team.members || [];
        if (currentMembers.includes(args.memberEmail)) {
            throw new Error("Member already exists");
        }

        // Add the new member to the team's members array
        const updatedMembers = [...currentMembers, args.memberEmail];

        // Update the team document
        await ctx.db.patch(team._id, { members: updatedMembers });

        return { success: true, teamId: team._id, teamName: team.teamName };
    }
});