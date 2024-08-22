document.querySelector("#loginBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const userObj = {
        username: document.querySelector("#login-username").value,
        password: document.querySelector("#login-password").value,
    };
    fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        if (!res.ok) {
            alert("Login failed!");
        } else {
            res.json().then((data) => {
                location.href = `/homepage`;
            });
        }
    });
});

document.querySelector("#signupBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const userObj = {
        username: document.querySelector("#login-username").value,
        password: document.querySelector("#login-password").value,
    };
    fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        if (!res.ok) {
            alert("Signup failed!");
        } else {
            res.json().then((data) => {
                location.href = `/homepage`;
            });
        }
    });
});