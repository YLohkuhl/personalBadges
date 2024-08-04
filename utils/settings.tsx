/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";
import { showItemInFolder } from "@utils/native";
import { Button, Forms } from "@webpack/common";

import { Native } from "..";
import { re_registerBadges } from "./badges/registry";


export const pluginSettings = definePluginSettings({
    pluginButtons: {
        type: OptionType.COMPONENT,
        description: "PersonalBadges Buttons",
        component: () => {
            return (
                <Forms.FormSection>
                    {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Button style={{ marginRight: "10px" }} 
                            onClick={async () => showItemInFolder(await Native.getBadgesDataDir())}
                        >
                            Locate Badges Folder
                        </Button>
                        <Button style={{ marginRight: "10px" }} color={Button.Colors.GREEN} 
                            onClick={async () => await re_registerBadges()}
                        >
                            Refresh Badges
                        </Button>
                        <Button 
                            color={Button.Colors.PRIMARY} 
                            onClick={async () => await VencordNative.native.openExternal("https://github.com/YLohkuhl/personalBadges?tab=readme-ov-file#usage")}
                        >
                            How To Use
                        </Button>
                    </div> */}
                </Forms.FormSection>
            )
        }
    }
});
