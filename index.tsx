/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import definePlugin from "@utils/types";
import { classNameFactory } from "@api/Styles";

import { pluginSettings } from "./utils/settings";
import { BadgeHandler, CategoryHandler } from "./utils/badge/data";
import { patchGuildContext, patchUserContext } from "./components/context";
import { DEFAULT_BADGE_CATEGORY, PluginLogger } from "./utils/constants";
import { openModal } from "@utils/modal";
import { BadgeModal } from "./components/modals/badge/CreateBadgeModal";



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
    
    // patches: [
    //     {
    //         find: "toolbar:function",
    //         replacement: {
    //             match: /(function \i\(\i\){)(.{1,200}toolbar.{1,100}mobileToolbar)/,
    //             replace: "$1$self.ApplyButtonToToolbar(arguments[0]);$2"
    //         }
    //     },
    // ],

    toolboxActions: {
        "Refresh Badges": async () => await BadgeHandler.re_init(),
        "Open Modal": () => openModal(props => <BadgeModal props={props} />)
    },

    async start()
    {
        await BadgeHandler.init();
        await CategoryHandler.register({id: "", name: DEFAULT_BADGE_CATEGORY, badges: []});


        PluginLogger.log(BadgeHandler.getCache());

        patchUserContext();
        patchGuildContext();
    },
    stop()
    {
        BadgeHandler.de_init();
    },

    // ApplyButtonToToolbar: ApplyButtonToToolbar
});
