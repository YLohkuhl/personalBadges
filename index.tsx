/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import definePlugin from "@utils/types";
import { openModal } from "@utils/modal";
import { classNameFactory } from "@api/Styles";

import { pluginSettings } from "./utils/settings";
import { BadgeModal } from "./components/modals/BadgeModal";
import { BadgeHandler, CategoryHandler } from "./utils/badge/data";
import { addPatchContext_manageBadges, removePatchContext_manageBadges } from "./components/context";
import { DEFAULT_BADGE_CATEGORY, DEFAULT_BADGE_CATEGORY_URL } from "./utils/constants";


export const cl = classNameFactory("pb-");


export default definePlugin({
    name: "PersonalBadges",
    description: "Create profile badges that are exclusively visible to you through locally stored data.",
    authors: [{
        name: "YLohkuhl",
        id: 1204700402235478078n
    }],
    dependencies: ["BadgeAPI"],
    settings: pluginSettings,

    toolboxActions: {
        "Reinitialize Cache": async () => await BadgeHandler.re_init(),
        "Open Badge Modal": () => openModal(props => <BadgeModal { ...props } />)
    },

    async start()
    {
        await BadgeHandler.init();
        await CategoryHandler.register({id: "", name: DEFAULT_BADGE_CATEGORY, icon: DEFAULT_BADGE_CATEGORY_URL, badges: []});

        addPatchContext_manageBadges();
    },
    stop()
    {
        removePatchContext_manageBadges();

        BadgeHandler.de_init();
    }
});
