/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { Flex, Menu} from "@webpack/common";
import { openModal } from "@utils/modal";

import { IPersonalBadge } from "../../types";
import { CategoryModal } from "../modals/CategoryModal";

import * as bUtil from "../../utils/badge";


export * from './UserContext';
export * from './GuildContext';


export const BadgeMenuItemLabel = (badge: IPersonalBadge) => (
    <Flex style={{ alignItems: "center", gap: "0.5em" }}>
        <img 
            style={bUtil.defineStyleProps(badge.squircle)} 
            src={bUtil.defineImage(badge.image)} 
            height={32} 
            width={32}
        />
        {badge.tooltip ?? "No Tooltip"}
    </Flex>
);


export const CategoryElement = (id: string, c_id: string | undefined) => (
    <>
        <Menu.MenuItem
            id={id}
            key={id}
            label={`${c_id ? "Edit" : "Create"} Category`}
            color="brand"
            action={() => openModal(props => <CategoryModal c_id={c_id} props={props} />)}
        />
    </>
);


// export const DeleteCategoryElement = (id: string, c_id: string) => (
//     <>
//         <Menu.MenuItem
//             id={id}
//             key={id}
//             label="Delete Category"
//             action={() => Alerts.show({
//                 title: "Are you sure?",
//                 body: (
//                     <>
//                         Do know that when deleting any category, <b>all of the badges</b> listed under it <b>will be deleted</b>.<br/><br/>
//                         Please consider moving them before deleting this category if that is not what you'd intend to happen.<br/><br/>
//                         Would you still like to continue with this action? <b>There is no going back</b>.
//                     </>
//                 ),
//                 cancelText: "Nope...",
//                 confirmText: "Yep!",
//                 onConfirm: async () => {
//                     if (await CategoryHandler.deregister(c_id))
//                         showToast("Successful! This category has been deleted & the badges contained within it.", Toasts.Type.SUCCESS);
//                     else somethingWentWrong();
//                 }
//             })}
//         />
//     </>
// );