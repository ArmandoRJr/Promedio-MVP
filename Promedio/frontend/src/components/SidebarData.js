import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

// CONTAINS MOCK DATA FOR TESTING!!

export const SidebarData = [
    {
        title: "University of Toronto",
        path: "/uoft",
        icon: <AiIcons.FaUniversity />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: "2020: Fall",
                path: "/uoft/f2020",
                icon: <FaIcons.FaFolder />,
                subNav: [
                    {
                        title: "CSCA08",
                        path: "/uoft/f2020/csca08",
                        icon: <IoIcons.IoDocumentText />,
                    },
                    {
                        title: "CSCA67",
                        path: "/uoft/f2020/csca67",
                        icon: <IoIcons.IoDocumentText />,
                    },
                    {
                        title: "MATA31",
                        path: "/uoft/f2020/mata31",
                        icon: <IoIcons.IoDocumentText />,
                    },
                ]
            },
            {
                title: "2021: Winter",
                path: "/uoft/w2021",
                icon: <FaIcons.FaFolder />,
                subNav: [
                    {
                        title: "CSCA48",
                        path: "/uoft/w2021/csca48",
                        icon: <IoIcons.IoDocumentText />,
                    },
                    {
                        title: "MATA22",
                        path: "/uoft/w2021/mata22",
                        icon: <IoIcons.IoDocumentText />,
                    },
                    {
                        title: "MATA37",
                        path: "/uoft/w2021/mata37",
                        icon: <IoIcons.IoDocumentText />,
                    },
                ]
            },
            {
                title: "2021: Summer",
                path: "/uoft/s2021",
                icon: <FaIcons.FaFolder />,
                subNav: [
                    {
                        title: "CSCB07",
                        path: "/uoft/s2021/cscb07",
                        icon: <IoIcons.IoDocumentText />,
                    },
                    {
                        title: "CSCB09",
                        path: "/uoft/s2021/cscb09",
                        icon: <IoIcons.IoDocumentText />,
                    },
                    {
                        title: "CSCB58",
                        path: "/uoft/s2021/cscb58",
                        icon: <IoIcons.IoDocumentText />,
                    },
                ]
            },
            // {
            //     title: "2021: Fall",
            //     path: "/uoft/f2021",
            //     icon: <FaIcons.FaFolder />,
            //     subNav: [
            //         {
            //             title: "CSCA08",
            //             path: "/uoft/w2021/csca08",
            //             icon: <IoIcons.IoDocumentText />,
            //         },
            //     ]
            // },
        ]
    }
];