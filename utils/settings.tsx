/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import '../styles.css';

import { definePluginSettings } from "@api/Settings";
import { Button, Forms } from "@webpack/common";
import { OptionType } from "@utils/types";

import { cl } from '..';
import { GITHUB_URL } from './constants';
import { BadgeHandler } from './badge/data';


export const pluginSettings = definePluginSettings({
    pluginButtons: {
        type: OptionType.COMPONENT,
        description: "PBButtons",
        component: () => {
            return (
                <Forms.FormSection>
                    <div className={cl('button-grid')}>

                        <Button onClick={async () => await BadgeHandler.re_init()}>
                            Refresh Badges
                        </Button>

                    </div>

                    <Forms.FormDivider className={cl('form-divider')}/>
                    <Forms.FormTitle className={cl('form-title')} tag="h2">Badges</Forms.FormTitle>
                    
                    <div className={cl('button-grid')}>
                        
                        <Button color={Button.Colors.GREEN}>
                            Create Badge
                        </Button>
                        <Button>
                            Modify Badge
                        </Button>
                        <Button color={Button.Colors.RED}>
                            Delete Badge
                        </Button>

                    </div>

                    <Forms.FormDivider className={cl('form-divider')}/>
                    <Forms.FormTitle className={cl('form-title')} tag="h2">Misc</Forms.FormTitle>

                    <div className={cl('button-grid')}>

                        <Button color={Button.Colors.PRIMARY} onClick={async () => await VencordNative.native.openExternal(GITHUB_URL)}>
                            GitHub
                        </Button>

                    </div>
                </Forms.FormSection>
            )
        }
    }
});
