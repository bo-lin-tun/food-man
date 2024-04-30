export const welcomEmail = ({ name }: { name: string }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <div style="max-width: 500px; margin: auto;">
          <h1 style="text-align: center; margin-bottom: 2rem;">Welcome to ShopSmart</h1>
          <h4 style="margin-bottom: 1rem; font-size: 1.1rem;">Dear ${name},</h4>
          <p style="line-height: 1.6; font-size: 1rem;">
            Welcome to <span style="font-size: 1.1rem; font-weight: bold;">ShopSmart</span>, We're excited 
            to have you join our community of restaurant partners. Get ready to streamline your food 
            ordering process and reach more customers with ease.
          </p>
          <br>
          <p>Best regards,</p>
          <p style="font-weight: bold; font-size: 1.1rem;">ShopSmart Team</p>
        </div>
      </body>
    </html>  
      `;
};
