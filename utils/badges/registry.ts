/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { ProfileBadge } from "@api/Badges";

import { Native } from "../..";
import { PluginLogger } from "../constants";
import { iPersonalToProfile } from "./util";
import { IPersonalBadge } from "../../types";


export const BADGE_REGISTRY: [IPersonalBadge[], ProfileBadge[]] = [[], []];


export function getBadgeRegistry(): [IPersonalBadge[], ProfileBadge[]] {
    return BADGE_REGISTRY;
}

// export function re_registerBadge(badge: IPersonalBadge) {
//     let index = BADGE_REGISTRY[0].findIndex(x => tryIdentifyBadge(x, badge));
//     if (index === -1) return;

//     let profileBadge = iPersonalToProfile(badge);

//     Vencord.Api.Badges.removeBadge(profileBadge);
//     Vencord.Api.Badges.addBadge(profileBadge);

//     BADGE_REGISTRY[0][index] = badge;
//     BADGE_REGISTRY[1][index] = profileBadge;
// }

export async function re_registerBadges() {
    de_registerBadges();
    await registerBadges();
}

export function de_registerBadges() {
    try {
        BADGE_REGISTRY[1].forEach((badge) =>
            Vencord.Api.Badges.removeBadge(badge)
        );
        
        BADGE_REGISTRY[0].length = 0;
        BADGE_REGISTRY[1].length = 0;

        PluginLogger.info("Badge(s) successfully deregistered.");
    } catch (error) {
        PluginLogger.error(error);
        PluginLogger.warn("Could not successfully deregister badge(s).");
    }
}

export async function registerBadges() {
    try {
        const fetchedData = await Native.fetchBadgesData();

        fetchedData[1].forEach((data, index) => {
            for (let badge of data) {
                badge.path = fetchedData[0][index];

                BADGE_REGISTRY[0].push(badge);
                BADGE_REGISTRY[1].push(iPersonalToProfile(badge));
            };
        });
        
        const tooltips: string[] = [];

        BADGE_REGISTRY[1].forEach((badge, index) => {
            Vencord.Api.Badges.addBadge(badge);
            tooltips.push(badge.description ? badge.description : `PB${index}`)
        });

        PluginLogger.info(`${"\"" + tooltips.join("\", \"") + "\""} badge(s) successfully registered.`);
    } catch (error) {
        PluginLogger.error(error);
        PluginLogger.warn("Could not successfully register badge(s).");
    }
}