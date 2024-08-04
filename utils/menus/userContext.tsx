/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { NavContextMenuPatchCallback } from "@api/ContextMenu";
import { Flex, Menu } from "@webpack/common";
import { User } from "discord-types/general";

import { Native } from "../..";
import { getBadgeRegistry } from "../badges/registry";
import { PluginLogger } from "../constants";
import { IPersonalBadge } from "../../types";
import * as alert from '../alerts';


export const userContextMenuPatch_manageBadges: NavContextMenuPatchCallback = (children, { user }: { user: User; }) => {
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

                {Object.values(getBadgeRegistry()[0]).map((badge, index) => {
                    const id = `pb-mb-eb-badge-${index}`
                    return (
                        <Menu.MenuItem
                            id={id}
                            key={id}
                            label={ 
                                <Flex style={{ alignItems: "center", gap: "0.5em" }}>
                                    <img 
                                        style={{ 
                                            borderRadius: "50%"
                                        }} 
                                        src={badge.image} 
                                        height={32} 
                                        width={32}
                                    />
                                    {badge.tooltip}
                                </Flex>
                            }
                            action={async () => {
                                if (await manageAction_excludeBadge(user, badge))
                                    PluginLogger.log(`User ${user.id} was excluded from "${badge.tooltip}" badge via context menu.`);
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
                
                {Object.values(getBadgeRegistry()[0]).map((badge, index) => {
                    const id = `pb-mb-ib-badge-${index}`
                    return (
                        <Menu.MenuItem
                            id={id}
                            key={id}
                            label={ 
                                <Flex style={{ alignItems: "center", gap: "0.5em" }}>
                                    <img 
                                        style={{ 
                                            borderRadius: "50%"
                                        }} 
                                        src={badge.image} 
                                        height={32} 
                                        width={32}
                                    />
                                    {badge.tooltip}
                                </Flex>
                            }
                            action={async () => {
                                if (await manageAction_includeBadge(user, badge))
                                    PluginLogger.log(`User ${user.id} was included in "${badge.tooltip}" badge via context menu.`);
                            }}
                        />
                    )
                })}

            </Menu.MenuItem>

        </Menu.MenuGroup>
    );

    children.push(<Menu.MenuSeparator/>, menuElements);
};


async function manageAction_excludeBadge(user: User, badge: IPersonalBadge): Promise<boolean> {
    try {

        if (!await Native.canAccessPath(badge.path)) {
            alert.badgeAlert_nonExistent(badge);
            return false;
        }

        let isIncluded: boolean = false;
        
        if (badge.users?.includes(user.id)) {
            badge.users.splice(badge.users.indexOf(user.id), 1);
            isIncluded = true;
        }

        if (!badge.excluded)
            badge.excluded = [user.id];
        
        else if (!badge.excluded.includes(user.id))
            badge.excluded.push(user.id);

        else if (!isIncluded) {
            alert.badgeAlert_isExcluded();
            return false;
        }

        await Native.modifyBadgeData(badge.path, badge);
        return true;
    } catch (error) {
        PluginLogger.error(error);
        return false;
    }
}

async function manageAction_includeBadge(user: User, badge: IPersonalBadge): Promise<boolean> {
    try {

        if (!await Native.canAccessPath(badge.path)) {
            alert.badgeAlert_nonExistent(badge);
            return false;
        }

        let isExcluded: boolean = false;

        if (badge.excluded?.includes(user.id)) {
            badge.excluded.splice(badge.excluded.indexOf(user.id), 1);
            isExcluded = true;
        }

        if (badge.global) {
            if (isExcluded) {
                await Native.modifyBadgeData(badge.path, badge);
                return true;
            } else alert.badgeAlert_isGlobal();

            return false;
        }

        if (!badge.users)
            badge.users = [user.id];
        
        else if (!badge.users.includes(user.id))
            badge.users.push(user.id);

        else if (!isExcluded) {
            alert.badgeAlert_isIncluded();
            return false;
        }

        await Native.modifyBadgeData(badge.path, badge);
        return true;
    } catch (error) {
        PluginLogger.error(error);
        return false;
    }
}