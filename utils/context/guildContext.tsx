/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { Guild } from "discord-types/general";
import { Menu, Flex } from "@webpack/common";
import { addContextMenuPatch, NavContextMenuPatchCallback } from "@api/ContextMenu";

import { BadgeHandler } from "../badge/data";
import { PluginLogger } from "../../utils/constants";

import * as bUtil from '../badge';


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

                {Array.from(BadgeHandler.getCache().entries()).map((value, index) => {
                    const id = `pb-mgb-eb-badge-${index}`
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
                                if (await bUtil.excludeGuildBadge(guild, badge.id))
                                    PluginLogger.log(`\"${badge.tooltip}\" (${badge.id}) was excluded from Guild ${guild.id} via context menu.`);
                            }}
                        />
                    )
                })}

            </Menu.MenuItem>

            <Menu.MenuItem
                id="pb-mgb-include-badge"
                key="pb-mgb-include-badge"
                label="Include Badge"
            >
                
                {Array.from(BadgeHandler.getCache().entries()).map((value, index) => {
                    const id = `pb-mgb-ib-badge-${index}`
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
                                if (await bUtil.includeGuildBadge(guild, badge.id))
                                    PluginLogger.log(`\"${badge.tooltip}\" (${badge.id}) was included in Guild ${guild.id} via context menu.`);
                            }}
                        />
                    )
                })}

            </Menu.MenuItem>

        </Menu.MenuGroup>
    );

    children.push(<Menu.MenuSeparator/>, menuElements);
};
