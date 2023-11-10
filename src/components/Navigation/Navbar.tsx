"use client";
import { ReactElement, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CgChevronRight } from "react-icons/cg";
import { GiBubbles } from "react-icons/gi";
import { AiOutlineMergeCells, AiOutlineInsertRowRight } from "react-icons/ai";
import Link from "next/link";

export default function NavbarWrapper() {
  return (
    <div className="absolute top-0 w-full h-20 justify-between align-center bg-background-light">
      <Navbar />
    </div>
  );
}

function Navbar() {
  return (
    <div className="flex h-full justify-between">
      <div className="flex w-60 justify-evenly items-center text-white text-bold text-2xl">
        Sorted_
      </div>
      <div className="flex w-1/2 mr-20 justify-evenly items-center">
        {navbarItems.map((item) => (
          <NavbarItem {...item} />
        ))}
      </div>
    </div>
  );
}

const navbarItems = [
  {
    icon: <GiBubbles />,
    baseUrl: "/bubbleSort",
    label: "Bubble Sort",
  },
  {
    icon: <AiOutlineMergeCells />,
    baseUrl: "/merge",
    label: "Merge Sort",
  },
  {
    icon: <AiOutlineInsertRowRight />,
    baseUrl: "/insertion",
    label: "Insertion Sort",
  },
];

type NavbarItemProps = {
  icon: ReactElement;
  label: String;
  baseUrl: String;
};

const btnHover = `hover:scale-105 hover:translate-y-1 hover:opacity-100 transition-all`;

function NavbarItem({ icon, label, baseUrl }: NavbarItemProps) {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button
        className={`${btnHover} inline-flex h-full w-full rounded-md flex-col justify-center items-center text-white opacity-70`}
      >
        {icon}
        {label}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute mt-2 w-52 left-0 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link href={`${baseUrl}/lesson`}>
                <button
                  className={`${
                    active ? "bg-emerald-400 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <div className="flex w-full items-center">
                    <CgChevronRight className="mr-3" />
                    {label} Lesson
                  </div>
                </button>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link href={`${baseUrl}/vis`}>
                <button
                  className={`${
                    active ? "bg-emerald-400 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <div className="flex w-full items-center">
                    <CgChevronRight className="mr-3" />
                    Visualization
                  </div>
                </button>
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
