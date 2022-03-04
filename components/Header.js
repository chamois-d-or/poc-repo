import React from "react";

import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const Header = ({ menuTabs = [] , logo = null, currentLocale = 'en-us', locales = ['en-us'] }) => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const { pathname, asPath, query } = router
    function handleChange(e) {
        router.push({ pathname, query }, asPath, { locale: e.target.value })
    }
    return (
        <section className="bg-white">
             {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                    <div className="px-4 pt-5 pb-2 flex">
                        <button
                        type="button"
                        className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                        onClick={() => setOpen(false)}
                        >
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Links */}
                    <Tab.Group as="div" className="mt-2">
                        <div className="border-b border-gray-200">
                        <Tab.List className="-mb-px flex px-4 space-x-8">
                            {menuTabs?.map((menuTab,index) => (
                            <Tab
                                key={index}
                                className={({ selected }) =>
                                classNames(
                                    selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                                    'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                                )
                                }
                            >
                                {menuTab?.title}
                            </Tab>
                            ))}
                        </Tab.List>
                        </div>
                        <Tab.Panels as={Fragment}>
                        {menuTabs?.map((menuTab) => (
                            <Tab.Panel key={menuTab?.title} className="pt-10 pb-8 px-4 space-y-10">
                            {menuTab?.slices?.map((section, index) => (
                                <div key={section?.primary?.sectionTitle}>
                                <p id={`${index}-${section?.primary?.sectionTitle}-heading-mobile`} className="font-medium text-gray-900">
                                    {section?.primary?.sectionTitle}
                                </p>
                                <ul
                                    role="list"
                                    aria-labelledby={`${index}-${section?.primary?.sectionTitle}-heading-mobile`}
                                    className="mt-6 flex flex-col space-y-6"
                                >
                                {section.items.map((item) => (
                                    <li key={item?.subSectionTitle} className="flow-root">
                                    <a href={item?.subSectionLink?.url} className="-m-2 p-2 block text-gray-500">
                                        {item?.subSectionTitle}
                                    </a>
                                    </li>
                                ))}
                                </ul>
                                </div>
                            ))}
                            </Tab.Panel>
                        ))}
                        </Tab.Panels>
                    </Tab.Group>
                </div>
                </Transition.Child>
                </Dialog>
            </Transition.Root>
            <header className="relative bg-white">
                <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-b border-gray-200">
                    <div className="h-16 flex items-center">
                    <button
                        type="button"
                        className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                        onClick={() => setOpen(true)}
                    >
                        <span className="sr-only">Open menu</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Logo */}
                    <div className="ml-4 flex lg:ml-0">
                        <a href={"/"+currentLocale}>
                        <span className="sr-only">Workflow</span>
                        <img
                            className="h-8 w-auto"
                            src={logo?.url}
                            alt={logo?.alt}
                        />
                        </a>
                    </div>

                    {/* Flyout menus */}
                    <Popover.Group className="z-40 hidden lg:ml-8 lg:block lg:self-stretch">
                        <div className="h-full flex space-x-8">
                        {menuTabs?.map((menuTab, index) => (
                            <Popover key={index} className="flex">
                            {({ open }) => (
                                <>
                                <div className="relative flex">
                                    <Popover.Button
                                    className={classNames(
                                        open
                                        ? 'border-indigo-600 text-indigo-600'
                                        : 'border-transparent text-gray-700 hover:text-gray-800',
                                        'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                                    )}
                                    >
                                    {menuTab?.title}
                                    </Popover.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                    <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                    <div className="relative bg-white">
                                        <div className="max-w-7xl mx-auto px-8">
                                        <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                            <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                            {menuTab?.slices?.map((section,index2) => (
                                                <div key={index2}>
                                                <p id={`${section?.primary?.sectionTitle}-heading`} className="font-medium text-gray-900">
                                                    {section?.primary?.sectionTitle}
                                                </p>
                                                <ul
                                                    role="list"
                                                    aria-labelledby={`${section?.primary?.sectionTitle}-heading`}
                                                    className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                >
                                                    {section?.items?.map((item) => (
                                                    <li key={item?.subSectionTitle} className="flex">
                                                        <a href={item?.subSectionLink?.url} className="hover:text-gray-800">
                                                        {item?.subSectionTitle}
                                                        </a>
                                                    </li>
                                                    ))}
                                                </ul>
                                                </div>
                                            ))}
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </Popover.Panel>
                                </Transition>
                                </>
                            )}
                            </Popover>
                        ))}
                        </div>
                    </Popover.Group>
                    <div className="ml-auto flex items-center">
                        <div className="hidden lg:ml-8 lg:flex">
                        <a className="text-gray-700 hover:text-gray-800 flex items-center">
                            <select
                            id="location"
                            name="location"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            onChange={handleChange}
                            value={currentLocale}
                            >
                            {locales?.map((locale) => {
                                return(
                                <option key={locale}>
                                    {locale}
                                </option>
                                )}
                            )}
                            </select>
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
                </nav>
            </header>
        </section>
    );
};

export default Header;