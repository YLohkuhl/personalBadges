/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { DATA_DIR } from '@main/utils/constants';

import { readFile, readdir } from 'fs/promises';
import { extname, join } from 'path';

import { IPersonalBadge } from '../types';


export const BADGE_DATA_DIR = join(DATA_DIR, "badges")


export async function getBadgeDataDir(): Promise<string> {
    return BADGE_DATA_DIR;
}

export async function fetchBadgeData(): Promise<IPersonalBadge[][]> {
    const dir = await readdir(BADGE_DATA_DIR);

    const files = await Promise.all(dir
        .filter((filename) => extname(filename) === '.json')
        .map((filename) => join(BADGE_DATA_DIR, filename))
    );

    const data: IPersonalBadge[][] = await Promise.all(files.map(async (filePath) => 
        JSON.parse(await readFile(filePath, 'utf-8')) as IPersonalBadge[]
    ));

    return data;
}