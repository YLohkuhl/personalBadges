/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { createStore } from "@api/DataStore";
import { DataStore } from "@api/index";

import { IPersonalBadge } from "../../../types";
import { PluginLogger } from "../../constants";


export const BadgeStore: any = createStore("PersonalBadgeData", "PersonalBadgeStore");


export async function createBID(): Promise<string | undefined> {
    const random = Math.random().toString(36).substring(1, 9);
    const bid = `p_badge_${random}`;

    let bool = (await Promise.all(await DataStore.keys())).some(x => x === bid);
    if (bool) return undefined;

    return bid;
}

export async function update(id: string, value: IPersonalBadge): Promise<boolean> {
    try {
        await DataStore.update(id, () => value, BadgeStore);
        return true;
    } catch (error) {
        PluginLogger.error(error);
        return false;
    }
}

export async function deregister(id: string): Promise<boolean> {
    try {
        await DataStore.del(id, BadgeStore);
        return true;
    } catch (error) {
        PluginLogger.error(error);
        return false;
    }
}

export async function register(value: IPersonalBadge): Promise<boolean> {
    try {
        const bid = await createBID();
        if (!bid) return false;

        value.id = bid;
        await DataStore.set(value.id, value, BadgeStore);
        return true;
    } catch (error) {
        PluginLogger.error(error);
        return false;
    }
}

export async function registered(): Promise<Record<string, IPersonalBadge>> {
    try {
        const data = await DataStore.entries(BadgeStore);
        const badges: Record<string, IPersonalBadge> = {};

        data.forEach((data) => badges[data[0].toString()] = data[1]);
        return badges;
    } catch (error) {
        PluginLogger.error(error);
        return {};
    }
}