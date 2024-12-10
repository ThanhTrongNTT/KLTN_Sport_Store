import React from "react";

const AboutPage = () => {
    const people = [
        {
            name: "Nguyễn Thành Trọng",
            role: "Back End Developer",
            imageUrl:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            name: "Trịnh Đinh Hoàng Huy",
            role: "Front End Developer",
            imageUrl:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        // More people...
    ];
    const links = [
        { name: "To Collection", href: "#" },
        { name: "Contact With Us", href: "#" },
    ];
    const stats = [
        { name: "Offices worldwide", value: "12" },
        { name: "Full-time colleagues", value: "300+" },
        { name: "Hours per week", value: "40" },
        { name: "Paid time off", value: "Unlimited" },
    ];

    return (
        <div className="bg-white pb-24 sm:py-14">
            <div className="relative isolate overflow-hidden bg-gray-900 sm:py-24 mb-7">
                <div className="bg-repeat absolute inset-0 size-full object-content md:object-center background-image: url(https://e0.pxfuel.com/wallpapers/184/94/desktop-wallpaper-canadian-sneakerheads-on-how-they-re-surviving-quarantine.jpg)"></div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Work with us
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Anim aute id magna aliqua ad ad non deserunt sunt.
                            Qui irure qui lorem cupidatat commodo. Elit sunt
                            amet fugiat veniam occaecat fugiat aliqua.
                        </p>
                    </div>
                    <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                            {links.map((link) => (
                                <a key={link.name} href={link.href}>
                                    {link.name}{" "}
                                    <span aria-hidden="true">&rarr;</span>
                                </a>
                            ))}
                        </div>
                        <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                            {stats.map((stat) => (
                                <div
                                    key={stat.name}
                                    className="flex flex-col-reverse"
                                >
                                    <dt className="text-base leading-7 text-gray-300">
                                        {stat.name}
                                    </dt>
                                    <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                                        {stat.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Meet our leadership
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Libero fames augue nisl porttitor nisi, quis. Id ac elit
                        odio vitae elementum enim vitae ullamcorper suspendisse.
                    </p>
                </div>
                <ul
                    role="list"
                    className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
                >
                    {people.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                <img
                                    className="h-16 w-16 rounded-full"
                                    src={person.imageUrl}
                                    alt=""
                                />
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                                        {person.name}
                                    </h3>
                                    <p className="text-sm font-semibold leading-6 text-indigo-600">
                                        {person.role}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AboutPage;
