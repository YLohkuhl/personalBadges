/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

export interface IPersonalBadge {
    id: string,

    image?: string,
    tooltip?: string,
    position?: string,
    link?: string,
    squircle: boolean,
    
    global: boolean,
    users?: string[],
    excluded?: string[],
    guilds?: string[]
    
    // path?: string
}