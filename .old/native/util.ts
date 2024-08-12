// /*
//  * Vencord, a Discord client mod
//  * Copyright (c) 2024 Vendicated and contributors*
//  * SPDX-License-Identifier: GPL-3.0-or-later
// */

// import { access } from "fs/promises";


// export async function canAccessNativePath(_, path: string | undefined): Promise<boolean> {
//     try {
//         await access(!path ? "" : path);
//         return true;
//     } catch (error) {
//         return false;
//     }
// }