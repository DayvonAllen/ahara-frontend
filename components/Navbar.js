import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  GlobeIcon,
  FireIcon,
  MenuIcon,
  ViewGridIcon,
  XIcon,
  FlagIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({ categories }) {
  const icons = [FlagIcon, GlobeIcon, FireIcon];

  const featuredCategories = categories.slice(0, 3);

  const fetchedCategories = featuredCategories.map((cat, i) => {
    cat.icon = icons[i];
    cat.href = `/categories/page/${cat.slug}/`;
    return cat;
  });

  fetchedCategories.push({
    name: "全てのカテゴリー",
    description: "全てのカテゴリーを見る",
    href: "/categories",
    icon: ViewGridIcon,
  });

  return (
    <Popover className="relative bg-white z-50">
      {({ open }) => (
        <>
          <div
            className="absolute inset-0 shadow z-30 pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-20">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
              <div>
                <Link href="/">
                  <a className="flex">
                    <span className="sr-only">Ahara Kitchen</span>
                    <Image
                      className="h-8 w-auto"
                      src="https://res.cloudinary.com/df1dxokhm/image/upload/v1627885809/small_ahara_2e302cf169.png"
                      height="100"
                      width="100"
                      alt="ahara logo"
                    />
                  </a>
                </Link>
              </div>
              <div className="-mr-2 -my-2 md:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500">
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
                <Popover.Group as="nav" className="flex space-x-10">
                  <Link key="/" href="/">
                    <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                      ホーム
                    </a>
                  </Link>
                  <Link key="/search" href="/search">
                    <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                      検索
                    </a>
                  </Link>
                  <Link key="/about" href="/about">
                    <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                      アバウト
                    </a>
                  </Link>

                  <Popover>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? "text-gray-900" : "text-gray-500",
                            "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                          )}
                        >
                          <span>カテゴリー</span>
                          <ChevronDownIcon
                            className={classNames(
                              open ? "text-gray-600" : "text-gray-400",
                              "ml-2 h-5 w-5 group-hover:text-gray-500"
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 -translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 -translate-y-1"
                        >
                          <Popover.Panel
                            static
                            className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-lg bg-white"
                          >
                            <div className="max-w-7xl mx-auto grid gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                              {fetchedCategories.map((category) => (
                                <a
                                  key={category.slug}
                                  href={category.href}
                                  className="-m-3 p-3 flex flex-col justify-between rounded-lg hover:bg-gray-50"
                                >
                                  <div className="flex md:h-full lg:flex-col">
                                    <div className="flex-shrink-0">
                                      <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-pink-500 text-white sm:h-12 sm:w-12">
                                        <category.icon
                                          className="h-6 w-6"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </div>
                                    <div className="ml-4 md:flex-1 md:flex md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                      <div>
                                        <p className="text-base font-medium text-gray-900">
                                          {category.name}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {category.description}
                                        </p>
                                      </div>
                                      <p className="mt-2 text-sm font-medium text-pink-600 lg:mt-4">
                                        さらに詳しく{" "}
                                        <span aria-hidden="true">&rarr;</span>
                                      </p>
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </Popover.Group>
              </div>
            </div>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              static
              className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5 sm:pb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <Image
                        className="h-8 w-auto"
                        src="https://res.cloudinary.com/df1dxokhm/image/upload/v1627885809/small_ahara_2e302cf169.png"
                        height="90"
                        width="90"
                        alt="ahara logo"
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6 sm:mt-8 z-50">
                    <nav>
                      <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                        {fetchedCategories.map((category, i) => (
                          <a
                            key={category.slug + i}
                            href={category?.href}
                            className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-pink-500 text-white sm:h-12 sm:w-12">
                              <category.icon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="ml-4 text-base font-medium text-gray-900">
                              {category.name}
                            </div>
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Link key="home-small" href="/">
                      <a className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                        ホーム
                      </a>
                    </Link>
                    <Link key="search-small" href="/search">
                      <a className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                        検索
                      </a>
                    </Link>
                    <Link key="about-small" href="/about">
                      <a className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                        アバウト
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

Navbar.defaultProps = {
  categories: [],
};

export default Navbar;
