import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";
import { showItemInFolder } from "@utils/native";
import { Button, Forms } from "@webpack/common";

import { Native, re_registerBadges } from "..";


export const pluginSettings = definePluginSettings({
    pluginButtons: {
        type: OptionType.COMPONENT,
        description: "PersonalBadges Buttons",
        component: () => {
            return (
                <Forms.FormSection>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Button style={{ marginRight: "10px" }} onClick={async () => showItemInFolder(await Native.getBadgeDataDir())}>
                            Locate Badges Folder
                        </Button>
                        <Button style={{ marginRight: "10px" }} color={Button.Colors.PRIMARY} onClick={async () => VencordNative.native.openExternal("https://github.com/YLohkuhl/personalBadges?tab=readme-ov-file#usage")}>
                            How to Use
                        </Button>
                        <Button color={Button.Colors.GREEN} onClick={async () => await re_registerBadges()}>
                            Update Badges
                        </Button>
                    </div>
                </Forms.FormSection>
            )
        }
    }
});