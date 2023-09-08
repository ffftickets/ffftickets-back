export class UserAgentDto {
  userAgent: string;
  browser: {
    name: string;
    version: string;
    major: string;
  };

  engine: {
    name: string;
    version: string;
  };

  os: {
    name: string;
    version: string;
  };

  device: {
    model: string;
    type: string;
    vendor: string;
  };

  cpu: {
    architecture: string;
  };
}
export class IpDetail {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}
export class CreateLoginLogDto {
  email: string;
  blockStatus: string;
  ipDetail: IpDetail;
  userAgent?: UserAgentDto;
  isCorrect: boolean;
}
