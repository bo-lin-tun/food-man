export const emailVerificationTemplate = ({
  name,
  verifyLink,
}: {
  name: string;
  verifyLink: string;
}) => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Email Verification</title>
          <style>
            // CSS
          </style>
        </head>
        <body>
          <div style="max-width: 500px; margin: auto">
            <h1 style="text-align: center; margin-bottom: 1.6rem">
              Account Verification Request
            </h1>
            <h4 style="margin-bottom: 1rem; font-size: 1.1rem">Dear admin,</h4>
            <p style="line-height: 1.6; font-size: 1rem">
              I am writing to inform you that I have successfully created an account on <span style="font-size: 1.1rem; font-weight: bold;">ShopSmart</span>
              and would like to request verification.
            </p>
            <br />
            <p style="font-size: 1rem">
              Verification link is :
            </p>
            <br />
            <div style="display: flex; justify-content: center; align-items: center;">
              <div>${verifyLink}</div>
            </div>
            <br />
            <p>Best regards,</p>
            <p style="font-weight: bold; font-size: 1.1rem">${name}</p>
          </div>
        </body>
        </html>
      `;
};
