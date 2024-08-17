/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import "../modal.css";
import "../../../styles.css";

import { identity } from "@utils/misc";
import { Link } from "@components/Link";
import { Margins } from "@utils/margins";
import { ModalContent, ModalFooter, ModalHeader, ModalProps, ModalRoot, ModalSize } from "@utils/modal";
import { Alerts, Button, Forms, Select, showToast, Text, TextInput, Toasts, useEffect, useState } from "@webpack/common";
import { SelectOption } from "@webpack/types";

import { cl } from "../../..";

import { BadgeHandler } from "../../../utils/badge/data";
import { IPersonalBadge } from "../../../types";
import { somethingWentWrong } from "../../../utils/misc";
import { BadgeMenuItemLabel } from "../../context";
import { DEFAULT_BADGE_CATEGORY, DEFAULT_BADGE_URL, GITHUB_URL, PluginLogger } from "../../../utils/constants";


export interface BadgeModalProps {
    c_id?: string,
    props: ModalProps,
}


export function BadgeModal({ c_id, props }: BadgeModalProps) {
    const defaultCategory = Array.from(BadgeHandler.getCache().entries()).find(x => x[1].name === DEFAULT_BADGE_CATEGORY)?.[1];
    
    c_id = BadgeHandler.getCache().get(c_id ?? "")?.id;
    const [category, setCategory] = useState<string | undefined>(c_id ?? defaultCategory?.id);

    const [badge, setBadge] = useState<IPersonalBadge>()
    
    const [image, setImage] = useState<string | undefined>();
    const [tooltip, setTooltip] = useState<string | undefined>();
    const [link, setLink] = useState<string | undefined>();

    const [position, setPosition] = useState<string>("Start");
    const [squircle, setSquircle] = useState<boolean>(false);
    const [global, setGlobal] = useState<boolean>(false);
    
    const categoryOptions: SelectOption[] = [];

    Array.from(BadgeHandler.getCache().entries()).map(x => {
        categoryOptions.push({
            label: x[1].name,
            value: x[1].id,
            disabled: !x[1].id,
            default: category === defaultCategory?.id
        })
    })

    const badgeOptions: SelectOption[] = [];

    badgeOptions.push({
        label: "None",
        value: undefined,
        default: true
    })

    Array.from(BadgeHandler.getCache().entries()).map(x => {
        for (let badge of x[1].badges) {
            badgeOptions.push({
                label: badge.tooltip ?? "No Tooltip",
                value: [x[1].id, badge],
                disabled: !x[1].id
            })
        }
    })
    
    return <ModalRoot {...props} size={ModalSize.LARGE}>
        <ModalHeader className={cl('modal-header')}>

            <Text
                color="header-primary"
                variant="heading-lg/semibold"
                tag="h1"
            >
                {badge ? "Edit" : "Create"} Badge
            </Text>

            <Select popoutWidth={225}
                placeholder="Select Category"
                options={categoryOptions}
                select={(v) => setCategory(v)}
                serialize={identity}
                isSelected={(v) => category === v}
            />

            <Select className={cl('fixed-select-width')} popoutWidth={255}
                placeholder="Select Badge"
                options={badgeOptions}
                serialize={identity}
                isSelected={(v) => badge === v?.[1]}
                renderOptionLabel={(o) => (
                    o.value?.[1] ? BadgeMenuItemLabel(o.value?.[1]) : o.label
                )}
                select={(v: [string, IPersonalBadge]) => {
                    const category = v?.[0];
                    const badge = v?.[1];

                    const formattedPosition = badge?.position ? badge.position.charAt(0).toUpperCase() + badge.position.slice(1).toLowerCase() : undefined;

                    setCategory(category ?? defaultCategory?.id);
                    setBadge(badge);

                    setImage(badge?.image ?? "");
                    setTooltip(badge?.tooltip ?? "");
                    setLink(badge?.link ?? "");

                    setPosition(formattedPosition ?? "Start");
                    setSquircle(badge?.squircle ?? false);
                    setGlobal(badge?.global ?? false);
                }}
            />
            
        </ModalHeader>

        <ModalContent>
            <div className={cl('modal-form')}>
                
                <Forms.FormSection title="Image">
                    <TextInput
                        placeholder="i.imgur.com/.png"
                        onChange={(v) => setImage(v)}
                        value={image}
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
                        value={tooltip}
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
                        value={link}
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
                        options={[
                            {label: "Start", value: "Start"},
                            {label: "End", value: "End"}
                        ]}
                        select={(v) => setPosition(v)}
                        serialize={identity}
                        isSelected={(v) => position === v}
                    />
                    <Forms.FormText className={Margins.top8} type={Forms.FormText.Types.DESCRIPTION}>
                        This will position the badge closer to the end or start of your badges.<br/>
                        <code>Default: Start</code>
                    </Forms.FormText>
                </Forms.FormSection>

                <Forms.FormSection title="Is Squircle">
                    <Select
                        options={[
                            {label: "True", value: true},
                            {label: "False", value: false}
                        ]}
                        select={(v) => setSquircle(v)}
                        serialize={identity}
                        isSelected={(v) => squircle === v}
                    />
                    <Forms.FormText className={Margins.top8} type={Forms.FormText.Types.DESCRIPTION}>
                        If <code>True</code>, this badge will instead appear as a rounded square rather than a circle.<br/>
                        <code>Default: False</code>
                    </Forms.FormText>
                </Forms.FormSection>

                <Forms.FormSection title="Is Global">
                    <Select
                        options={[
                            {label: "True", value: true},
                            {label: "False", value: false}
                        ]}
                        select={(v) => setGlobal(v)}
                        serialize={identity}
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

            <Button 
                disabled={!category}
                onClick={async () => {
                    if (!category) return;

                    const object = {
                        id: "",
                        c_id: "",
                        
                        image: image,
                        tooltip: tooltip,
                        link: link,

                        position: position,
                        squircle: squircle,
                        global: global
                    };

                    if (!badge) {
                        if (await BadgeHandler.register(category, object)) {
                            showToast(`Successful! Right click on users / or servers to manage badges.`, Toasts.Type.SUCCESS);
                            props.onClose();
                        } else somethingWentWrong();
                    } else {

                        badge.image = badge.image;
                        badge.tooltip = badge.tooltip;
                        badge.link = badge.link;

                        badge.position = badge.position;
                        badge.squircle = badge.squircle;
                        badge.global = badge.global;

                        if (await BadgeHandler.update(category, badge)) {
                            showToast(`Successful! This badge has been updated.`, Toasts.Type.SUCCESS);
                            props.onClose();
                        } else somethingWentWrong();
                    }
                }}
            >
                {badge ? "Update": "Create"}
            </Button>

            {badge ?
                <Button 
                    disabled={!category || !badge}
                    look={Button.Looks.OUTLINED} 
                    color={Button.Colors.RED}
                    onClick={async () => {
                        if (!category) return;
                        if (!badge) return;
                        
                        Alerts.show({
                            title: "Are you sure?",
                            body: (
                                <>
                                    Do know that once this badge is deleted, <b>it will be gone forever</b>.<br/><br/>
                                    Please consider exporting your badge first as a backup file if this is not what you'd want.<br/><br/>
                                    Would you still like to continue with this action? <b>There is no going back</b>.
                                </>
                            ),
                            cancelText: "Nope...",
                            confirmText: "Yep!",
                            onConfirm: async () => {
                                if (await BadgeHandler.deregister(category, badge.id)) {
                                    showToast(`Successful! This badge has been deleted.`, Toasts.Type.SUCCESS);
                                    props.onClose();
                                } else somethingWentWrong();
                            }
                        })
                    }}
                >
                    Delete
                </Button>
            : (<></>)}

            <Button look={Button.Looks.OUTLINED} color={Button.Colors.PRIMARY} onClick={props.onClose}>
                Cancel
            </Button>

        </ModalFooter>
    </ModalRoot>
}
