import { BadgePosition, ProfileBadge } from "@api/Badges";

import { IPersonalBadge } from "../../types";
import { GITHUB_URL } from "../constants";


// export function tryIdentifyBadge(a: IPersonalBadge, b: IPersonalBadge): boolean {
//     return a === b || a.image === b.image || a.tooltip === b.tooltip;
// }

export function defineUserInclusion(userId: string, badge: IPersonalBadge): boolean {
    return badge.global || badge.users?.includes(userId) ? (badge.excluded?.includes(userId) ? false : true) : false;
}

export function defineBadgePosition(position: string | undefined): BadgePosition {
    const upper = position?.toUpperCase();
    return upper === "START" ? BadgePosition.START : (upper === "END" ? BadgePosition.END : BadgePosition.START);
}

export function iPersonalToProfile(i: IPersonalBadge): ProfileBadge {
    return {
        image: i.image,
        description: i.tooltip,
        position: defineBadgePosition(i.position),
        link: i.link || GITHUB_URL,
        shouldShow: ({ userId }) => defineUserInclusion(userId, i),
        props: {
            style: {
                borderRadius: "50%",
                transform: "scale(0.9)"
            }
        }
    }
}