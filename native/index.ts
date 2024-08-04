/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { mkdir } from 'fs/promises';

import * as data from './data';
import * as util from './util';

export * from './data';
export * from './util';


export async function initBadgeDataDir() {
    if (!await util.canAccessPath(null, await data.getBadgesDataDir()))
        mkdir(await data.getBadgesDataDir())
}
