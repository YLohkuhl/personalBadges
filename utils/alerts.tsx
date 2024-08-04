/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { Alerts } from "@webpack/common";
import { showItemInFolder } from "@utils/native";

import { IPersonalBadge } from "../types";
import { Native } from "..";


export function badgeAlert_isExcluded() {
    Alerts.show({
        title: "Badge already excludes user",
        body: "This user is already excluded from this badge."
    })
}

export function badgeAlert_isIncluded() {
    Alerts.show({
        title: "Badge already includes user",
        body: "This user is already included in this badge."
    })
}

export function badgeAlert_isGlobal() {
    Alerts.show({
        title: "This badge is set to be global",
        body: (
            <>
                <b>All users</b> have this badge because it is set as <code>global</code> within file.
            </>
        ),
        cancelText: "Okay",
        confirmText: "Locate Folder",
        onConfirm: async () => showItemInFolder(await Native.getBadgesDataDir())
    });
}

export function badgeAlert_nonExistent(badge: IPersonalBadge) {
    Alerts.show({
        title: "This badge does not exist",
        body: (
            <>
                Couldn't detect <code>"{badge.tooltip}"</code> badge from your <code>badges</code> folder.
            </>
        ),
        cancelText: "Okay",
        confirmText: "Locate Folder",
        onConfirm: async () => showItemInFolder(await Native.getBadgesDataDir())
    });
}