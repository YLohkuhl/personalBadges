/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

export interface IPersonalBadge {
    image?: string,
    tooltip?: string,
    position?: string,
    link?: string,
    users: string[],
    global: boolean,
    excluded?: string[]
}