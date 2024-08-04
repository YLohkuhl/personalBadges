/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

export const Native = VencordNative.pluginHelpers.PersonalBadges as PluginNative<typeof import("./native")>;


import definePlugin, { PluginNative } from "@utils/types";

import { pluginSettings } from "./utils/settings";
import { addContextMenuPatch } from "@api/ContextMenu";
import { de_registerBadges, re_registerBadges, registerBadges } from "./utils/badges/registry";
import { userContextMenuPatch_manageBadges } from "./utils/menus";
import { showItemInFolder } from "@utils/native";
import { openBadgeCreationModal } from "./components/modals/BadgeCreationModal";


export default definePlugin({
    name: "PersonalBadges",
    description: "Create profile badges that are exclusively visible to you through JSON.",
    authors: [{
        name: "YLohkuhl",
        id: 1204700402235478078n
    }],
    settings: pluginSettings,

    toolboxActions: {
        "Refresh Badges": async () => await re_registerBadges(),
        "Locate Folder": async () => await showItemInFolder(await Native.getBadgesDataDir()),
        "View Modal": async () => openBadgeCreationModal()
    },

    async start()
    {
        await Native.initBadgeDataDir();
        await registerBadges();
        
        addContextMenuPatch("user-context", userContextMenuPatch_manageBadges)
    },
    stop()
    {
        de_registerBadges();
    }
});
