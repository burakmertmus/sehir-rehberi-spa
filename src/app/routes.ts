import { Routes } from "@angular/router"
import { CityComponent } from "./city/city.component"
import { CityAddComponent } from "./city/cityAdd/cityAdd.component";
import { CityDetailComponent } from "./city/cityDetail/cityDetail.component";
import { ValueComponent } from "./value/value.component"

export const appRoutes: Routes = [
    { path: "city", component: CityComponent },
{ path: "cityadd", component: CityAddComponent },
{ path: "value", component: ValueComponent },
{ path: "cityDetail/:cityId", component: CityDetailComponent },
{ path: "**", redirectTo: "city", pathMatch: "full" }
];
