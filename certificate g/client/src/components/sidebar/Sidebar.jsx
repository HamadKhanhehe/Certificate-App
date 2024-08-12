import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaRegChartBar } from "react-icons/fa";
import { MdOutlineSportsCricket } from "react-icons/md";
import { MdSportsGymnastics } from "react-icons/md";
import { Link } from 'react-router-dom';
import { TbReportAnalytics } from "react-icons/tb";
import { BiStats } from "react-icons/bi";


export const Sidebar = () => {
const [isOpen, setIsOpen] = useState(false);


const handleToggle = () => {
    setIsOpen(!isOpen)
}

    return (
        <>
        <div className="">
<div id="icon" className="absolute top-10 left-5 z-50 text-3xl">
    <button onClick={handleToggle}>
<CiMenuBurger />
</button>
</div>

{ isOpen && (
<div className="xs:w-52 h-full bg-blue-500 fixed z-50 top-0 left-0 text-white lg:w-48 ">
<div className="text-3xl">
    <div id="icon" className="absolute top-10 right-5 z-50 ">
    <button onClick={handleToggle}>
<CiMenuBurger />
</button>
</div>


<div className="relative top-32 pl-10 ">
    <Link className="no-underline text-white" to={'/'}>
<div className="flex items-center gap-3 pb-2">
<FaRegChartBar />
            <h6>Charts</h6>
</div>
</Link>
<Link className="no-underline text-white" to={'/report'}>
<div className="flex items-center gap-3 pb-2">
<TbReportAnalytics />
            <h6>Reports</h6>
            </div>
            </Link>
            <Link className="no-underline text-white" to={'/home2'}>
<div className="flex items-center gap-3">
<BiStats />
            <h6>Charts</h6>
</div>
</Link>
</div>


</div>
</div>
)
}
        </div>
        </>
    )
}