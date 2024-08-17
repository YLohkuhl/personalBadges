/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { User } from "discord-types/general";
import { Menu } from "@webpack/common";
import { addContextMenuPatch, NavContextMenuPatchCallback } from "@api/ContextMenu";

import { BadgeHandler } from "../../utils/badge/data";
import { IPBadgeCategory, IPersonalBadge } from "../../types";
import { BadgeMenuItemLabel, CategoryElement } from ".";
import { DEFAULT_BADGE_CATEGORY, PluginLogger } from "../../utils/constants";

import * as bUtil from '../../utils/badge';
import { BadgeModal } from "../modals/badge/CreateBadgeModal";
import { openModal } from "@utils/modal";


export const patchUserContext = () => {
    addContextMenuPatch('user-context', userContextMenuPatch_manageBadges);
}


const userContextMenuPatch_manageBadges: NavContextMenuPatchCallback = (children, { user }: { user: User; }) => {
    if (user?.id == null) return;

    const menuElements = (
        <Menu.MenuGroup
            label="Manage Badges"
        >

            <Menu.MenuItem
                id="pb-mb-exclude-badge"
                key="pb-mb-exclude-badge"
                label="Exclude Badge"
            >

                {CategoryElement("pb-mb-eb-create-category", undefined)}

                <Menu.MenuSeparator/>

                {Array.from(BadgeHandler.getCache().entries()).map((value, cIndex) => {
                    if (value[1].name === DEFAULT_BADGE_CATEGORY)
                        return (<></>);

                    const id = `pb-mb-eb-category-${cIndex}`;
                    const category = value[1];

                    return (
                        <Menu.MenuItem
                            id={id}
                            key={id}
                            label={category.name}
                        >
                            {CategoryElement(`pb-mb-eb-edit-category-${cIndex}`, category.id)}

                            <Menu.MenuSeparator/>

                            {category.badges.map((value, bIndex) => {
                                const id = `pb-mb-eb-c${cIndex}-badge-${bIndex}`
                                const badge = value;

                                return (
                                    <Menu.MenuItem
                                        id={id}
                                        key={id}
                                        label={BadgeMenuItemLabel(badge)}
                                        action={async () => await excludeBadge(user, category, badge)}
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
                                const id = `pb-mb-eb-unassigned-badge-${bIndex}`
                                const badge = value;

                                return (
                                    <Menu.MenuItem
                                        id={id}
                                        key={id}
                                        label={BadgeMenuItemLabel(badge)}
                                        action={async () => await excludeBadge(user, category, badge)}
                                    />
                                )
                            })}
                        </>
                    )
                })}

            </Menu.MenuItem>


            <Menu.MenuItem
                id="pb-mb-include-badge"
                key="pb-mb-include-badge"
                label="Include Badge"
            >

                {CategoryElement("pb-mb-ib-create-category", undefined)}

                <Menu.MenuSeparator/>
                
                {Array.from(BadgeHandler.getCache().entries()).map((value, cIndex) => {
                    if (value[1].name === DEFAULT_BADGE_CATEGORY)
                        return (<></>);

                    const id = `pb-mb-ib-category-${cIndex}`;
                    const category = value[1];

                    return (
                        <Menu.MenuItem
                            id={id}
                            key={id}
                            label={category.name}
                        >
                            {CategoryElement(`pb-mb-ib-edit-category-${cIndex}`, category.id)}

                            <Menu.MenuSeparator/>

                            {category.badges.map((value, bIndex) => {
                                const id = `pb-mb-ib-c${cIndex}-badge-${bIndex}`
                                const badge = value;

                                return (
                                    <Menu.MenuItem
                                        id={id}
                                        key={id}
                                        label={BadgeMenuItemLabel(badge)}
                                        action={async () => await includeBadge(user, category, badge)}
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
                                const id = `pb-mb-eb-unassigned-badge-${bIndex}`
                                const badge = value;

                                return (
                                    <Menu.MenuItem
                                        id={id}
                                        key={id}
                                        label={BadgeMenuItemLabel(badge)}
                                        action={async () => await includeBadge(user, category, badge)}
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


async function excludeBadge(user: User, category: IPBadgeCategory, badge: IPersonalBadge) {
    if (await bUtil.excludeBadge(user, category.id, badge.id))
        PluginLogger.info(`User ${user.id} was excluded from \"${badge.tooltip}\" (${badge.id}) via context menu.`);
}

async function includeBadge(user: User, category: IPBadgeCategory, badge: IPersonalBadge) {
    if (await bUtil.includeBadge(user, category.id, badge.id))
        PluginLogger.info(`User ${user.id} was included in \"${badge.tooltip}\" (${badge.id}) via context menu.`);
}