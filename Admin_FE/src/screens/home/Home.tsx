import {
    IconClient,
    IconGlobalUser,
    IconMoney,
    IconSale,
} from "@/components/icon/Icon";
import Widget from "@/components/widget/Widget";

const widgets = [
    {
        title: `TODAY'S MONEY`,
        content: "$53,00",
        percent: 55,
        icon: <IconMoney />,
    },
    {
        title: `TODAY'S USERS`,
        content: "2,300",
        percent: 3,
        icon: <IconGlobalUser />,
    },
    {
        title: `NEW CLIENTS`,
        content: "+3,462",
        percent: 2,
        icon: <IconClient />,
    },
    { title: `SALE`, content: "$103,430", percent: 5, icon: <IconSale /> },
];

const Home = () => {
    return (
        <>
            <div className="bg-transparent h-screen">
                <div className="flex p-4 bg-transparent m-2 rounded-lg">
                    <div className="flex">
                        {widgets.map((widget) => (
                            <Widget
                                key={widget.title}
                                title={widget.title}
                                content={widget.content}
                                percent={widget.percent}
                                icon={widget.icon}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
