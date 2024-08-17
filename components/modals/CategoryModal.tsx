/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { ModalContent, ModalFooter, ModalHeader, ModalProps, ModalRoot, ModalSize } from "@utils/modal";
import { useState, Text, Forms, TextInput, Button, showToast, Toasts, Alerts } from "@webpack/common";

import { cl } from "../..";

import { BadgeHandler, CategoryHandler } from "../../utils/badge/data";
import { IPBadgeCategory } from "../../types";
import { DEFAULT_BADGE_CATEGORY } from "../../utils/constants";
import { somethingWentWrong } from "../../utils/misc";


export interface CategoryModalProps {
    c_id?: string,
    props: ModalProps,
}


export function CategoryModal({ c_id, props }: CategoryModalProps) {
    let category: IPBadgeCategory | undefined;
    if (c_id) category = BadgeHandler.getCache().get(c_id);

    const [name, setName] = useState<string | undefined>(category?.name);
    
    return <ModalRoot {...props} size={ModalSize.DYNAMIC}>
        <ModalHeader>
            <Text
                color="header-primary"
                variant="heading-lg/semibold"
                tag="h1"
            >
                {category ? "Edit" : "Create"} Category
            </Text>
        </ModalHeader>
        <ModalContent>
            <div className={cl('modal-form')} style={{ display: "block", justifyContent: "center" }}>

                <Forms.FormSection title="Name">
                    <TextInput
                        sizes={TextInput.Sizes.MINI}
                        placeholder="✨ Sparkly ✨ Sector"
                        maxLength={20}
                        onChange={(v) => setName(v)}
                        value={name}
                    />
                </Forms.FormSection>

            </div>
        </ModalContent>

        <ModalFooter className={cl('modal-footer')}>

            <Button 
                disabled={!name || name === DEFAULT_BADGE_CATEGORY}
                onClick={async () => {
                    if (!name) return;

                    const object = {
                        id: category?.id ?? "",
                        name: name,
                        badges: []
                    }

                    if (!category) {
                        if (await CategoryHandler.register(object)) {
                            showToast(`Successful! Right click on users / or servers to manage your category. Badges can be added to it by modifying the badge.`, Toasts.Type.SUCCESS);
                            props.onClose();
                        } else somethingWentWrong();
                    } else {
                        if (await CategoryHandler.update(object)) {
                            showToast(`Successful! The category name has been updated.`, Toasts.Type.SUCCESS);
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
                            onConfirm: async () => {
                                if (await CategoryHandler.deregister(category.id)) {
                                    showToast("Successful! This category has been deleted & the badges contained within it.", Toasts.Type.SUCCESS);
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