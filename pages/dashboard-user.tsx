import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store";
import PerfectScrollbar from "react-perfect-scrollbar";
import Dropdown from "../components/Ui/Dropdown";
import { useEffect, useState } from "react";
import { setPageTitle } from "../store/themeConfigSlice";
import { FaUserGraduate, FaPersonBooth } from "react-icons/fa";
import { RiParentFill } from "react-icons/ri";
import { GiTeacher, GiLuckyFisherman } from "react-icons/gi";
import { BiBookReader } from "react-icons/bi";
import {
    siswa,
    orangtua,
    guest,
    pengajar,
    superadmin,
    adminsoalmateri,
    adminmanagement,
    adminmanagementpengajar,
    adminkasir,
    adminmarketing,
    admincabang,
    admingedung,
    adminverifikator,
} from "@/data/dashboard-user-chart";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const Analytics = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle("Dashboard Siswa"));
    });

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === "dark" ? true : false;
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl" ? true : false;
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    });

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>User</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-6 grid gap-6 sm:grid-cols-3 xl:grid-cols-5">
                    {/* siswa */}
                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary dark:text-white-light">
                                <FaUserGraduate className="h-4 w-4 text-indigo-500 dark:text-white-light" />
                            </div>
                            <div className="font-semibold ltr:ml-3 rtl:mr-3">
                                <p className="text-xl dark:text-white-light">31.6K</p>
                                <h5 className="text-xs text-[#506690]">Siswa</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            {isMounted && <ReactApexChart series={siswa.series} options={siswa.options} type="area" height={160} width={"100%"} className="absolute bottom-0 w-full" />}
                        </div>
                    </div>
                    {/* Orang Tua */}
                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-primary dark:bg-amber-500 dark:text-white-light">
                                <RiParentFill className="h-4 w-4 text-amber-500 dark:text-white-light" />
                            </div>
                            <div className="font-semibold ltr:ml-3 rtl:mr-3">
                                <p className="text-xl dark:text-white-light">31.6K</p>
                                <h5 className="text-xs text-[#506690]">Orang Tua</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            {isMounted && <ReactApexChart series={orangtua.series} options={orangtua.options} type="area" height={160} width={"100%"} className="absolute bottom-0 w-full" />}
                        </div>
                    </div>

                    {/* Guest */}
                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f5f3ff] text-primary dark:bg-[#8b5cf6] dark:text-white-light">
                                <FaPersonBooth className="h-4 w-4 text-[#8b5cf6] dark:text-white-light" />
                            </div>
                            <div className="font-semibold ltr:ml-3 rtl:mr-3">
                                <p className="text-xl dark:text-white-light">31.6K</p>
                                <h5 className="text-xs text-[#506690]">Guest</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            {isMounted && <ReactApexChart series={guest.series} options={guest.options} type="area" height={160} width={"100%"} className="absolute bottom-0 w-full" />}
                        </div>
                    </div>

                    {/* Pengajar */}
                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-danger/10 text-danger dark:bg-danger dark:text-white-light">
                                <GiTeacher className="h-4 w-4 text-danger dark:text-white-light" />
                            </div>
                            <div className="font-semibold ltr:ml-3 rtl:mr-3">
                                <p className="text-xl dark:text-white-light">1.9K</p>
                                <h5 className="text-xs text-[#506690]">Pengajar</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            {isMounted && <ReactApexChart series={pengajar.series} options={pengajar.options} type="area" height={160} width={"100%"} className="absolute bottom-0 w-full" />}
                        </div>
                    </div>

                    {/* Super Admin */}
                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success/10 text-success dark:bg-success dark:text-white-light">
                                <GiLuckyFisherman className="h-4 w-4 text-success dark:text-white-light" />
                            </div>
                            <div className="font-semibold ltr:ml-3 rtl:mr-3">
                                <p className="text-xl dark:text-white-light">18.2K</p>
                                <h5 className="text-xs text-[#506690]">Super Admin</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            {isMounted && <ReactApexChart series={superadmin.series} options={superadmin.options} type="area" height={160} width={"100%"} className="absolute bottom-0 w-full" />}
                        </div>
                    </div>

                    {/* adminsoalmateri */}
                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-primary dark:bg-green-500 dark:text-white-light">
                                <BiBookReader className="h-4 w-4 text-green-500 dark:text-white-light" />
                            </div>
                            <div className="font-semibold ltr:ml-3 rtl:mr-3">
                                <p className="text-xl dark:text-white-light">31.6K</p>
                                <h5 className="text-xs text-[#506690]">Admin Soal & Materi</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            {isMounted && (
                                <ReactApexChart series={adminsoalmateri.series} options={adminsoalmateri.options} type="area" height={160} width={"100%"} className="absolute bottom-0 w-full" />
                            )}
                        </div>
                    </div>

                    {/* Admin Management */}
                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fdf4ff] text-primary dark:bg-[#d946ef] dark:text-white-light">
                                <RiParentFill className="h-4 w-4 text-[#d946ef] dark:text-white-light" />
                            </div>
                            <div className="font-semibold ltr:ml-3 rtl:mr-3">
                                <p className="text-xl dark:text-white-light">31.6K</p>
                                <h5 className="text-xs text-[#506690]">Admin Management</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            {isMounted && (
                                <ReactApexChart series={adminmanagement.series} options={adminmanagement.options} type="area" height={160} width={"100%"} className="absolute bottom-0 w-full" />
                            )}
                        </div>
                    </div>

                    {/* Admin Management Pengajar */}
                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-primary dark:bg-teal-500 dark:text-white-light">
                                <FaPersonBooth className="h-4 w-4 text-teal-500 dark:text-white-light" />
                            </div>
                            <div className="font-semibold ltr:ml-3 rtl:mr-3">
                                <p className="text-xl dark:text-white-light">31.6K</p>
                                <h5 className="text-xs text-[#506690]">Admin Management Pengajar</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            {isMounted && (
                                <ReactApexChart
                                    series={adminmanagementpengajar.series}
                                    options={adminmanagementpengajar.options}
                                    type="area"
                                    height={160}
                                    width={"100%"}
                                    className="absolute bottom-0 w-full"
                                />
                            )}
                        </div>
                    </div>

                    {/* Admin Kasir */}
                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-50 text-danger dark:bg-lime-500 dark:text-white-light">
                                <GiTeacher className="h-4 w-4 text-lime-500 dark:text-white-light" />
                            </div>
                            <div className="font-semibold ltr:ml-3 rtl:mr-3">
                                <p className="text-xl dark:text-white-light">1.9K</p>
                                <h5 className="text-xs text-[#506690]">Admin Kasir</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            {isMounted && <ReactApexChart series={adminkasir.series} options={adminkasir.options} type="area" height={160} width={"100%"} className="absolute bottom-0 w-full" />}
                        </div>
                    </div>

                    {/* Admin Marketing */}
                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-success dark:bg-cyan-500 dark:text-white-light">
                                <GiLuckyFisherman className="h-4 w-4 text-cyan-500 dark:text-white-light" />
                            </div>
                            <div className="font-semibold ltr:ml-3 rtl:mr-3">
                                <p className="text-xl dark:text-white-light">18.2K</p>
                                <h5 className="text-xs text-[#506690]">Admin Marketing</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            {isMounted && (
                                <ReactApexChart series={adminmarketing.series} options={adminmarketing.options} type="area" height={160} width={"100%"} className="absolute bottom-0 w-full" />
                            )}
                        </div>
                    </div>

                    {/* Admin Cabang */}
                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50 text-primary dark:bg-pink-500 dark:text-white-light">
                                <FaUserGraduate className="h-4 w-4 text-pink-500 dark:text-white-light" />
                            </div>
                            <div className="font-semibold ltr:ml-3 rtl:mr-3">
                                <p className="text-xl dark:text-white-light">31.6K</p>
                                <h5 className="text-xs text-[#506690]">Admin Cabang</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            {isMounted && <ReactApexChart series={admincabang.series} options={admincabang.options} type="area" height={160} width={"100%"} className="absolute bottom-0 w-full" />}
                        </div>
                    </div>

                    {/* Admin Gedung */}
                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8fafc] text-primary dark:bg-[#64748b] dark:text-white-light">
                                <RiParentFill className="h-4 w-4 text-[#64748b] dark:text-white-light" />
                            </div>
                            <div className="font-semibold ltr:ml-3 rtl:mr-3">
                                <p className="text-xl dark:text-white-light">31.6K</p>
                                <h5 className="text-xs text-[#506690]">Admin Gedung</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            {isMounted && <ReactApexChart series={admingedung.series} options={admingedung.options} type="area" height={160} width={"100%"} className="absolute bottom-0 w-full" />}
                        </div>
                    </div>

                    {/* Admin Verifikator */}
                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ecfeff] text-primary dark:bg-[#0369a1] dark:text-white-light">
                                <FaPersonBooth className="h-4 w-4 text-[#0369a1] dark:text-white-light" />
                            </div>
                            <div className="font-semibold ltr:ml-3 rtl:mr-3">
                                <p className="text-xl dark:text-white-light">31.6K</p>
                                <h5 className="text-xs text-[#506690]">Admin Verifikator</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            {isMounted && (
                                <ReactApexChart series={adminverifikator.series} options={adminverifikator.options} type="area" height={160} width={"100%"} className="absolute bottom-0 w-full" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
