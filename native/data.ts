/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { IpcMainInvokeEvent } from 'electron';

import { DATA_DIR } from '@main/utils/constants';

import { readFile, readdir, writeFile } from 'fs/promises';
import { extname, join } from 'path';

import { IPersonalBadge } from '../types';
import * as util from './util';


export async function getBadgesDataDir(): Promise<string> {
    return join(DATA_DIR, "badges");
}

export async function fetchBadgesData(): Promise<[string[], IPersonalBadge[][]]> {
    const dir = await readdir(await getBadgesDataDir());

    const files = await Promise.all(dir
        .filter((filename) => extname(filename) === '.json')
        .map(async (filename) => join(await getBadgesDataDir(), filename))
    );

    const data: IPersonalBadge[][] = await Promise.all(files.map(async (filePath) => 
        JSON.parse(await readFile(filePath, 'utf-8')) as IPersonalBadge[]
    ));

    return [files, data];
}

export async function modifyBadgeData(_: IpcMainInvokeEvent, path: string | undefined, data: IPersonalBadge): Promise<boolean> {
    if (!path || !await util.canAccessPath(null, path)) return false;
    delete data.path;

    const json = JSON.parse(await readFile(path, 'utf-8')) as IPersonalBadge[];
    
    let index = json.findIndex(
        x => x === data || x.image === data.image || x.tooltip === data.tooltip
    );
    index !== -1 ? json[index] = data : json.push(data);
    
    await writeFile(path, JSON.stringify(json, null, 4));
    return true;
}