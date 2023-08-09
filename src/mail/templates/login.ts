import { addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { format } from 'date-fns-tz';
import { LoginMailDto } from '../dto';

export const loginMail = (data: LoginMailDto) => {
  const { name, ip, location, provider } = data;

  const currentDate = format(new Date(), "dd 'de' MMMM 'de' yyyy  'a las' HH:mm", {
    timeZone: 'America/Guayaquil',
    locale: es,
  });
  return `<!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
  
  <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
      <style>
          * {
              box-sizing: border-box;
              color: #474848;
          }
  
          body {
              margin: 0;
              padding: 0;
          }
  
          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
          }
  
          #MessageViewBody a {
              color: inherit;
              text-decoration: none;
          }
  
          p {
              line-height: inherit
          }
  
          .desktop_hide,
          .desktop_hide table {
              mso-hide: all;
              display: none;
              max-height: 0px;
              overflow: hidden;
          }
  
          .image_block img+div {
              display: none;
          }
  
          .table_detail {
              padding-top: 10px;
              color: #474848;
              font-family: 'Rubik', sans-serif;
          }
  
          .table_detail_title {
              font-weight: bold;
              font-family: 'Raleway', sans-serif !important;
          }
  
          @media (max-width:670px) {
              .desktop_hide table.icons-inner {
                  display: inline-block !important;
              }
  
              .icons-inner {
                  text-align: center;
              }
  
              .icons-inner td {
                  margin: 0 auto;
              }
  
              .image_block img.big,
              .row-content {
                  width: 100% !important;
              }
  
              .mobile_hide {
                  display: none;
              }
  
              .stack .column {
                  width: 100%;
                  display: block;
              }
  
              .mobile_hide {
                  min-height: 0;
                  max-height: 0;
                  max-width: 0;
                  overflow: hidden;
                  font-size: 0px;
              }
  
              .desktop_hide,
              .desktop_hide table {
                  display: table !important;
                  max-height: none !important;
              }
          }
      </style>
  </head>
  
  <body style="background-color: #f9f9fa; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none; display: grid; place-items: center;">
      <table class="nl-container" width="95%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9fa;">
          <tbody>
              <tr>
                  <td>
                      <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
                          <tbody>
                              <tr>
                                  <td>
                                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 650px;" width="650">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                      <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                          <tr>
                                                              <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                                                  <div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://firebasestorage.googleapis.com/v0/b/barbados1569-47458.appspot.com/o/vencedores%2Flogo.png?alt=media&token=6bb12dc3-5d09-41c4-b828-08e69f01085d" style="display: block; height: auto; border: 0; width: 358px; max-width: 100%;" width="358"></div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
                          <tbody>
                              <tr>
                                  <td>
                                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 650px;" width="650">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 10px; padding-left: 25px; padding-right: 25px; padding-top: 10px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                      <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                          <tr>
                                                              <td class="pad">
                                                                  <div style="color:#101112;direction:ltr;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                      <p style="margin: 0; font-family: 'Rubik', sans-serif; color: #474848"><strong style="font-family: 'Raleway', sans-serif;">Fecha y hora:&nbsp;</strong>${currentDate}</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
                          <tbody>
                              <tr>
                                  <td>
                                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 650px; border: solid 1px #abacab; border-radius: 30px;" width="650" >
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 35px; padding-left: 25px; padding-right: 25px; padding-top: 10px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                      <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                          <tr>
                                                              <td class="pad">
                                                                  <div style="color:#101112;direction:ltr;	font-family: 'Raleway', sans-serif;font-size:26px;font-weight:400;line-height:120%;text-align:center;mso-line-height-alt:31.2px;">
                                                                      <p style="margin: 0; margin-bottom: 7px; color: #474848"><strong>INICIO DE SESIÓN</strong></p>
                                                      
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
  
                                                      <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                          <tr>
                                                              <td class="pad" style="padding-top:5px;">
                                                                  <div style="color:#201f42;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:24px;font-weight:400;letter-spacing:0px;line-height:180%;text-align:left;mso-line-height-alt:43.2px;">
                                                                      <p style="margin: 0; font-family: 'Raleway', sans-serif; color: #474848;"> <strong>¡Hola </strong> <strong style="color:#232a74;"> ${name}!</strong></p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                          <tr>
                                                              <td class="pad" style="padding-top:20px;">
                                                                  <div style="color:#201f42;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:18px;font-weight:400;letter-spacing:0px;line-height:180%;text-align:left;mso-line-height-alt:32.4px;">
                                                                      <p style="margin: 0; font-family: 'Raleway', sans-serif; color: #474848;">Tu inicio de sesión se ha realizado con éxito.</strong> A continuación le presentamos el detalle:</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table class="paragraph_block block-5" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                          <tr>
                                                              <td class="pad">
                                                                  <div  align="center" style="color:#101112;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px; display: flex; justify-content: center">
                                                                      <table class="paragraph_block block-4" width="80%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word; margin-top: 20px; margin-bottom: 20px;">
                                                                          <tr>
                                                                              <td colspan="2" style="background-color: #f0f0ef;">
                                                                              <p style="padding-left: 20px; font-size: 24px; font-family: 'Raleway', sans-serif; color: #474848; font-weight: bold; text-align: center;"  align="center">Detalle</p>
                                                                              </td>
                                                                          </tr>
                                                                          <tr>
                                                                              <td class="table_detail table_detail_title">
                                                                                  IP
                                                                              </td>
                                                                              <td class="table_detail">
                                                                                  ${ip}
                                                                              </td>
                                                                          </tr>
                                                                          <tr>
                                                                              <td class="table_detail table_detail_title">
                                                                                  Ubicación:
                                                                              </td>
                                                                              <td class="table_detail">
                                                                                  ${location}
                                                                              </td>
                                                                          </tr>
                                                                          <tr>
                                                                              <td class="table_detail table_detail_title">
                                                                                  Proveedor de servicio de internet:
                                                                              </td>
                                                                              <td class="table_detail">
                                                                                  ${provider}
                                                                              </td>
                                                                          </tr>
                                                                          
                                                                          
                                                                      </table>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  
                                                      
                                                      <table class="paragraph_block block-6" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                          <tr>
                                                              <td class="pad">
                                                                  <div style="color:#101112;direction:ltr;display: grid;place-items: center;font-family: 'Raleway', sans-serif; color: #474848;font-size:18px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:21.599999999999998px;">
                                                                      <p style="margin: 0; text-align: center; width: 90%;">Este correo es informativo y no puede ser responderse.</p>
                                                                      <p style="margin: 0; text-align: center; width: 90%;">Si no fuiste tu quien realizo la acción que notificamos , puedes contactarte a <strong style="color: #232a74;">(03)2 426821</strong></p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
                          <tbody>
                              <tr>
                                  <td>
                                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 650px;" width="650">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 25px; padding-left: 25px; padding-right: 25px; padding-top: 10px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                      <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                          <tr>
                                                              <td class="pad">
                                                                  <div style="color:#101112;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:17px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:20.4px;">
                                                                      <p style="margin: 0;font-family: 'Raleway', sans-serif; color: #474848;  font-weight:20px !important;"><strong style="color: #232a74;">¡Gracias por usar</strong> <strong style="color: #232a74; font-weight: 900;">Vencedores!</strong></p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
                          <tbody>
                              <tr>
                                  <td>
                                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 650px;" width="650">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                      <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                          <tr>
                                                              <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;  display: grid; place-items: center;">
                                                                  <div class="alignment" align="center" style="line-height:10px; width: 90%;"><img class="big" src="https://firebasestorage.googleapis.com/v0/b/barbados1569-47458.appspot.com/o/vencedores%2Fredes.png?alt=media&token=2c8172bb-6ab8-431e-9ae6-fb0f0f4ebf71" style="display: block; height: auto; border: 0; width: 358px; max-width: 100%;" width="358"></div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
              </tr>
          </tbody>
      </table><!-- End -->
  </body>
  
  </html>`;
};
