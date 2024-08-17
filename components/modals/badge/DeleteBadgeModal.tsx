import { ModalContent, ModalHeader, ModalProps, ModalRoot, ModalSize } from "@utils/modal";
import { Button, Forms, SearchableSelect, Select, Text } from "@webpack/common";
import { Flex } from "@components/Flex";

import { cl } from '../../..';
import { BadgeHandler } from "../../../utils/badge/data";

import * as bUtil from '../../../utils/badge';
import { Margins } from "@utils/margins";
import { Grid } from "@components/Grid";
import { DeleteIcon, NoEntrySignIcon } from "@components/Icons";


export function DeleteBadgeModal(props: ModalProps) {
    return <ModalRoot {...props} size={ModalSize.DYNAMIC}>
        <ModalHeader className={cl('modal-header')}>
            <Text
                color="header-primary"
                variant="heading-lg/semibold"
                tag="h1"
            >
                Delete Badge
            </Text>
        </ModalHeader>

        <ModalContent>
            <div className={cl('modal-form')}>

                {/* <div className={cl('grid')}>
                    {Array.from(BadgeHandler.getCache().entries()).map((value, index) => {
                        const badge = value[1][0];

                        return (
                            <Flex>
                                <img 
                                    style={bUtil.defineStyleProps(badge.squircle)} 
                                    src={bUtil.defineImage(badge.image)} 
                                    height={32} 
                                    width={32}
                                />
                                <Forms.FormText type={Forms.FormText.Types.DESCRIPTION}>
                                    {badge.tooltip}
                                </Forms.FormText>
                            </Flex>
                        )
                    })}
                </div> */}
                    <div>
                        <SearchableSelect
                            placeholder="Select Category"
                            options={[
                                {
                                    label: "Unassigned",
                                    value: undefined
                                },
                                {
                                    label: "Test",
                                    value: undefined
                                }
                            ]}
                            onChange={() => {
                            }}
                        />

                        <div className={cl('badge-grid')}>
                            {Array.from(BadgeHandler.getCache().entries()).map((value) => {
                                const badge = value[1][0];
                                
                                return (
                                    <Button size={Button.Sizes.ICON} look={Button.Looks.OUTLINED} color={Button.Colors.RED}>
                                        <img 
                                            style={bUtil.defineStyleProps(badge.squircle)} 
                                            src={bUtil.defineImage(badge.image)} 
                                            height={32} 
                                            width={32}
                                        />
                                    </Button>
                                )
                            })}
                        </div>

                    </div>

                {/* <SearchableSelect multi={true}
                //     placeholder="Select Badge"
                //     options={Array.from(BadgeHandler.getCache().entries()).map((value, index) => {
                //         return (
                //             {
                //                 label: !value[1][0].tooltip ? "" : value[1][0].tooltip,
                //                 value: value[1][0].id,
                //             }
                //         )
                //     })}
                //     onChange={(v) => v}
                // /> */}
            </div>
        </ModalContent>
    </ModalRoot>
}