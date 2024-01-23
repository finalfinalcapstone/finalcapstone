"use strict"

const apiBaseUrl = "http://localhost:8080";

async function register(registerData) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(registerData)
    };

    try {
        const response = await fetch(apiBaseUrl + "/register", options);
        const data = await response.json();

        console.log(data);
        window.location.assign('/login');

        return registerData;
    } catch (error) {
        console.error("cant register user", error);
    }
}

async function login(loginData) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(loginData)
    };

    try {
        const response = await fetch(apiBaseUrl + "/login", options);
        const data = await response.json();

        console.log(data);
        window.localStorage.setItem("login-data", JSON.stringify(data));
        window.location.assign('/Home');

        return data;
    } catch (error) {
        console.error("cant login user", error);
    }
}

// get user data of logged in user returns obj including user or empty obj
function getLoginData(){
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {}
}

// if user is logged in - return true or false
function isLoggedIn(){
    const loginData = getLoginData();
    return Boolean(loginData.token)
}

// logout
// async function logout() {
//     const loginData = getLoginData();
  
//     const options = {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer // ${loginData.token}`,
//       },
//     };
  
//     try {
//       const response = await fetch(apiBaseURL + "/logout", options);
//       const data = await response.json();
  
//       console.log(data);
//     } catch (error) {
//       console.error("Logout error:", error);
     
//     }
  
//     window.localStorage.removeItem("login-data"); 
//     window.location.assign("/login"); 
//   }
  