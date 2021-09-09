module.exports = {
    EmailTemplate
}

function EmailTemplate(OTP_CODE) {
    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href='http://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
            <title></title>
        </head>
        <body>
            <div style="display: flex;justify-content: center;align-items: center;">
                <img src="https://i.ibb.co/QkSc8jd/Login-Signup.png" />
            </div>
            <div style="display: flex;justify-content: center;align-items: center;">
                <h1 style="font-family: 'Lato', sans-serif;font-weight: 900;">
                    Daily Reflect Pyramind
                </h1>
            </div>
            <div style="display: flex;justify-content: center;align-items: center;">
                <h3 style="font-family: 'Lato', sans-serif;font-weight: 400;">${"Your Otp is : "}</h3>
                <h3 style="font-family: 'Lato', sans-serif;font-weight: 900;color:#47D6B0">${OTP_CODE}</h3>
            </div>
            <div style="display: flex;justify-content: center;align-items: center;">
                <h4 style="font-family: 'Lato', sans-serif;font-weight: 900;">Use this otp to recover your password, do not share this otp with anyone!</h4>
            </div>
        </body>
        </html>`
    )
}