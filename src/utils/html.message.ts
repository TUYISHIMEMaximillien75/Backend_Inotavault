export const htmlMessage = (link: string): string => {
    console.log("verification sent ", link)
    return `
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Confirm your email</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          
          <!-- Card -->
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:#0f172a; padding:20px; text-align:center;">
                <h1 style="color:#ffffff; margin:0; font-size:24px;">
                  🎵 InotaVault
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px; color:#333333;">
                <h2 style="margin-top:0;">Confirm your email address</h2>

                <p style="font-size:15px; line-height:1.6;">
                  Hello 👋,
                </p>

                <p style="font-size:15px; line-height:1.6;">
                  Thank you for joining <strong>InotaVault</strong> — the platform where singers share and preserve music sheets.
                  Please confirm your email address by clicking the button below.
                </p>

                <!-- Button -->
                <div style="text-align:center; margin:30px 0; cursor: pointer;">
                  <a href="${link}"
                     style="
                       background:#2563eb;
                       color:#ffffff;
                       padding:14px 28px;
                       text-decoration:none;
                       border-radius:6px;
                       font-weight:bold;
                       display:inline-block;
                     ">
                    Confirm Email
                  </a>
                </div>

                <p style="font-size:14px; color:#555;">
                  If the button doesn’t work, copy and paste this link into your browser:
                </p>

                <p style="font-size:13px; word-break:break-all; color:#2563eb;">
                  ${link}
                </p>

                <p style="font-size:14px; margin-top:30px;">
                  If you didn’t create an account, you can safely ignore this email.
                </p>

                <p style="font-size:14px;">
                  — <br/>
                  The InotaVault Team 🎶
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#666;">
                © ${new Date().getFullYear()} InotaVault. All rights reserved.
              </td>
            </tr>

          </table>
          <!-- End Card -->

        </td>
      </tr>
    </table>

  </body>
  </html>

    `;
}