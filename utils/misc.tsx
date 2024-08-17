/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors*
 * SPDX-License-Identifier: GPL-3.0-or-later
*/

import { Alerts } from "@webpack/common";
import { Link } from "@components/Link";

import { GITHUB_URL } from "./constants";


export function quickAlert(title: any, body: React.ReactNode) {
    Alerts.show({ title: title, body: body });
}

export function somethingWentWrong() {
    quickAlert("Something went wrong!", (
        <>
            During the process, a problem was ran into. This could be the simple cause of creating duplicate badges or categories. This is <b>disallowed</b>.<br/><br/>
            If this isn't the problem, please check the <b><Link href="https://developer.chrome.com/docs/devtools">Chrome DevTools</Link></b> for potentially logged errors.<br/><br/>
            Report an issue at the <b><Link href={GITHUB_URL}>GitHub</Link></b> of your results to debug the issue.
        </>
    ));
}