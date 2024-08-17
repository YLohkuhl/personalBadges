/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { ProfileBadge } from "@api/Badges"


export interface IPersonalBadge {
    id: string,
    c_id: string,

    image?: string,
    tooltip?: string,
    position?: string,
    link?: string,
    squircle: boolean,
    
    global: boolean,
    users?: string[],
    excluded?: string[],
    guilds?: string[]
    
    profileBadge?: ProfileBadge
    // path?: string
}

export interface IPBadgeCategory {
    id: string,
    name: string,

    badges: IPersonalBadge[]
}