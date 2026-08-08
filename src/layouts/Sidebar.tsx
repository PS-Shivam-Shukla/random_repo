import { NavLink } from "react-router-dom";

const links = [
    ["Dashboard", "/dashboard"],
    ["Resumes", "/resumes"],
    ["Interviews", "/interviews"],
    ["Analytics", "/analytics"],
    ["Reports", "/reports"],
    ["Memory", "/memory"],
    ["Career", "/career"],
    ["Admin", "/admin"],
    ["Settings", "/settings"],
];

export default function Sidebar() {
    return (
        <aside className="w-64 border-r border-slate-800 bg-slate-900">

            <div className="p-6 text-xl font-bold">

                InterviewSage

            </div>

            <nav className="flex flex-col">

                {links.map(([title, path]) => (
                    <NavLink

                        key={path}

                        to={path}

                        className="px-6 py-3 hover:bg-slate-800"

                    >
                        {title}
                    </NavLink>
                ))}

            </nav>

        </aside>
    );
}