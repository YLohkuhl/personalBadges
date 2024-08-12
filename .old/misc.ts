/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

// import { PluginNative } from '@utils/types';


// export function getNative(): PluginNative<typeof import('../native')> {
//     if (IS_WEB) {
//         const Native = 
//         {
//             initNativeBadgeDataDir: async () => {},
//             getNativeBadgeDataDir: async () => "",
//             fetchNativeBadgeData: async () => [[], []],
//             modifyNativeBadgeData: async() => false,
//             canAccessNativePath: async () => false,
//             canAccessNativeBadgeData: async () => false
//         } satisfies PluginNative<typeof import("../native")>;

//         return Native;
//     }

//     return VencordNative.pluginHelpers.PersonalBadges as PluginNative<typeof import("../native")>
// }