"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = exports.AppResource = exports.AppRoles = void 0;
const nest_access_control_1 = require("nest-access-control");
var AppRoles;
(function (AppRoles) {
    AppRoles["ADMIN"] = "ADMIN";
    AppRoles["ORGANIZER"] = "ORGANIZER";
    AppRoles["PROMOTER"] = "PROMOTER";
    AppRoles["CUSTOMER"] = "CUSTOMER";
})(AppRoles = exports.AppRoles || (exports.AppRoles = {}));
var AppResource;
(function (AppResource) {
    AppResource["USER"] = "USER";
    AppResource["LICENSE"] = "LICENSE";
    AppResource["EVENT_TYPE"] = "EVENT_TYPE";
    AppResource["EVENT"] = "EVENT";
})(AppResource = exports.AppResource || (exports.AppResource = {}));
exports.roles = new nest_access_control_1.RolesBuilder();
exports.roles
    .grant(AppRoles.CUSTOMER)
    .updateAny([AppResource.USER])
    .readAny([AppResource.EVENT])
    .grant(AppRoles.ORGANIZER)
    .extend(AppRoles.CUSTOMER)
    .readAny([AppResource.LICENSE])
    .createAny([AppResource.EVENT])
    .updateAny([AppResource.EVENT])
    .deleteAny([AppResource.EVENT])
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.ORGANIZER)
    .readAny([AppResource.USER])
    .createAny([AppResource.USER, AppResource.LICENSE, AppResource.EVENT_TYPE])
    .updateAny([AppResource.USER, AppResource.LICENSE, AppResource.EVENT_TYPE])
    .deleteAny([AppResource.USER, AppResource.LICENSE, AppResource.EVENT_TYPE]);
//# sourceMappingURL=app.roles.js.map