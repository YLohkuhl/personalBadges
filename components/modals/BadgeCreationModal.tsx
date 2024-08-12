/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import "./modal.css";
import "../../styles.css";

import { Margins } from "@utils/margins";
import { ModalContent, ModalFooter, ModalHeader, ModalProps, ModalRoot, ModalSize, openModal } from "@utils/modal";
import { Button, Forms, Select, Text, TextInput } from "@webpack/common";
import { Link } from "@components/Link";

import { cl } from "../..";
import { GITHUB_URL } from "../../utils/constants";


function BadgeCreationModal(props: ModalProps) {
    let position: string = "Start";
    let global: boolean = false;
    
    return <ModalRoot {...props} size={ModalSize.LARGE}>
        <ModalHeader className={cl('modal-header')} separator={false}>
            <Text
                color="header-primary"
                variant="heading-lg/semibold"
                tag="h1"
                style={{ textAlign: "center" }}
            >
                Create Badge
            </Text>
        </ModalHeader>

        <ModalContent>
            <div className={cl('modal-form')}>
                
                <Forms.FormSection title="Image">
                    <TextInput
                        placeholder="i.imgur.com/.png"
                    />
                    <Forms.FormText className={Margins.top8} type={Forms.FormText.Types.DESCRIPTION}>
                        The icon for the badge. Make sure it's a direct link to the image!<br/>
                        <code>Default: None</code>
                    </Forms.FormText>
                </Forms.FormSection>

                <Forms.FormSection title="Tooltip">
                    <TextInput
                        placeholder="You're so ✨ Sparkly ✨"
                    />
                    <Forms.FormText className={Margins.top8} type={Forms.FormText.Types.DESCRIPTION}>
                        The text that appears when you hover over the badge.<br/>
                        <code>Default: None</code>
                    </Forms.FormText>
                </Forms.FormSection>

                <Forms.FormSection title="Link">
                    <TextInput
                        placeholder="https://..."
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
                        serialize={(v) => v}
                        isSelected={(v) => position === v}
                    />
                    <Forms.FormText className={Margins.top8} type={Forms.FormText.Types.DESCRIPTION}>
                        This will position the badge closer to the end or start of your badges.<br/>
                        <code>Default: Start</code>
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
                        serialize={(v) => v}
                        isSelected={(v) => global === v}
                    />
                    <Forms.FormText className={Margins.top8} type={Forms.FormText.Types.DESCRIPTION}>
                        If <code>True</code>, this badge will be applied to every user that you view.<br/>
                        <code>Default: False</code>
                    </Forms.FormText>
                </Forms.FormSection>

            </div>
        </ModalContent>
        <ModalFooter className={cl('modal-footer')}>
            <Button onClick={props.onClose}>
                Create
            </Button>
            <Button look={Button.Looks.LINK} color={Button.Colors.PRIMARY} onClick={props.onClose}>
                Cancel
            </Button>
        </ModalFooter>
    </ModalRoot>
}


export const openBadgeCreationModal = () =>
    openModal(props => <BadgeCreationModal {...props} />);
