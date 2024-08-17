/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import "../modal.css";
import "../../../styles.css";

import { Margins } from "@utils/margins";
import { ModalContent, ModalFooter, ModalHeader, ModalProps, ModalRoot, ModalSize } from "@utils/modal";
import { Button, Forms, Select, showToast, Text, TextInput, Toasts, useState } from "@webpack/common";
import { Link } from "@components/Link";
import { identity } from "@utils/misc";

import { cl } from "../../..";

import { BadgeHandler } from "../../../utils/badge/data";
import { somethingWentWrong } from "../../../utils/misc";
import { DEFAULT_BADGE_URL, GITHUB_URL } from "../../../utils/constants";


export function CreateBadgeModal(props: ModalProps) {
    const [image, setImage] = useState<string | undefined>();
    const [tooltip, setTooltip] = useState<string | undefined>();
    const [link, setLink] = useState<string | undefined>();

    let position: string = "Start";
    let squircle: boolean = false;
    let global: boolean = false;
    
    return <ModalRoot {...props} size={ModalSize.LARGE}>
        <ModalHeader className={cl('modal-header')}>
            <Text
                color="header-primary"
                variant="heading-lg/semibold"
                tag="h1"
            >
                Create Badge
            </Text>
        </ModalHeader>

        <ModalContent>
            <div className={cl('modal-form')}>
                
                <Forms.FormSection title="Image">
                    <TextInput
                        placeholder="i.imgur.com/.png"
                        onChange={(v) => setImage(v)}
                    />
                    <Forms.FormText className={Margins.top8} type={Forms.FormText.Types.DESCRIPTION}>
                        The icon for the badge. Make sure it's a direct link to the image!<br/>
                        <code>Default: <Link href={DEFAULT_BADGE_URL}>Icon</Link></code>
                    </Forms.FormText>
                </Forms.FormSection>

                <Forms.FormSection title="Tooltip">
                    <TextInput
                        placeholder="You're so ✨ Sparkly ✨"
                        onChange={(v) => setTooltip(v)}
                    />
                    <Forms.FormText className={Margins.top8} type={Forms.FormText.Types.DESCRIPTION}>
                        The text that appears when you hover over the badge.<br/>
                        <code>Default: None</code>
                    </Forms.FormText>
                </Forms.FormSection>

                <Forms.FormSection title="Link">
                    <TextInput
                        placeholder="https://..."
                        onChange={(v) => setLink(v)}
                    />
                    <Forms.FormText className={Margins.top8} type={Forms.FormText.Types.DESCRIPTION}>
                        The link to open when you click on the badge.<br/>
                        <code>Default: <Link href={GITHUB_URL}>GitHub</Link></code>
                    </Forms.FormText>
                </Forms.FormSection>

            </div>

            <Forms.FormDivider className={cl('form-divider')}/>

            <div className={cl('modal-form')}>

                <Forms.FormSection title="Position">
                    <Select
                        placeholder="Start"
                        options={
                            [
                                {label: "Start", value: "Start"},
                                {label: "End", value: "End"}
                            ]
                        }
                        select={(v) => position = v}
                        isSelected={(v) => position === v}
                        serialize={identity}
                    />
                    <Forms.FormText className={Margins.top8} type={Forms.FormText.Types.DESCRIPTION}>
                        This will position the badge closer to the end or start of your badges.<br/>
                        <code>Default: Start</code>
                    </Forms.FormText>
                </Forms.FormSection>

                <Forms.FormSection title="Is Squircle">
                    <Select
                        placeholder="False"
                        options={
                            [
                                {label: "True", value: true},
                                {label: "False", value: false}
                            ]
                        }
                        select={(v) => squircle = v}
                        isSelected={(v) => squircle === v}
                        serialize={identity}
                    />
                    <Forms.FormText className={Margins.top8} type={Forms.FormText.Types.DESCRIPTION}>
                        If <code>True</code>, this badge will instead appear as a rounded square rather than a circle.<br/>
                        <code>Default: False</code>
                    </Forms.FormText>
                </Forms.FormSection>

                <Forms.FormSection title="Is Global">
                    <Select
                        placeholder="False"
                        options={
                            [
                                {label: "True", value: true},
                                {label: "False", value: false}
                            ]
                        }
                        select={(v) => global = v}
                        isSelected={(v) => global === v}
                        serialize={identity}
                    />
                    <Forms.FormText className={Margins.top8} type={Forms.FormText.Types.DESCRIPTION}>
                        If <code>True</code>, this badge will be applied to every user that you view.<br/>
                        <code>Default: False</code>
                    </Forms.FormText>
                </Forms.FormSection>

            </div>
        </ModalContent>
        <ModalFooter className={cl('modal-footer')}>
            <Button 
                onClick={async () => {
                    const object = {
                        id: "",
                        
                        image: image,
                        tooltip: tooltip,
                        position: position,
                        link: link,
                        squircle: squircle,
                        
                        global: global
                    };

                    if (await BadgeHandler.register(object)) {
                        showToast(`Successful! Right click on users / or servers to manage badges.`, Toasts.Type.SUCCESS);
                        props.onClose();
                    } else somethingWentWrong();
                }}
            >
                Create
            </Button>
            <Button look={Button.Looks.LINK} color={Button.Colors.PRIMARY} onClick={props.onClose}>
                Cancel
            </Button>
        </ModalFooter>
    </ModalRoot>
}
