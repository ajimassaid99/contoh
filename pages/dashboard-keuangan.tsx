import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store";
import PerfectScrollbar from "react-perfect-scrollbar";
import Dropdown from "../components/Ui/Dropdown";
import { setPageTitle } from "../store/themeConfigSlice";
import { GiTakeMyMoney, GiArrest } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});
import Link from "next/link";
import { BsBoxSeamFill } from "react-icons/bs";

const Index = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle("Dashboard Keuangan"));
    });
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === "dark" ? true : false;
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl" ? true : false;

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    });

    // totalVisitOptions
    const totalVisit: any = {
        series: [{ data: [21, 9, 36, 12, 44, 25, 59, 41, 66, 25] }],
        options: {
            chart: {
                height: 58,
                type: "line",
                fontFamily: "Nunito, sans-serif",
                sparkline: {
                    enabled: true,
                },
                dropShadow: {
                    enabled: true,
                    blur: 3,
                    color: "#009688",
                    opacity: 0.4,
                },
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            colors: ["#009688"],
            grid: {
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return "";
                        },
                    },
                },
            },
        },
    };

    // paidVisitOptions
    const paidVisit: any = {
        series: [{ data: [22, 19, 30, 47, 32, 44, 34, 55, 41, 69] }],
        options: {
            chart: {
                height: 58,
                type: "line",
                fontFamily: "Nunito, sans-serif",
                sparkline: {
                    enabled: true,
                },
                dropShadow: {
                    enabled: true,
                    blur: 3,
                    color: "#e2a03f",
                    opacity: 0.4,
                },
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            colors: ["#e2a03f"],
            grid: {
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return "";
                        },
                    },
                },
            },
        },
    };

    //Revenue Chart
    const revenueChart: any = {
        series: [
            {
                name: "Income",
                data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
            },
            {
                name: "Expenses",
                data: [16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000, 18000, 19000],
            },
        ],
        options: {
            chart: {
                height: 325,
                type: "area",
                fontFamily: "Nunito, sans-serif",
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },

            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: "smooth",
                width: 2,
                lineCap: "square",
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22,
            },
            colors: isDark ? ["#2196F3", "#E7515A"] : ["#1B55E2", "#E7515A"],
            markers: {
                discrete: [
                    {
                        seriesIndex: 0,
                        dataPointIndex: 6,
                        fillColor: "#1B55E2",
                        strokeColor: "transparent",
                        size: 7,
                    },
                    {
                        seriesIndex: 1,
                        dataPointIndex: 5,
                        fillColor: "#E7515A",
                        strokeColor: "transparent",
                        size: 7,
                    },
                ],
            },
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                labels: {
                    offsetX: isRtl ? 2 : 0,
                    offsetY: 5,
                    style: {
                        fontSize: "12px",
                        cssClass: "apexcharts-xaxis-title",
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (value: number) => {
                        return value / 1000 + "K";
                    },
                    offsetX: isRtl ? -30 : -10,
                    offsetY: 0,
                    style: {
                        fontSize: "12px",
                        cssClass: "apexcharts-yaxis-title",
                    },
                },
                opposite: isRtl ? true : false,
            },
            grid: {
                borderColor: isDark ? "#191E3A" : "#E0E6ED",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                yaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: "top",
                horizontalAlign: "right",
                fontSize: "16px",
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: isDark ? 0.19 : 0.28,
                    opacityTo: 0.05,
                    stops: isDark ? [100, 100] : [45, 100],
                },
            },
        },
    };

    //Sales By Category
    const salesByCategory: any = {
        series: [985, 737, 270],
        options: {
            chart: {
                type: "donut",
                height: 460,
                fontFamily: "Nunito, sans-serif",
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 25,
                colors: isDark ? "#0e1726" : "#fff",
            },
            colors: isDark ? ["#22d3ee", "#2dd4bf", "#38bdf8", "#2dd4bf"] : ["#2dd4bf", "#22d3ee", "#38bdf8"],
            legend: {
                position: "bottom",
                horizontalAlign: "center",
                fontSize: "14px",
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 50,
                offsetY: 20,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: "65%",
                        background: "transparent",
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: "29px",
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: "26px",
                                color: isDark ? "#bfc9d4" : undefined,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: "Total",
                                color: "#888ea8",
                                fontSize: "29px",
                                formatter: (w: any) => {
                                    return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                                        return a + b;
                                    }, 0);
                                },
                            },
                        },
                    },
                },
            },
            labels: ["12 SMA", "11 SMA", "10 SMK"],
            states: {
                hover: {
                    filter: {
                        type: "none",
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: "none",
                        value: 0.15,
                    },
                },
            },
        },
    };

    //Daily Sales
    const dailySales: any = {
        series: [
            {
                name: "Sales",
                data: [44, 55, 41, 67, 22, 43, 21],
            },
            {
                name: "Last Week",
                data: [13, 23, 20, 8, 13, 27, 33],
            },
        ],
        options: {
            chart: {
                height: 160,
                type: "bar",
                fontFamily: "Nunito, sans-serif",
                toolbar: {
                    show: false,
                },
                stacked: true,
                stackType: "100%",
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 1,
            },
            colors: ["#e2a03f", "#e0e6ed"],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: "bottom",
                            offsetX: -10,
                            offsetY: 0,
                        },
                    },
                },
            ],
            xaxis: {
                labels: {
                    show: false,
                },
                categories: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
            },
            yaxis: {
                show: false,
            },
            fill: {
                opacity: 1,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "25%",
                },
            },
            legend: {
                show: false,
            },
            grid: {
                show: false,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 10,
                    right: -20,
                    bottom: -20,
                    left: -20,
                },
            },
        },
    };

    //Total Orders
    const totalOrders: any = {
        series: [
            {
                name: "Sales",
                data: [28, 40, 36, 52, 38, 60, 38, 52, 36, 40],
            },
        ],
        options: {
            chart: {
                height: 290,
                type: "area",
                fontFamily: "Nunito, sans-serif",
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            colors: isDark ? ["#00ab55"] : ["#00ab55"],
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            yaxis: {
                min: 0,
                show: false,
            },
            grid: {
                padding: {
                    top: 125,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            fill: {
                opacity: 1,
                type: "gradient",
                gradient: {
                    type: "vertical",
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: 0.3,
                    opacityTo: 0.05,
                    stops: [100, 100],
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
            },
        },
    };

    return (
        <>
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link href="/" className="text-primary hover:underline">
                            Dashboard
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Keuangan</span>
                    </li>
                </ul>

                <div className="pt-5">
                    <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Total Balance */}
                        <div
                            className="panel grid h-full grid-cols-1 content-between overflow-hidden before:absolute before:-right-44 before:top-0 before:bottom-0 before:m-auto before:h-96 before:w-96 before:rounded-full before:bg-[#93c5fd]"
                            style={{
                                background: "linear-gradient(0deg,#7dd3fc -227%,#bfdbfe)",
                            }}
                        >
                            <div className="z-[7] mb-16 flex flex-col items-start justify-between text-black sm:flex-row">
                                <h5 className="text-lg font-semibold">Total Balance</h5>
                                <GiTakeMyMoney className="absolute bottom-2 right-5 h-24 w-24 text-white" />

                                <div className="relative whitespace-nowrap text-xl">
                                    Rp 41,741,000.42
                                    {/* <span className="mt-1 table rounded bg-[#4361ee] p-1 text-xs text-[#d3d3d3] ltr:ml-auto rtl:mr-auto">+ 2453</span> */}
                                </div>
                            </div>
                            <div className="z-10 flex items-center justify-between">
                                <div className="flex items-center justify-between">
                                    <div className="mt-5 flex items-center font-semibold text-black">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:mr-2 rtl:ml-2">
                                            <path
                                                opacity="0.5"
                                                d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                        Informasi Saldo Midtrans
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Setoran */}
                        <div
                            className="panel grid h-full grid-cols-1 content-between overflow-hidden before:absolute before:-right-44 before:top-0 before:bottom-0 before:m-auto before:h-96 before:w-96 before:rounded-full before:bg-[#c084fc]"
                            style={{
                                background: "linear-gradient(0deg,#e9d5ff -227%,#d8b4fe)",
                            }}
                        >
                            <div className="z-[7] mb-16 flex flex-col items-start justify-between text-black sm:flex-row">
                                <h5 className="text-lg font-semibold">Total Setoran</h5>
                                <FaMoneyBillTrendUp className="absolute bottom-4 right-5 h-20 w-20 text-white" />

                                <div className="relative whitespace-nowrap text-xl">Rp 41,741,000.42</div>
                            </div>
                            <div className="z-10 flex items-center justify-between">
                                <div className="flex items-center justify-between">
                                    <div className="mt-5 flex items-center font-semibold text-black">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:mr-2 rtl:ml-2">
                                            <path
                                                opacity="0.5"
                                                d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                        Informasi Saldo Setoran
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Tunggakan */}
                        <div
                            className="panel grid h-full grid-cols-1 content-between overflow-hidden before:absolute before:-right-44 before:top-0 before:bottom-0 before:m-auto before:h-96 before:w-96 before:rounded-full before:bg-[#e879f9]"
                            style={{
                                background: "linear-gradient(0deg,#fbcfe8 -227%,#f0abfc)",
                            }}
                        >
                            <div className="z-[7] mb-16 flex flex-col items-start justify-between text-black sm:flex-row">
                                <h5 className="text-lg font-semibold">Total Tunggakan</h5>
                                <GiArrest className="absolute bottom-4 right-5 h-20 w-20 text-white" />

                                <div className="relative whitespace-nowrap text-xl">Rp 41,741,000.42</div>
                            </div>
                            <div className="z-10 flex items-center justify-between">
                                <div className="flex items-center justify-between">
                                    <div className="mt-5 flex items-center font-semibold text-black">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:mr-2 rtl:ml-2">
                                            <path
                                                opacity="0.5"
                                                d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                        Informasi Saldo Tunggakan
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 grid gap-6 xl:grid-cols-3">
                        <div className="panel h-full xl:col-span-2">
                            <div className="mb-5 flex items-center justify-between dark:text-white-light">
                                <h5 className="text-lg font-semibold">Revenue</h5>
                                <div className="dropdown">
                                    <Dropdown
                                        offset={[0, 1]}
                                        placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                                        button={
                                            <svg className="h-5 w-5 text-black/70 hover:!text-primary dark:text-white/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                                <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                                <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                        }
                                    >
                                        <ul>
                                            <li>
                                                <button type="button">Weekly</button>
                                            </li>
                                            <li>
                                                <button type="button">Monthly</button>
                                            </li>
                                            <li>
                                                <button type="button">Yearly</button>
                                            </li>
                                        </ul>
                                    </Dropdown>
                                </div>
                            </div>
                            <p className="text-lg dark:text-white-light/90">
                                Total Profit <span className="ml-2 text-primary">Rp 980.000.000</span>
                            </p>
                            <div className="relative">
                                <div className="rounded-lg bg-white dark:bg-black">
                                    {isMounted ? (
                                        <ReactApexChart series={revenueChart.series} options={revenueChart.options} type="area" height={325} width={"100%"} />
                                    ) : (
                                        <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                            <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="panel h-full">
                            <div className="mb-5 flex items-center">
                                <h5 className="text-lg font-semibold dark:text-white-light">Jumlah Siswa</h5>
                            </div>
                            <div>
                                <div className="rounded-lg bg-white dark:bg-black">
                                    {isMounted ? (
                                        <ReactApexChart series={salesByCategory.series} options={salesByCategory.options} type="donut" height={460} width={"100%"} />
                                    ) : (
                                        <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                            <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid">
                        <div className="panel h-full w-full">
                            <div className="mb-5 flex items-center justify-between">
                                <h5 className="text-lg font-semibold dark:text-white-light">Rekapitulasi Penerimaan Hari Ini</h5>
                            </div>
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="ltr:rounded-l-md rtl:rounded-r-md">Ref Bank</th>
                                            <th>Nilai</th>
                                            <th>Biaya MDR</th>
                                            <th className="ltr:rounded-r-md rtl:rounded-l-md">Net Ke GO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                            <td className="min-w-[150px] text-black dark:text-white">
                                                <span className="whitespace-nowrap">Tunai</span>
                                            </td>
                                            <td>Rp 325.000.00</td>
                                            <td>Rp 150.000</td>
                                            <td>Rp 125.000.00</td>
                                        </tr>
                                        <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                            <td className="min-w-[150px] text-black dark:text-white">
                                                <span className="whitespace-nowrap">BNI</span>
                                            </td>
                                            <td>Rp 125.000.00</td>
                                            <td>Rp 250.000</td>
                                            <td>Rp 125.000.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;
