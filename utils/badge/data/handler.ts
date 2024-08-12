/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { ProfileBadge } from "@api/Badges";

import { PluginLogger } from "../../../utils/constants";
import { IPersonalBadge } from "../../../types";
import { iPersonalToProfile } from "..";

import * as BadgeStore from '.';


const cache = new Map<string, [IPersonalBadge, ProfileBadge]>();


export default (new class BadgeHandler {

    public getCache(): Map<string, [IPersonalBadge, ProfileBadge]> { return cache; }

    public async refreshCache() {
        try {
            const registered = await BadgeStore.registered();
            Object.entries(registered).map((data) =>  cache.set(data[0], [data[1], iPersonalToProfile(data[1])]));
        } catch (error) {
            PluginLogger.error(error);
            PluginLogger.warn("Could not successfully refresh the cache.");
        }
    }

    public async re_init() {
        this.de_init();
        await this.init();
    }

    public de_init() {
        try {
            cache.forEach((badge) => Vencord.Api.Badges.removeBadge(badge[1]));

            PluginLogger.info(`${cache.size} badge(s) successfully deregistered.`);
            cache.clear();
        } catch (error) {
            PluginLogger.error(error);
            PluginLogger.warn("Could not successfully deregister badge(s).");
        }
    }

    public async init() {
        try {
            await this.refreshCache();
            cache.forEach((badge) => Vencord.Api.Badges.addBadge(badge[1]));

            PluginLogger.info(`${cache.size} badge(s) successfully registered.`);
        } catch (error) {
            PluginLogger.error(error);
            PluginLogger.warn("Could not successfully register badge(s).");
        }
    }

    public async deregister(id: string) {
        cache.delete(id);
        await BadgeStore.deregister(id);
    }

    public async update(id: string, value: IPersonalBadge) {
        cache.set(id, [value, iPersonalToProfile(value)]);
        await BadgeStore.update(id, value);
    }

    public async register(value: IPersonalBadge) {
        if (Array.from(cache.entries()).some((x: [string, [IPersonalBadge, ProfileBadge]]) => {
            let {id: _, ...cached} = x[1][0];
            let {id: __, ...object} = value;
            return JSON.stringify(cached) === JSON.stringify(object);
        })) return;
        
        await BadgeStore.register(value);
        if (value.id) cache.set(value.id, [value, iPersonalToProfile(value)]);
    }

})

// export const BADGE_REGISTRY: [IPersonalBadge[], ProfileBadge[]] = [[], []];


// export function getBadgeRegistry(): [IPersonalBadge[], ProfileBadge[]] {
//     return BADGE_REGISTRY;
// }

// // export function re_registerBadge(badge: IPersonalBadge) {
// //     let index = BADGE_REGISTRY[0].findIndex(x => tryIdentifyBadge(x, badge));
// //     if (index === -1) return;

// //     let profileBadge = iPersonalToProfile(badge);

// //     Vencord.Api.Badges.removeBadge(profileBadge);
// //     Vencord.Api.Badges.addBadge(profileBadge);

// //     BADGE_REGISTRY[0][index] = badge;
// //     BADGE_REGISTRY[1][index] = profileBadge;
// // }

// export async function re_registerBadges() {
//     de_registerBadges();
//     await registerBadges();
// }

// export function de_registerBadges() {
//     try {
//         BADGE_REGISTRY[1].forEach((badge) =>
//             Vencord.Api.Badges.removeBadge(badge)
//         );
        
//         BADGE_REGISTRY[0].length = 0;
//         BADGE_REGISTRY[1].length = 0;

//         PluginLogger.info("Badge(s) successfully deregistered.");
//     } catch (error) {
//         PluginLogger.error(error);
//         PluginLogger.warn("Could not successfully deregister badge(s).");
//     }
// }

// export async function registerBadges() {
//     try {
//     } catch (error) {

//     }
//     // try {
//     //     const nativeFetchedData = await Native.fetchNativeBadgeData();

//     //     nativeFetchedData[1].forEach((data, index) => {
//     //         for (let badge of data) {
//     //             badge.path = nativeFetchedData[0][index];

//     //             BADGE_REGISTRY[0].push(badge);
//     //             BADGE_REGISTRY[1].push(iPersonalToProfile(badge));
//     //         };
//     //     });
        
//     //     const tooltips: string[] = [];

//     //     BADGE_REGISTRY[1].forEach((badge, index) => {
//     //         Vencord.Api.Badges.addBadge(badge);
//     //         tooltips.push(!badge.description ? `PB${index}` : badge.description);
//     //     });

//     //     PluginLogger.info(`${"\"" + tooltips.join("\", \"") + "\""} badge(s) successfully registered.`);
//     // } catch (error) {
//     //     PluginLogger.error(error);
//     //     PluginLogger.warn("Could not successfully register badge(s).");
//     // }
// }