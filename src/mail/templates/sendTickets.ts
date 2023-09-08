import { addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { format } from 'date-fns-tz';
import { LoginMailDto, TicketsEmailDto } from '../dto';
import * as qrcode from 'qrcode';
import * as fs from 'fs';
import * as path from 'path';

import { ConfigService } from '@nestjs/config';

export const sendTickets = async (data: TicketsEmailDto) => {

  console.log(data)
  const currentDate = format(
    new Date(),
    "dd 'de' MMMM 'de' yyyy  'a las' HH:mm",
    {
      timeZone: 'America/Guayaquil',
      locale: es,
    },
  );

let contenidoHTML = '';
let qrIndex=1;
  for (const locality of data.localities) {
    for(const qr of locality.qrs){
       

    contenidoHTML += `
    <div
    class="u-row-container"
    style="padding: 0px; background-color: #843fa1; border-bottom: 1px solid #843fa1;"
  >
    <div
      class="u-row"
      style="
        margin: 0 auto;
        min-width: 320px;
        max-width: 600px;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word;
        background-color: #ffffff;
      "
    >
      <div
        style="
          border-collapse: collapse;
          display: table;
          width: 100%;
          height: 100%;
          background-color: transparent;
        "
      >
         <div
          class="u-col u-col-33p33"
          style="
            max-width: 320px;
            min-width: 200px;
            display: table-cell;
            vertical-align: top;
          "
        >
          <div
            style="
              height: 100%;
              width: 100% !important;
              border-radius: 0px;
              -webkit-border-radius: 0px;
              -moz-border-radius: 0px;
            "
          >
           <div
              class="v-col-border"
              style="
                box-sizing: border-box;
                height: 100%;
                padding: 0px;
                border-top: 0px solid transparent;
                border-left: 0px solid transparent;
                border-right: 0px solid transparent;
                border-bottom: 0px solid transparent;
                border-radius: 0px;
                -webkit-border-radius: 0px;
                -moz-border-radius: 0px;
              "
            >
              <table
                style="font-family: 'Raleway', sans-serif"
                role="presentation"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                border="0"
              >
                <tbody>
                  <tr>
                    <td
                      class="v-container-padding-padding"
                      style="
                        overflow-wrap: break-word;
                        word-break: break-word;
                        padding: 10px;
                        font-family: 'Raleway', sans-serif;
                      "
                      align="left"
                    >
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                      >
                        <tr>
                          <td
                            class="v-text-align"
                            style="
                              padding-right: 0px;
                              padding-left: 0px;
                            "
                            align="center"
                          >
                            <img
                              align="center"
                              border="0"
                              src="${data.event.poster}"
                              alt=""
                              title=""
                              style="
                                outline: none;
                                text-decoration: none;
                                -ms-interpolation-mode: bicubic;
                                clear: both;
                                display: inline-block !important;
                                border: none;
                                height: auto;
                                float: none;
                                width: 100%;
                                max-width: 180px;
                              "
                              width="180"
                              class="v-src-width v-src-max-width"
                            />
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

             
            </div>
           
          </div>
        </div>
        <div
          class="u-col u-col-66p67"
          style="
            max-width: 320px;
            min-width: 400px;
            display: table-cell;
            vertical-align: top;
          "
        >
          <div
            style="
              height: 100%;
              width: 100% !important;
              border-radius: 0px;
              -webkit-border-radius: 0px;
              -moz-border-radius: 0px;
            "
          >
         <div
              class="v-col-border"
              style="
                box-sizing: border-box;
                height: 100%;
                padding: 0px;
                border-top: 0px solid transparent;
                border-left: 0px solid transparent;
                border-right: 0px solid transparent;
                border-bottom: 0px solid transparent;
                border-radius: 0px;
                -webkit-border-radius: 0px;
                -moz-border-radius: 0px;
              "
            >
              <table
                style="font-family: 'Raleway', sans-serif"
                role="presentation"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                border="0"
              >
                <tbody>
                  <tr>
                    <td
                      class="v-container-padding-padding"
                      style="
                        overflow-wrap: break-word;
                        word-break: break-word;
                        padding: 10px;
                        font-family: 'Raleway', sans-serif;
                      "
                      align="left"
                    >
                      <div>
                        <html>
                          <table
                            width="100%"
                            align="center"
                            border="1"
                            cellpadding="5"
                            cellspacing="0"
                          >
                            <tr>
                              <td><b>${data.event.name}</b></td>
                              <td rowspan="4">
                              <img src="${qr}" alt="QR">
                              </td>
                            </tr>
                            <tr>
                              <td><b>${locality.localityName}</b></td>
                            </tr>
                            <tr>
                              <td>${data.event.event_date}</td>
                            </tr>
                            <tr>
                              <td>${data.event.user.name}</td>
                            </tr>

                            <tr>
                              <td>NUMERO DE TICKET</td>
                              <td>${qrIndex}</td>
                            </tr>
                            <tr>
                              <td>COMPRADOR</td>
                              <td>${data.name}</td>
                            </tr>
                          </table>
                        </html>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    qrIndex++; // Incrementa el contador de índices
        }
 
  }



  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
  >
    <head>
      <!--[if gte mso 9]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG />
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <!--<![endif]-->
      <title></title>
  
      <style type="text/css">
        @media only screen and (min-width: 620px) {
          .u-row {
            width: 600px !important;
          }
          .u-row .u-col {
            vertical-align: top;
          }
  
          .u-row .u-col-33p33 {
            width: 199.98px !important;
          }
  
          .u-row .u-col-66p67 {
            width: 400.02px !important;
          }
  
          .u-row .u-col-100 {
            width: 600px !important;
          }
        }
  
        @media (max-width: 620px) {
          .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }
          .u-row .u-col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
          .u-row {
            width: 100% !important;
          }
          .u-col {
            width: 100% !important;
          }
          .u-col > div {
            margin: 0 auto;
          }
        }
        body {
          margin: 0;
          padding: 0;
        }
  
        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }
  
        p {
          margin: 0;
        }
  
        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }
  
        * {
          line-height: inherit;
        }
  
        a[x-apple-data-detectors="true"] {
          color: inherit !important;
          text-decoration: none !important;
        }
  
        @media (max-width: 480px) {
          .hide-mobile {
            max-height: 0px;
            overflow: hidden;
            display: none !important;
          }
        }
  
        table,
        td {
          color: #000000;
        }
        #u_body a {
          color: #f1c40f;
          text-decoration: underline;
        }
        @media (max-width: 480px) {
          #u_content_image_1 .v-container-padding-padding {
            padding: 4px !important;
          }
          #u_content_image_1 .v-src-width {
            width: auto !important;
          }
          #u_content_image_1 .v-src-max-width {
            max-width: 50% !important;
          }
          #u_content_image_1 .v-text-align {
            text-align: center !important;
          }
          #u_column_1 .v-col-border {
            border-top: 0px solid transparent !important;
            border-left: 0px solid transparent !important;
            border-right: 0px solid transparent !important;
            border-bottom: 0px solid transparent !important;
          }
          #u_content_menu_1 .v-layout-display {
            display: block !important;
          }
          #u_content_menu_1 .v-padding {
            padding: 5px !important;
          }
          #u_content_text_5 .v-container-padding-padding {
            padding: 25px 10px !important;
          }
        }
      </style>
  
      <!--[if !mso]><!-->
      <link
        href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap"
        rel="stylesheet"
        type="text/css"
      />
      <!--<![endif]-->
    </head>
  
    <body
      class="clean-body u_body"
      style="
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        background-color: #000325;
        color: #000000;
      "
    >
     
      <table
        id="u_body"
        style="
          border-collapse: collapse;
          table-layout: fixed;
          border-spacing: 0;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          vertical-align: top;
          min-width: 320px;
          margin: 0 auto;
          background-color: #000325;
          width: 100%;
        "
        cellpadding="0"
        cellspacing="0"
      >
        <tbody>
          <tr style="vertical-align: top">
            <td
              style="
                word-break: break-word;
                border-collapse: collapse !important;
                vertical-align: top;
              "
            >
            
              <div
                class="u-row-container"
                style="padding: 0px; background-color: #843fa1"
              >
                <div
                  class="u-row"
                  style="
                    margin: 0 auto;
                    min-width: 320px;
                    max-width: 600px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    background-color: #843fa1;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      height: 100%;
                      background-color: transparent;
                    "
                  >
                         <div
                      class="u-col u-col-100"
                      style="
                        max-width: 320px;
                        min-width: 600px;
                        display: table-cell;
                        vertical-align: top;
                      "
                    >
                      <div
                        style="
                          height: 100%;
                          width: 100% !important;
                          border-radius: 0px;
                          -webkit-border-radius: 0px;
                          -moz-border-radius: 0px;
                        "
                      >
                        <!--[if (!mso)&(!IE)]><!--><div
                          class="v-col-border"
                          style="
                            box-sizing: border-box;
                            height: 100%;
                            padding: 0px;
                            border-top: 0px solid transparent;
                            border-left: 0px solid transparent;
                            border-right: 0px solid transparent;
                            border-bottom: 0px solid transparent;
                            border-radius: 0px;
                            -webkit-border-radius: 0px;
                            -moz-border-radius: 0px;
                          "
                        ><!--<![endif]-->
                          <table
                            style="font-family: 'Raleway', sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="v-container-padding-padding"
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    padding: 10px;
                                    font-family: 'Raleway', sans-serif;
                                  "
                                  align="left"
                                >
                                  <div
                                    class="v-text-align"
                                    style="
                                      font-size: 14px;
                                      line-height: 140%;
                                      text-align: left;
                                      word-wrap: break-word;
                                    "
                                  >
                                    <p style="line-height: 140%">
                                      <span
                                        style="
                                          color: #843fa1;
                                          line-height: 19.6px;
                                        "
                                        >Email enviado por FFFTickets </span
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                       
                        </div>
                       
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>
  
              <div
                class="u-row-container"
                style="padding: 0px; background-color: #843fa1"
              >
                <div
                  class="u-row"
                  style="
                    margin: 0 auto;
                    min-width: 320px;
                    max-width: 600px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    background-color: #ffffff;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      height: 100%;
                      background-color: transparent;
                    "
                  >
                  
                    <div
                      class="u-col u-col-100"
                      style="
                        max-width: 320px;
                        min-width: 600px;
                        display: table-cell;
                        vertical-align: top;
                      "
                    >
                      <div
                        style="
                          height: 100%;
                          width: 100% !important;
                          border-radius: 0px;
                          -webkit-border-radius: 0px;
                          -moz-border-radius: 0px;
                        "
                      >
                        <!--[if (!mso)&(!IE)]><!--><div
                          class="v-col-border"
                          style="
                            box-sizing: border-box;
                            height: 100%;
                            padding: 0px;
                            border-top: 0px solid transparent;
                            border-left: 0px solid transparent;
                            border-right: 0px solid transparent;
                            border-bottom: 0px solid transparent;
                            border-radius: 0px;
                            -webkit-border-radius: 0px;
                            -moz-border-radius: 0px;
                          "
                        ><!--<![endif]-->
                          <table
                            id="u_content_image_1"
                            style="font-family: 'Raleway', sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="v-container-padding-padding"
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    padding: 0px;
                                    font-family: 'Raleway', sans-serif;
                                  "
                                  align="left"
                                >
                                  <table
                                    width="100%"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                  >
                                    <tr>
                                      <td
                                        class="v-text-align"
                                        style="
                                          padding-right: 0px;
                                          padding-left: 0px;
                                        "
                                        align="center"
                                      >
                                        <a
                                          href="https://ffftickets.com/"
                                          target="_blank"
                                        >
                                          <img
                                            align="center"
                                            border="0"
                                            src="${data.event.poster}"
                                            alt="image"
                                            title="image"
                                            style="
                                              outline: none;
                                              text-decoration: none;
                                              -ms-interpolation-mode: bicubic;
                                              clear: both;
                                              display: inline-block !important;
                                              border: none;
                                              height: auto;
                                              float: none;
                                              width: 50%;
                                              max-width: 300px;
                                            "
                                            width="300"
                                            class="v-src-width v-src-max-width"
                                          />
                                        </a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                        </div>
                      
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>
  
              <div
                class="u-row-container"
                style="padding: 0px; background-color: #843fa1"
              >
                <div
                  class="u-row"
                  style="
                    margin: 0 auto;
                    min-width: 320px;
                    max-width: 600px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    background-color: #ffffff;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      height: 100%;
                      background-color: transparent;
                    "
                  >
                    <div
                      class="u-col u-col-100"
                      style="
                        max-width: 320px;
                        min-width: 600px;
                        display: table-cell;
                        vertical-align: top;
                      "
                    >
                      <div
                        style="
                          height: 100%;
                          width: 100% !important;
                          border-radius: 0px;
                          -webkit-border-radius: 0px;
                          -moz-border-radius: 0px;
                        "
                      >
                      <div
                          class="v-col-border"
                          style="
                            box-sizing: border-box;
                            height: 100%;
                            padding: 0px;
                            border-top: 0px solid transparent;
                            border-left: 0px solid transparent;
                            border-right: 0px solid transparent;
                            border-bottom: 0px solid transparent;
                            border-radius: 0px;
                            -webkit-border-radius: 0px;
                            -moz-border-radius: 0px;
                          "
                        ><!--<![endif]-->
                          <table
                            style="font-family: 'Raleway', sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="v-container-padding-padding"
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    padding: 10px 25px;
                                    font-family: 'Raleway', sans-serif;
                                  "
                                  align="left"
                                >
                                  <div
                                    class="v-text-align"
                                    style="
                                      font-size: 14px;
                                      line-height: 140%;
                                      text-align: justify;
                                      word-wrap: break-word;
                                    "
                                  >
                                    <p style="line-height: 140%">
                                      <span
                                        style="
                                          color: #000000;
                                          line-height: 19.6px;
                                        "
                                        >Fecha y hora: ${currentDate}.</span
                                      >
                                    </p>
                                    <p style="line-height: 140%">
                                      <span
                                        style="
                                          color: #000000;
                                          line-height: 19.6px;
                                        "
                                        > <span style="font-weight: bold;"> ${data.name}</span> gracias por tu compra. Tus
                                        tickets han sido generados con
                                        exito.</span
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <table
                            style="font-family: 'Raleway', sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="v-container-padding-padding"
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    padding: 25px 25px 10px;
                                    font-family: 'Raleway', sans-serif;
                                  "
                                  align="left"
                                >
                                  <div
                                    class="v-text-align"
                                    style="
                                      font-size: 18px;
                                      line-height: 130%;
                                      text-align: justify;
                                      word-wrap: break-word;
                                    "
                                  >
                                    <p style="line-height: 130%">
                                      Pedido:<strong> ${data.sale.id} </strong>
                                    </p>
                                    <p style="line-height: 130%"> </p>
                                    <p style="line-height: 130%">
                                      <strong>Tickets Generados</strong>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                       
                        </div>
                        
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>
  
            ${contenidoHTML}
           
              <div
                class="u-row-container"
                style="padding: 0px; background-color: #843fa1"
              >
                <div
                  class="u-row"
                  style="
                    margin: 0 auto;
                    min-width: 320px;
                    max-width: 600px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    background-color: #ffffff;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      height: 100%;
                      background-color: transparent;
                    "
                  >
                    <div
                      class="u-col u-col-33p33"
                      style="
                        max-width: 320px;
                        min-width: 200px;
                        display: table-cell;
                        vertical-align: top;
                      "
                    >
                      <div
                        style="
                          height: 100%;
                          width: 100% !important;
                          border-radius: 0px;
                          -webkit-border-radius: 0px;
                          -moz-border-radius: 0px;
                        "
                      >
                        <div
                          class="v-col-border"
                          style="
                            box-sizing: border-box;
                            height: 100%;
                            padding: 0px;
                            border-top: 0px solid transparent;
                            border-left: 0px solid transparent;
                            border-right: 0px solid transparent;
                            border-bottom: 0px solid transparent;
                            border-radius: 0px;
                            -webkit-border-radius: 0px;
                            -moz-border-radius: 0px;
                          "
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div
                class="u-row-container"
                style="padding: 0px; background-color: #843fa1"
              >
                <div
                  class="u-row"
                  style="
                    margin: 0 auto;
                    min-width: 320px;
                    max-width: 600px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    background-color: transparent;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      height: 100%;
                      background-color: transparent;
                    "
                  >
                    <div
                      id="u_column_1"
                      class="u-col u-col-100"
                      style="
                        max-width: 320px;
                        min-width: 600px;
                        display: table-cell;
                        vertical-align: top;
                      "
                    >
                      <div
                        style="
                          background-color: #ffffff;
                          height: 100%;
                          width: 100% !important;
                        "
                      >
                        <div
                          class="v-col-border"
                          style="
                            box-sizing: border-box;
                            height: 100%;
                            padding: 0px;
                            border-top: 0px solid transparent;
                            border-left: 0px solid transparent;
                            border-right: 0px solid transparent;
                            border-bottom: 0px solid transparent;
                          "
                        >
                          <!--<![endif]-->
  
                          <table
                            style="font-family: 'Raleway', sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="v-container-padding-padding"
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    padding: 25px 25px 10px;
                                    font-family: 'Raleway', sans-serif;
                                  "
                                  align="left"
                                >
                                  <div
                                    class="v-text-align"
                                    style="
                                      font-size: 18px;
                                      line-height: 50%;
                                      text-align: justify;
                                      word-wrap: break-word;
                                    "
                                  >
                                    <p style="line-height: 50%">
                                      <strong>Importante</strong>
                                    </p>
                                    <p style="line-height: 50%"> </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <table
                            style="font-family: 'Raleway', sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="v-container-padding-padding"
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    padding: 25px 25px 10px;
                                    font-family: 'Raleway', sans-serif;
                                  "
                                  align="left"
                                >
                                  <div
                                    class="v-text-align"
                                    style="
                                      font-size: 14px;
                                      line-height: 140%;
                                      text-align: justify;
                                      word-wrap: break-word;
                                    "
                                  >
                                    <p style="line-height: 140%">
                                      Cada ticket tiene un código de autenticación
                                      único que será verificado previo al ingreso
                                      junto a la ID del comprador. Al imprimir o
                                      guardar el ticket en el carrete deben ser
                                      visibles los campos:
                                    </p>
                                    <ul>
                                      <li style="line-height: 19.6px">
                                        # de pedido
                                      </li>
                                      <li style="line-height: 19.6px">
                                        Nombre del comprador
                                      </li>
                                      <li style="line-height: 19.6px">
                                        Localidad
                                      </li>
                                      <li style="line-height: 19.6px">
                                        Código QR.
                                      </li>
                                    </ul>
                                    <p style="line-height: 140%"> </p>
                                    <p style="line-height: 140%">
                                      Debes cuidar tu entrada hasta el día del
                                      evento como si fuera una entrada física.
                                      <strong
                                        >El codigo QR solo puede ser validado una
                                        vez luego quedara inhabilitado. </strong
                                      >
                                    </p>
                                    <p style="line-height: 140%"> </p>
                                    <p style="line-height: 140%">
                                      El comprador, asume toda responsabilidad en
                                      caso de que su entrada se presente duplicada
                                      o falsificada, perdiendo su derecho de
                                      acceder al evento.
                                    </p>
                                    <p style="line-height: 140%"> </p>
                                    <p style="line-height: 140%">
                                      <strong
                                        >FFFTickets y los organizadores no asumen
                                        ninguna responsabilidad en caso de pérdida
                                        o robo de la entrada.</strong
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <table
                            style="font-family: 'Raleway', sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="v-container-padding-padding"
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    padding: 20px 0px;
                                    font-family: 'Raleway', sans-serif;
                                  "
                                  align="left"
                                >
                                  <table
                                    height="0px"
                                    align="center"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="
                                      border-collapse: collapse;
                                      table-layout: fixed;
                                      border-spacing: 0;
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      vertical-align: top;
                                      border-top: 2px solid #843fa1;
                                      -ms-text-size-adjust: 100%;
                                      -webkit-text-size-adjust: 100%;
                                    "
                                  >
                                    <tbody>
                                      <tr style="vertical-align: top">
                                        <td
                                          style="
                                            word-break: break-word;
                                            border-collapse: collapse !important;
                                            vertical-align: top;
                                            font-size: 0px;
                                            line-height: 0px;
                                            mso-line-height-rule: exactly;
                                            -ms-text-size-adjust: 100%;
                                            -webkit-text-size-adjust: 100%;
                                          "
                                        >
                                          <span>&#160;</span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <table
                            id="u_content_menu_1"
                            style="font-family: 'Raleway', sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="v-container-padding-padding"
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    padding: 5px;
                                    font-family: 'Raleway', sans-serif;
                                  "
                                  align="left"
                                >
                                  <div class="menu" style="text-align: center">
                                    <a
                                      href="https://ffftickets.com/terminos-y-condiciones"
                                      target="_blank"
                                      style="
                                        padding: 5px;
                                        display: inline-block;
                                        color: #000000;
                                        font-size: 12px;
                                        font-weight: 700;
                                        text-decoration: none;
                                      "
                                      class="v-padding v-layout-display"
                                    >
                                      TÉRMINOS Y CONDICIONES
                                    </a>
  
                                    <span
                                      style="
                                        padding: 5px;
                                        display: inline-block;
                                        color: #843fa1;
                                        font-size: 12px;
                                        font-weight: 700;
                                      "
                                      class="v-padding hide-mobile"
                                    >
                                      |
                                    </span>
  
                                    <a
                                      href="https://ffftickets.com/nosotros"
                                      target="_blank"
                                      style="
                                        padding: 5px;
                                        display: inline-block;
                                        color: #000000;
                                        font-size: 12px;
                                        font-weight: 700;
                                        text-decoration: none;
                                      "
                                      class="v-padding v-layout-display"
                                    >
                                      NOSOTROS
                                    </a>
  
                                    <span
                                      style="
                                        padding: 5px;
                                        display: inline-block;
                                        color: #843fa1;
                                        font-size: 12px;
                                        font-weight: 700;
                                      "
                                      class="v-padding hide-mobile"
                                    >
                                      |
                                    </span>
  
                                    <a
                                      href="https://ffftickets.com/"
                                      target="_blank"
                                      style="
                                        padding: 5px;
                                        display: inline-block;
                                        color: #000000;
                                        font-size: 12px;
                                        font-weight: 700;
                                        text-decoration: none;
                                      "
                                      class="v-padding v-layout-display"
                                    >
                                      PREGUNTAS FRECUENTES
                                    </a>
  
                                    <span
                                      style="
                                        padding: 5px;
                                        display: inline-block;
                                        color: #843fa1;
                                        font-size: 12px;
                                        font-weight: 700;
                                      "
                                      class="v-padding hide-mobile"
                                    >
                                      |
                                    </span>
  
                                    <a
                                      href="https://ffftickets.com/"
                                      target="_blank"
                                      style="
                                        padding: 5px;
                                        display: inline-block;
                                        color: #000000;
                                        font-size: 12px;
                                        font-weight: 700;
                                        text-decoration: none;
                                      "
                                      class="v-padding v-layout-display"
                                    >
                                      CONTÁCTENOS
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <table
                            id="u_content_text_5"
                            style="font-family: 'Raleway', sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="v-container-padding-padding"
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    padding: 25px 50px;
                                    font-family: 'Raleway', sans-serif;
                                  "
                                  align="left"
                                >
                                  <div
                                    class="v-text-align"
                                    style="
                                      font-size: 14px;
                                      color: #ffffff;
                                      line-height: 160%;
                                      text-align: center;
                                      word-wrap: break-word;
                                    "
                                  >
                                    <p style="font-size: 14px; line-height: 160%">
                                      <span
                                        style="
                                          color: #000000;
                                          line-height: 22.4px;
                                        "
                                        >Si tiene alguna pregunta, envíenos un
                                        correo electrónico a
                                        <strong
                                          >info@ffftickets.com
                                        </strong></span
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div
                class="u-row-container"
                style="padding: 0px; background-color: #843fa1"
              >
                <div
                  class="u-row"
                  style="
                    margin: 0 auto;
                    min-width: 320px;
                    max-width: 600px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    background-color: transparent;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      height: 100%;
                      background-color: transparent;
                    "
                  >
                    <div
                      class="u-col u-col-100"
                      style="
                        max-width: 320px;
                        min-width: 600px;
                        display: table-cell;
                        vertical-align: top;
                      "
                    >
                      <div
                        style="
                          height: 100%;
                          width: 100% !important;
                          border-radius: 0px;
                          -webkit-border-radius: 0px;
                          -moz-border-radius: 0px;
                        "
                      >
                        <div
                          class="v-col-border"
                          style="
                            box-sizing: border-box;
                            height: 100%;
                            padding: 0px;
                            border-top: 0px solid transparent;
                            border-left: 0px solid transparent;
                            border-right: 0px solid transparent;
                            border-bottom: 0px solid transparent;
                            border-radius: 0px;
                            -webkit-border-radius: 0px;
                            -moz-border-radius: 0px;
                          "
                        >
                          <!--<![endif]-->
  
                          <table
                            style="font-family: 'Raleway', sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="v-container-padding-padding"
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    padding: 10px;
                                    font-family: 'Raleway', sans-serif;
                                  "
                                  align="left"
                                >
                                  <div
                                    class="v-text-align"
                                    style="
                                      font-size: 14px;
                                      line-height: 140%;
                                      text-align: center;
                                      word-wrap: break-word;
                                    "
                                  >
                                    <p style="line-height: 140%">
                                      <span
                                        style="
                                          color: #ffffff;
                                          line-height: 19.6px;
                                        "
                                        >© 2023 Copyright FFFTickets </span
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
  `
  ;
};
