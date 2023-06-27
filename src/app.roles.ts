import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  ADMIN = 'ADMIN',
  ORGANIZER = 'ORGANIZER',
  PROMOTER = 'PROMOTER',
  CUSTOMER = 'CUSTOMER',
}

export enum AppResource {
  USER = 'USER',
  LICENSE = 'LICENSE',
  EVENT_TYPE = 'EVENT_TYPE',
  EVENT = 'EVENT',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  // USER ROLES
  .grant(AppRoles.CUSTOMER)
  .updateAny([AppResource.USER])
  .readAny([AppResource.EVENT_TYPE,AppResource.EVENT])

  //ORGANIZER ROLES
  .grant(AppRoles.ORGANIZER)
  .extend(AppRoles.CUSTOMER)
  .readAny([AppResource.LICENSE])
  .createAny([AppResource.EVENT])
  .updateAny([AppResource.EVENT])
  .deleteAny([AppResource.EVENT])

  // ADMIN ROLES
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.ORGANIZER)
  .readAny([AppResource.USER])
  .createAny([AppResource.USER, AppResource.LICENSE, AppResource.EVENT_TYPE])
  .updateAny([AppResource.USER, AppResource.LICENSE, AppResource.EVENT_TYPE])
  .deleteAny([AppResource.USER, AppResource.LICENSE, AppResource.EVENT_TYPE]);
