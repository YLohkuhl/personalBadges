/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

export const Native = VencordNative.pluginHelpers.PersonalBadges as PluginNative<typeof import("./native")>;


import { BadgePosition, ProfileBadge } from "@api/Badges";
import definePlugin, { PluginNative } from "@utils/types";

import { IPersonalBadge } from "./types";
import { GITHUB_URL, PluginLogger } from "./utils/constants";
import { pluginSettings } from "./utils/settings";


export const BADGE_REGISTRY: ProfileBadge[] = [];


export default definePlugin({
    name: "PersonalBadges",
    description: "Create profile badges that are exclusively visible to you through JSON.",
    authors: [{
        name: "YLohkuhl",
        id: 1204700402235478078n
    }],
    settings: pluginSettings,

    toolboxActions: {
        "Update Badges": async () => await re_registerBadges()
    },
    
    async start()
    {
        Native.initDataDir();
        await registerBadges();
    },
    stop()
    {
        de_registerBadges();
    }
});


export function isUserIncluded(userId: string, badge: IPersonalBadge): boolean {
    return badge.global || badge.users?.includes(userId) ? (badge.excluded?.includes(userId) ? false : true) : false;
}

export function defineBadgePosition(position: string | undefined): BadgePosition {
    const upper = position?.toUpperCase();
    return upper == "START" ? BadgePosition.START : (upper == "END" ? BadgePosition.END : BadgePosition.START);
}

export async function registerBadges() {
    try {
        const fetchedData = await Native.fetchBadgeData();

        fetchedData.forEach((data) => {
            data.forEach((badge) => {
                
                let badgeObject = {
                    image: badge.image,
                    description: badge.tooltip,
                    position: defineBadgePosition(badge.position),
                    link: badge.link || GITHUB_URL,
                    shouldShow: ({ userId }) => isUserIncluded(userId, badge),
                    props: {
                        style: {
                            borderRadius: "50%",
                            transform: "scale(0.9)"
                        }
                    }
                };

                BADGE_REGISTRY.push(badgeObject);
            });
        });
        
        BADGE_REGISTRY.forEach((badge) => 
            Vencord.Api.Badges.addBadge(badge)
        );
        
        PluginLogger.info("Badges were successfully registered.");
    } catch (error) {
        PluginLogger.error(error);
        PluginLogger.warn("Could not successfully register badges.");
    }
}

export function de_registerBadges() {
    try {
        BADGE_REGISTRY.forEach((badge) =>
            Vencord.Api.Badges.removeBadge(badge)
        );
        BADGE_REGISTRY.length = 0;

        PluginLogger.info("Badges were successfully deregistered.");
    } catch (error) {
        PluginLogger.error(error);
        PluginLogger.warn("Could not successfully deregister badges.");
    }
}

export async function re_registerBadges() {
    de_registerBadges();
    await registerBadges();
}