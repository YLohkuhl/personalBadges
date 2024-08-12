/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { BadgePosition, ProfileBadge } from '@api/Badges';

import { DEFAULT_BADGE_URL, GITHUB_URL } from '../constants';
import { IPersonalBadge } from '../../types';


export function isExcluded(userId: string, badge: IPersonalBadge): boolean { 
    return badge.excluded?.includes(userId) ? false : true; 
}

export function defineImage(image: string | undefined): string {
    return !image ? DEFAULT_BADGE_URL : image;
}

export function definePosition(position: string | undefined): BadgePosition {
    const upper = position?.toUpperCase();
    return upper === "START" ? BadgePosition.START : (upper === "END" ? BadgePosition.END : BadgePosition.START);
}

export function defineInclusion(userId: string, guildId: string, badge: IPersonalBadge): boolean {
    let excluded = isExcluded(userId, badge);
    return badge.global ? excluded : (badge.guilds?.includes(guildId) ? excluded : (badge.users?.includes(userId) ? excluded : false));
}

export function defineStyleProps(squircle: boolean) {
    return {
        borderRadius: squircle ? "30%" : "50%",
        transform: "scale(0.9)"
    }
}

export function iPersonalToProfile(i: IPersonalBadge): ProfileBadge {
    return {
        image: defineImage(i.image),
        description: i.tooltip,
        position: definePosition(i.position),
        link: i.link || GITHUB_URL,
        shouldShow: ({ userId, guildId }) => defineInclusion(userId, guildId, i),
        props: { style: defineStyleProps(i.squircle) }
    }
}


export * from './manage';
