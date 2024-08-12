/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { Alerts, Toasts } from "@webpack/common";
import { showItemInFolder } from "@utils/native";

import { IPersonalBadge } from "../types";

// export function badge_isExcluded() {
//     Alerts.show({
//         title: "Badge already excludes this user",
//         body: "This user is already excluded from this badge."
//     })
// }

// export function badge_isIncluded() {
//     Alerts.show({
//         title: "Badge already includes this user",
//         body: "This user is already included in this badge."
//     })
// }

// export function badge_isGlobal(badge: IPersonalBadge) {
//     Alerts.show({
//         title: "This badge is set to be global",
//         body: (
//             <>
//                 <b>All users</b> have this badge because it is set as <code>global</code> within file.
//             </>
//         ),
//         cancelText: "Okay",
//         confirmText: "Locate Folder",
//         secondaryConfirmText: "Disable Global",
//         onConfirm: async () => showItemInFolder(await Native.getNativeBadgeDataDir()),
//         onConfirmSecondary: async () => {
//             badge.global = false;
//             await Native.modifyNativeBadgeData(badge.path, badge);
//         }
//     });
// }

// export function badge_isNonExistent(badge: IPersonalBadge) {
//     Alerts.show({
//         title: "Cannot find the data for this badge",
//         body: (
//             <>
//                 Couldn't detect <code>{!badge.tooltip ? null : `\"${badge.tooltip}\"`}</code> badge data from your <code>badges</code> folder.<br/>
//             </>
//         ),
//         cancelText: "Okay",
//         confirmText: "Locate Folder",
//         secondaryConfirmText: "Refresh Badges",
//         onConfirm: async () => showItemInFolder(await Native.getNativeBadgeDataDir()),
//         onConfirmSecondary: async () => await re_registerBadges()
//     });
// }