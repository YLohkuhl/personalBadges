/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { User } from "discord-types/general";
import { Menu, Flex } from "@webpack/common";
import { addContextMenuPatch, NavContextMenuPatchCallback } from "@api/ContextMenu";

import { BadgeHandler } from "../badge/data";
import { PluginLogger } from "../../utils/constants";

import * as bUtil from '../badge';


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

                {Array.from(BadgeHandler.getCache().entries()).map((value, index) => {
                    const id = `pb-mb-eb-badge-${index}`
                    const badge = value[1][0];

                    return (
                        <Menu.MenuItem
                            id={id}
                            key={id}
                            label={ 
                                <Flex style={{ alignItems: "center", gap: "0.5em" }}>
                                    <img 
                                        style={bUtil.defineStyleProps(badge.squircle)} 
                                        src={bUtil.defineImage(badge.image)} 
                                        height={32} 
                                        width={32}
                                    />
                                    {badge.tooltip}
                                </Flex>
                            }
                            action={async () => {
                                if (await bUtil.excludeBadge(user, badge.id))
                                    PluginLogger.log(`User ${user.id} was excluded from \"${badge.tooltip}\" (${badge.id}) via context menu.`);
                            }}
                        />
                    )
                })}

            </Menu.MenuItem>

            <Menu.MenuItem
                id="pb-mb-include-badge"
                key="pb-mb-include-badge"
                label="Include Badge"
            >
                
                {Array.from(BadgeHandler.getCache().entries()).map((value, index) => {
                    const id = `pb-mb-ib-badge-${index}`
                    const badge = value[1][0];

                    return (
                        <Menu.MenuItem
                            id={id}
                            key={id}
                            label={ 
                                <Flex style={{ alignItems: "center", gap: "0.5em" }}>
                                    <img 
                                        style={bUtil.defineStyleProps(badge.squircle)} 
                                        src={bUtil.defineImage(badge.image)} 
                                        height={32} 
                                        width={32}
                                    />
                                    {badge.tooltip}
                                </Flex>
                            }
                            action={async () => {
                                if (await bUtil.includeBadge(user, badge.id))
                                    PluginLogger.log(`User ${user.id} was included in \"${badge.tooltip}\" (${badge.id}) via context menu.`);
                            }}
                        />
                    )
                })}

            </Menu.MenuItem>

        </Menu.MenuGroup>
    );

    children.push(<Menu.MenuSeparator/>, menuElements);
};
