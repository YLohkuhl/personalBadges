/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { Link } from "@components/Link";
import { Margins } from "@utils/margins";
import { ModalContent, ModalFooter, ModalHeader, ModalProps, ModalRoot, ModalSize } from "@utils/modal";
import { useState, Text, Forms, TextInput, Button, showToast, Toasts, Alerts, Flex } from "@webpack/common";

import { cl } from "../..";

import { IPBadgeCategory, IPersonalBadge } from "../../types";
import { BadgeHandler, CategoryHandler } from "../../utils/badge/data";
import { DEFAULT_BADGE_CATEGORY, DEFAULT_BADGE_CATEGORY_URL } from "../../utils/constants";
import { saveJSONFile, somethingWentWrong } from "../../utils/misc";


export interface CategoryModalProps {
    c_id?: string,
    props: ModalProps,
}


export function CategoryModal({ c_id, props }: CategoryModalProps) {
    let category: IPBadgeCategory | undefined;
    if (c_id) category = BadgeHandler.getCache().get(c_id);

    const [name, setName] = useState<string | undefined>(category?.name);
    const [icon, setIcon] = useState<string | undefined>(category?.icon);

    function updateCategoryProperties() {
        if (!category || !name) return;

        category.name = name;
        category.icon = icon;
    }

    return <ModalRoot {...props} size={ModalSize.SMALL}>
        <ModalHeader>
            
            <Text
                color="header-primary"
                variant="heading-lg/semibold"
                tag="h1"
            >
                {category ? "Edit" : "Create"} Category
            </Text>

            <Flex style={{ flexDirection: "row-reverse" }} >
                {category ? 
                    <Button 
                        disabled={!category}
                        look={Button.Looks.LINK}
                        color={Button.Colors.PRIMARY}
                        onClick={async () => {
                            const { id: _, ...includedData } = category;

                            const badges: object[] = []
                            includedData.badges?.forEach(x => {
                                let { id: _, c_id: __, profileBadge: ___, ...badge } = x;
                                badges.push(badge);
                            })
                            includedData.badges = badges as IPersonalBadge[];

                            saveJSONFile('pb_category.json', includedData)
                        }}
                    >
                        Export
                    </Button>
                : (<></>)}
            </Flex>

        </ModalHeader>

        <ModalContent>
            <div className={cl('modal-form')} style={{ display: "inline", justifyContent: "center" }}>

                <Forms.FormSection title="Name">
                    <TextInput style={{ width: "47%", marginBottom: "16px" }}
                        placeholder="✨ Sparkly ✨ Sector"
                        maxLength={20}
                        onChange={(v) => setName(v)}
                        value={name}
                    />
                </Forms.FormSection>

                <Forms.FormSection title="Icon">
                    <TextInput 
                        placeholder="i.imgur.com/.png"
                        onChange={(v) => setIcon(v)}
                        value={icon}
                    />
                    <Forms.FormText className={Margins.top8} type={Forms.FormText.Types.DESCRIPTION}>
                        The icon for the category. Make sure it's a direct link to the image!<br/>
                        <code>Default: <Link href={DEFAULT_BADGE_CATEGORY_URL}>Icon</Link></code>
                    </Forms.FormText>
                </Forms.FormSection>

            </div>
        </ModalContent>

        <ModalFooter className={cl('modal-footer')}>

            <Button 
                disabled={!name || name.trim() === "" || name === DEFAULT_BADGE_CATEGORY}
                onClick={async () => {
                    if (!name) return;

                    const object = {
                        id: category?.id ?? "",
                        icon: icon,
                        name: name,
                        badges: []
                    }

                    if (!category) {
                        if (await CategoryHandler.register(object)) {
                            showToast(`Successful! Right click on users / or servers to manage your category. Badges can be added / or moved to it by editing / or creating the badge itself.`, Toasts.Type.SUCCESS);
                            props.onClose();
                        } else somethingWentWrong();
                    } else {
                        updateCategoryProperties();
                        if (await CategoryHandler.update(category)) {
                            showToast(`Successful! This category has been updated.`, Toasts.Type.SUCCESS);
                            props.onClose();
                        } else somethingWentWrong();
                    }
                }}
            >
                {category ? "Update" : "Create"}
            </Button>

            {category ?
                <Button 
                    disabled={!category}
                    look={Button.Looks.OUTLINED} 
                    color={Button.Colors.RED}
                    onClick={async () => {
                        if (!category) return;

                        deleteAlert(async () => {
                            if (await CategoryHandler.deregister(category.id)) {
                                showToast("Successful! This category has been deleted & the badges contained within it.", Toasts.Type.SUCCESS);
                                props.onClose();
                            } else somethingWentWrong();
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


function deleteAlert(onConfirm: () => any) {
    Alerts.show({
        title: "Are you sure?",
        body: (
            <>
                Do know that when deleting any category, <b>all of the badges</b> listed under it <b>will be deleted</b>.<br/><br/>
                Please consider moving them before deleting this category if that is not what you'd intend to happen.<br/><br/>
                Would you still like to continue with this action? <b>There is no going back</b>.
            </>
        ),
        cancelText: "Nope...",
        confirmText: "Yep!",
        onConfirm: async () => await onConfirm()
    })
}