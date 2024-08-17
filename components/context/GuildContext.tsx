/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { Guild } from "discord-types/general";
import { Menu, Flex } from "@webpack/common";
import { addContextMenuPatch, NavContextMenuPatchCallback } from "@api/ContextMenu";

import { BadgeHandler } from "../../utils/badge/data";
import { DEFAULT_BADGE_CATEGORY, PluginLogger } from "../../utils/constants";

import * as bUtil from '../../utils/badge';
import { BadgeMenuItemLabel, CategoryElement } from ".";
import { IPBadgeCategory, IPersonalBadge } from "userplugins/personalBadges/types";


export const patchGuildContext = () => {
    addContextMenuPatch('guild-context', guildContextMenuPatch_manageBadges);
}

export const guildContextMenuPatch_manageBadges: NavContextMenuPatchCallback = (children, { guild }: { guild: Guild; }) => {
    if (guild?.id == null) return;

    const menuElements = (
        <Menu.MenuGroup
            label="Manage Guild Badges"
        >

            <Menu.MenuItem
                id="pb-mgb-exclude-badge"
                key="pb-mgb-exclude-badge"
                label="Exclude Badge"
            >

                {CategoryElement("pb-mgb-eb-create-category", undefined)}

                <Menu.MenuSeparator/>

                {Array.from(BadgeHandler.getCache().entries()).map((value, cIndex) => {
                    if (value[1].name === DEFAULT_BADGE_CATEGORY)
                        return (<></>);

                    const id = `pb-mgb-eb-category-${cIndex}`;
                    const category = value[1];

                    return (
                        <Menu.MenuItem
                            id={id}
                            key={id}
                            label={category.name}
                        >
                            {CategoryElement(`pb-mgb-eb-edit-category-${cIndex}`, category.id)}

                            <Menu.MenuSeparator/>

                            {category.badges.map((value, bIndex) => {
                                const id = `pb-mgb-eb-c${cIndex}-badge-${bIndex}`
                                const badge = value;

                                return (
                                    <Menu.MenuItem
                                        id={id}
                                        key={id}
                                        label={BadgeMenuItemLabel(badge)}
                                        action={async () => await excludeGuildBadge(guild, category, badge)}
                                    />
                                )
                            })}
                        </Menu.MenuItem>
                    )
                })}

                <Menu.MenuSeparator />

                {Array.from(BadgeHandler.getCache().entries()).map((value) => {
                    if (value[1].name !== DEFAULT_BADGE_CATEGORY)
                        return (<></>);

                    const category = value[1];

                    return (
                        <>
                            {category.badges.map((value, bIndex) => {
                                const id = `pb-mgb-eb-unassigned-badge-${bIndex}`
                                const badge = value;

                                return (
                                    <Menu.MenuItem
                                        id={id}
                                        key={id}
                                        label={BadgeMenuItemLabel(badge)}
                                        action={async () => await excludeGuildBadge(guild, category, badge)}
                                    />
                                )
                            })}
                        </>
                    )
                })}

            </Menu.MenuItem>

            <Menu.MenuItem
                id="pb-mgb-include-badge"
                key="pb-mgb-include-badge"
                label="Include Badge"
            >

                {CategoryElement("pb-mgb-ib-create-category", undefined)}
                
                {Array.from(BadgeHandler.getCache().entries()).map((value, cIndex) => {
                    if (value[1].name === DEFAULT_BADGE_CATEGORY)
                        return (<></>);

                    const id = `pb-mgb-ib-category-${cIndex}`;
                    const category = value[1];

                    return (
                        <Menu.MenuItem
                            id={id}
                            key={id}
                            label={category.name}
                        >
                            {CategoryElement(`pb-mgb-ib-edit-category-${cIndex}`, category.id)}

                            <Menu.MenuSeparator/>

                            {category.badges.map((value, bIndex) => {
                                const id = `pb-mgb-ib-c${cIndex}-badge-${bIndex}`
                                const badge = value;

                                return (
                                    <Menu.MenuItem
                                        id={id}
                                        key={id}
                                        label={BadgeMenuItemLabel(badge)}
                                        action={async () => await includeGuildBadge(guild, category, badge)}
                                    />
                                )
                            })}
                        </Menu.MenuItem>
                    )
                })}

                <Menu.MenuSeparator />

                {Array.from(BadgeHandler.getCache().entries()).map((value) => {
                    if (value[1].name !== DEFAULT_BADGE_CATEGORY)
                        return (<></>);

                    const category = value[1];

                    return (
                        <>
                            {category.badges.map((value, bIndex) => {
                                const id = `pb-mgb-ib-unassigned-badge-${bIndex}`
                                const badge = value;

                                return (
                                    <Menu.MenuItem
                                        id={id}
                                        key={id}
                                        label={BadgeMenuItemLabel(badge)}
                                        action={async () => await excludeGuildBadge(guild, category, badge)}
                                    />
                                )
                            })}
                        </>
                    )
                })}

            </Menu.MenuItem>

        </Menu.MenuGroup>
    );

    children.push(<Menu.MenuSeparator/>, menuElements);
};


async function excludeGuildBadge(guild: Guild, category: IPBadgeCategory, badge: IPersonalBadge) {
    if (await bUtil.excludeGuildBadge(guild, category.id, badge.id))
        PluginLogger.info(`\"${badge.tooltip}\" (${badge.id}) was excluded from Guild ${guild.id} via context menu.`);
}

async function includeGuildBadge(guild: Guild, category: IPBadgeCategory, badge: IPersonalBadge) {
    if (await bUtil.includeGuildBadge(guild, category.id, badge.id))
        PluginLogger.info(`\"${badge.tooltip}\" (${badge.id}) was included in Guild ${guild.id} via context menu.`);
}