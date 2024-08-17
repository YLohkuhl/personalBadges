/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { createStore } from "@api/DataStore";
import { DataStore } from "@api/index";

import { IPBadgeCategory, IPersonalBadge } from "../../../types";
import { PluginLogger } from "../../constants";


export const BadgeStore: any = createStore("PersonalBadgeData", "PersonalBadgeStore");


export async function registered(): Promise<Record<string, IPBadgeCategory>> {
    try {
        const data = await DataStore.entries(BadgeStore);
        const badges: Record<string, IPBadgeCategory> = {};

        data.forEach((data) => badges[data[0].toString()] = data[1]);
        return badges;
    } catch (error) {
        PluginLogger.error(error);
        return {};
    }
}


export async function createCID(name: string): Promise<string | undefined> {
    try {
        let entries: [IDBValidKey, IPBadgeCategory][] = (await DataStore.entries(BadgeStore));
        if (!entries) entries = [];

        const random = Math.random().toString(36).substring(2, 9);
        const c_id = `${entries.length}.pb_category.${random}`;

        let predicate = (await Promise.all(entries)).some(x => x[0] === c_id || x[1].name === name);
        if (predicate) return undefined;

        return c_id;
    } catch (error) {
        PluginLogger.error(error);
        return undefined;
    }
}

export async function deregisterCategory(c_id: string): Promise<boolean> {
    try {
        const category: IPBadgeCategory | undefined = await DataStore.get(c_id, BadgeStore);
        if (!category) return false;

        await DataStore.del(c_id, BadgeStore);
        return true;
    } catch (error) {
        PluginLogger.error(error);
        return false;
    }
}

export async function updateCategory(value: IPBadgeCategory): Promise<boolean> {
    try {
        if (!value.name) return false;

        const category: IPBadgeCategory | undefined = await DataStore.get(value.id, BadgeStore);
        if (!category) return false;

        category.name = value.name;
        await DataStore.set(category.id, category, BadgeStore)
        return true;
    } catch (error) {
        PluginLogger.error(error);
        return false;
    }
}

export async function registerCategory(value: IPBadgeCategory): Promise<boolean> {
    try {
        if (!value.name) return false;

        const c_id = await createCID(value.name);
        if (!c_id) return false;

        value.id = c_id;
        if (!value.badges) value.badges = [];

        await DataStore.set(c_id, value, BadgeStore)
        return true;
    } catch (error) {
        PluginLogger.error(error);
        return false;
    }
}


export async function createBID(c_id: string): Promise<string | undefined> {
    try {
        const category: IPBadgeCategory | undefined = await DataStore.get(c_id, BadgeStore);
        if (!category) return undefined;
        if (!category.badges) category.badges = [];

        const random = Math.random().toString(36).substring(2, 9);
        const b_id = `${category.badges.length}.p_badge.${random}`;

        let predicate = (await Promise.all(category.badges)).some(x => x.id === b_id);
        if (predicate) return undefined;

        return b_id;
    } catch (error) {
        PluginLogger.error(error);
        return undefined;
    }
}

export async function deregisterBadge(c_id: string, b_id: string): Promise<boolean> {
    try {
        const category: IPBadgeCategory | undefined = await DataStore.get(c_id, BadgeStore);
        if (!category) return false;
        
        let badge = category.badges.find(x => x.id === b_id);
        if (!badge) return false;

        category.badges.splice(category.badges.indexOf(badge), 1);
        await DataStore.update(c_id, () => category, BadgeStore);
        return true;
    } catch (error) {
        PluginLogger.error(error);
        return false;
    }
}

export async function updateBadge(c_id: string, value: IPersonalBadge): Promise<boolean> {
    try {
        const category: IPBadgeCategory | undefined = await DataStore.get(c_id, BadgeStore);
        if (!category) return false;

        PluginLogger.log(category);

        let old: IPBadgeCategory | undefined = await DataStore.get(value.c_id, BadgeStore);
        if (!old) return false;

        let badge = c_id !== value.c_id ? old.badges.find(x => x.id === value.id) : category.badges.find(x => x.id === value.id);
        if (!badge) return false;

        if (c_id !== value.c_id) {
            old.badges.splice(old.badges.indexOf(badge), 1);
            await DataStore.update(value.c_id, () => old, BadgeStore);
        } else category.badges.splice(category.badges.indexOf(badge), 1);

        value.c_id = category.id;
        let {profileBadge: _, ...noProfBadge} = value;
        category.badges.push(noProfBadge);

        await DataStore.update(c_id, () => category, BadgeStore);
        return true;
    } catch (error) {
        PluginLogger.error(error);
        return false;
    }
}

export async function registerBadge(c_id: string, value: IPersonalBadge): Promise<boolean> {
    try {
        const b_id = await createBID(c_id);
        if (!b_id) return false;

        const category: IPBadgeCategory | undefined = await DataStore.get(c_id, BadgeStore);
        if (!category) return false;

        value.id = b_id;
        value.c_id = category.id;
        let {profileBadge: _, ...noProfBadge} = value;
        category.badges.push(noProfBadge);

        await DataStore.set(c_id, category, BadgeStore);
        return true;
    } catch (error) {
        PluginLogger.error(error);
        return false;
    }
}
