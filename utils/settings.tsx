/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import '../styles.css';

import { Margins } from '@utils/margins';
import { openModal } from '@utils/modal';
import { OptionType } from "@utils/types";
import { Button, Forms } from "@webpack/common";
import { definePluginSettings } from "@api/Settings";

import { cl } from '..';
import { GITHUB_URL } from './constants';
import { BadgeHandler } from './badge/data';
import { BadgeModal } from '../components/modals/BadgeModal';


export const pluginSettings = definePluginSettings({
    pluginButtons: {
        type: OptionType.COMPONENT,
        description: "Plugin Buttons",
        component: () => {
            return (
                <Forms.FormSection>
                    <Forms.FormText className={Margins.bottom16} type={Forms.FormText.Types.DESCRIPTION}>
                        99% of the time you won't <i>need</i> to use this. All changes should be automatically applied without reinitializing the cache. 
                        It is most useful with problems that could utilize it!
                    </Forms.FormText>

                    <div className={cl('button-grid')}>
                        <Button 
                            look={Button.Looks.OUTLINED}
                            color={Button.Colors.PRIMARY}
                            onClick={async () => await BadgeHandler.re_init()}
                        >
                            Reinitialize Cache
                        </Button>

                        <Button 
                            onClick={() => openModal(props => <BadgeModal { ...props } />)}
                        >
                            Open Badge Modal
                        </Button>

                        <Button 
                            look={Button.Looks.OUTLINED}
                            color={Button.Colors.PRIMARY} 
                            onClick={async () => await VencordNative.native.openExternal(GITHUB_URL)}
                        >
                            GitHub
                        </Button>
                    </div>

                    <Forms.FormText className={Margins.top16} type={Forms.FormText.Types.DESCRIPTION}>
                        You can also enable the <code>VencordToolbox</code> plugin to have much quicker access to the badge modal!
                    </Forms.FormText>
                </Forms.FormSection>
            )
        }
    }
});
