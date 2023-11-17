import { dashboardMenu } from "./dashboardMenu";
import { menuSmba } from "./menuSmba";
import { menuGoIcons } from "./menuGoIcons";
import { menuGoProduk } from "./menuGoProduk";
import { menuIdpp } from "./menuIdpp";
import { menuGoKasir } from "./menuGoKasir";
import { menuGoBimbel } from "./menuGoBimbel";

import { menuMaster } from "./menuMaster";
import { menumateri } from "./menuMateri";
import { menuProduk } from "./menuProduk";
import { menuDiskon } from "./menuDiskon";
import { menuSiswa } from "./menuSiswa";
import { menuPengajar } from "./menuPengajar";
import { menuPayment } from "./menuPayment";

const menus = [
    ...dashboardMenu,
    ...menuSmba,
    ...menuGoIcons,
    ...menuGoProduk,
    ...menuGoKasir,
    ...menuIdpp,
    ...menuGoBimbel,
    // ...menuMaster,
    // ...menumateri,
    // ...menuProduk,
    // ...menuDiskon,
    // ...menuSiswa,
    // ...menuPengajar,
    // ...menuPayment,
];

export default menus;
