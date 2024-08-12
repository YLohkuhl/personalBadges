// /*
//  * Vencord, a Discord client mod
//  * Copyright (c) 2024 Vendicated and contributors*
//  * SPDX-License-Identifier: GPL-3.0-or-later
// */

// import "./BadgeToolbox.css";

// import ErrorBoundary from "@components/ErrorBoundary";

// import { ReactNode } from "react";
// import { findExportedComponentLazy } from "@webpack";
// import { Menu, Popout, useState } from "@webpack/common";
// import { showItemInFolder } from "@utils/native";

// import { cl } from "..";
// import { Native } from "..";
// import { GITHUB_URL } from "../utils/constants";
// import { re_registerBadges } from "../badge/registry";
// import { openBadgeCreationModal } from "./modals/BadgeCreationModal";


// const HeaderBarIcon = findExportedComponentLazy("Icon", "Divider");


// export function BadgeToolboxPopout(onClose: () => void) {
//     return (
//         <Menu.Menu
//             navId="pb-toolbox"
//             onClose={onClose}
//         >
            
//             <Menu.MenuItem
//                 id="pb-toolbox-refresh-badges"
//                 label="Refresh Badges"
//                 action={async () => await re_registerBadges()}
//             />
//             <Menu.MenuItem
//                 id="pb-toolbox-locate-folder"
//                 label="Locate Folder"
//                 action={async () => showItemInFolder(await Native.getNativeBadgeDataDir())}
//             />

//             <Menu.MenuSeparator />

//             <Menu.MenuGroup 
//                 label="Badges"
//             >

//                 <Menu.MenuItem
//                     id="pb-toolbox-badges-create"
//                     label="Create Badge"
//                     action={() => openBadgeCreationModal()}
//                 />
//                 <Menu.MenuItem
//                     id="pb-toolbox-badges-modify"
//                     label="Modify Badge"
//                 />
//                 <Menu.MenuItem
//                     id="pb-toolbox-badges-delete"
//                     label="Delete Badge"
//                 />

//             </Menu.MenuGroup>

//             <Menu.MenuSeparator />

//             <Menu.MenuGroup 
//                 label="Misc"
//             >

//                 <Menu.MenuItem
//                     id="pb-toolbox-misc-github"
//                     label="GitHub"
//                     action={async () => await VencordNative.native.openExternal(GITHUB_URL)}
//                 />
                
//             </Menu.MenuGroup>

//         </Menu.Menu>
//     );
// }

// export function BadgeToolboxIcon() {
//     return (
//         <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={24} height={24}>
//             <g>
//                 <path d="M16,20c4.4,0,8-3.6,8-8s-3.6-8-8-8s-8,3.6-8,8S11.6,20,16,20z"/>
//                 <path d="M29.4,26.1l-3.5-7.3c1.3-1.9,2.1-4.3,2.1-6.8c0-6.6-5.4-12-12-12S4,5.4,4,12c0,2.6,0.8,4.9,2.2,6.9l-3.4,7.2c-0.1,0.3-0.1,0.7,0,0.9s0.5,0.5,0.8,0.5l4.7,0.3l3.2,3.5c0.2,0.2,0.5,0.3,0.7,0.3c0,0,0.1,0,0.2,0c0.3,0,0.6-0.3,0.8-0.6l2.9-6l2.9,6c0.1,0.3,0.4,0.5,0.8,0.6c0,0,0.1,0,0.2,0c0.3,0,0.5-0.1,0.7-0.3l3.2-3.5l4.7-0.3c0.3,0,0.6-0.2,0.8-0.5S29.5,26.4,29.4,26.1z M16,2c5.5,0,10,4.5,10,10c0,5.5-4.5,10-10,10S6,17.5,6,12C6,6.5,10.5,2,16,2z"/>
//             </g>
//         </svg>
//     );
// }

// export function BadgeToolboxButton() {
//     const [show, setShow] = useState(false);

//     return (
//         <Popout
//             align="right"
//             position="bottom"
//             shouldShow={show}
//             animation={Popout.Animation.NONE}
//             renderPopout={() => BadgeToolboxPopout(() => setShow(false))}
//             onRequestClose={() => setShow(false)}
//         >
//             {(_, { isShown }) => (
//                 <HeaderBarIcon className={cl('toolbox-btn')}
//                     icon={() => BadgeToolboxIcon()}
//                     tooltip={isShown ? null : "Badge Toolbox"}
//                     onClick={() => setShow(v => !v)}
//                     selected={isShown}
//                 />
//             )}
//         </Popout>
//     );
// }

// export function ApplyButtonToToolbar(e: { toolbar: ReactNode[] | ReactNode; }) {
//     const element = (
//         <ErrorBoundary noop={true}>
//             <BadgeToolboxButton />
//         </ErrorBoundary>
//     );

//     if (Array.isArray(e.toolbar))
//         return e.toolbar.push(element);

//     e.toolbar = [element, e.toolbar];
// }