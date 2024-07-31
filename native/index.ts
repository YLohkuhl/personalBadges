/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { access, mkdir } from 'fs/promises';

import { BADGE_DATA_DIR, fetchBadgeData } from './data';


async function pathExists(path: string) {
    try {
        await access(path);
        return true;
    } catch (error) {
        return false;
    }
}

export async function initDataDir() {
    if (!await pathExists(BADGE_DATA_DIR))
        mkdir(BADGE_DATA_DIR)
}

export { fetchBadgeData };