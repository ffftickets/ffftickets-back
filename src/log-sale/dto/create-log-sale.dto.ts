
import { IpDetail, UserAgentDto } from 'src/login-logs/dto';

export class CreateLogSaleDto {
  action?:string;
  user?:string;
  data?:any;
  ipDetail?: IpDetail;
  userAgent?: UserAgentDto;
}

