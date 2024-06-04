import React, { useState } from 'react'
import './SideBar.css'
import { BiSolidPieChartAlt } from "react-icons/bi";
import { PiUsersThree } from "react-icons/pi";
import { FaRegFolderClosed } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsBox } from "react-icons/bs";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { PiNotepad } from "react-icons/pi";
import { TbSettings2 } from "react-icons/tb";
import { LuPlug } from "react-icons/lu";
import { FaUserSecret } from "react-icons/fa";

const SideBar = () => {
    const iconLists = [
        {
            icon: <BiSolidPieChartAlt />
        },
        {
            icon: <PiUsersThree />
        },
        {
            icon: <FaRegFolderClosed />
        },
        {
            icon: <IoDocumentTextOutline />
        },
        {
            icon: <BsBox />
        },
        {
            icon: <LiaShoppingBagSolid />
        },
        {
            icon: <PiNotepad />
        },
        {
            icon: <TbSettings2 />
        },
        {
            icon: <LuPlug />
        },
    ]

    const [active, setActive] = useState(3)

    const activehandleClick = (id) => {
        setActive(id)
    }
    return (
        <div className="side_bar">
            <div className="side_bar_content">
                <div className="top_side">
                    {
                        iconLists.map((item, id) => {
                            return (
                                <div
                                    key={id}
                                    className={`top_side_box ${active === id ? 'active_color' : ''}`}
                                    onClick={() => activehandleClick(id)}
                                >
                                    <div className="top_side_content">
                                        {item?.icon}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="bottom_side"><FaUserSecret /></div>
            </div>
        </div>
    )
}

export default SideBar
