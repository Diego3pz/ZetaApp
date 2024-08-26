import Link from "next/link"

interface Props {
    href: string
    children: React.ReactNode
}

const SideMenuItem: React.FC<Props> = (props) => {
    return (
        <li>
            <Link
                className="flex gap-4 text-zinc-400 hover:text-zinc-100 items-center py-3 px-5 font-medium transition duration-300"
                href={props.href}>
                {props.children}
            </Link>
        </li>
    )
}

export default SideMenuItem