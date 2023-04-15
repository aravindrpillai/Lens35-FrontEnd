import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./Properties";

const SESSION_EXPIRED_MESSAGE = "Session Expired. Please login Again"

/**
 * POST method
 * @param {*} url 
 * @param {*} requestBody 
 * @returns 
 */
export async function post(url, requestBody = {}, auth_req=true) {
    try{
        const usertype = await getUserType(url)
        const requestOptions = {
            method: 'POST',
            headers: await getHeaders(usertype),
            body: requestBody ? JSON.stringify(requestBody) : "{}"
        }
        console.log("POST URL is : ", url)
        console.log("POST Request is : ", requestOptions)
        const response = await fetch(url, requestOptions)
        let json_response = await response.json()
        console.log("POST Response is : ",json_response, response.status)

        //Unauthorised
        if(response.status === 401){
            if(usertype === "employees"){
                window.location.assign("http://localhost:3000/emp/login?message="+SESSION_EXPIRED_MESSAGE)
            }else{
                window.location.assign("http://localhost:3000/cust/login?message="+SESSION_EXPIRED_MESSAGE)
            }
        }

        return json_response
    }catch(e){
        console.log("Service Failed: ", e)
        return {
            status: false,
            messages: ["Service Failed. Please try after sometime."]
        }
    }
}

    
/**
 * GET method
 * @param {*} url
 * @returns 
 */
 export async function get(url, auth_req=true) {
    try{
        const usertype = await getUserType(url)
        const requestOptions = {
            method: 'GET',
            headers: await getHeaders(usertype)
        };
        console.log("GET URL is : ", url)
        const response = await fetch(url, requestOptions);
        
        let json_response = await response.json()
        console.log("GET Response is : ",json_response, response.status)
        
        //Unauthorised
        if(response.status === 401){
            if(usertype === "employees"){
                window.location.assign("http://localhost:3000/emp/login?message="+SESSION_EXPIRED_MESSAGE)
            }else{
                window.location.assign("http://localhost:3000/cust/login?message="+SESSION_EXPIRED_MESSAGE)
            }
        }
        
        
        return json_response
    }catch(e){
        console.log("Service Failed: ", e)
        return {
            status: false,
            messages: ["Service Failed. Please try after sometime."]
        }
    }
}


/**
 * GET method
 * @param {*} url
 * @returns 
 */
 export async function getForPostalCode(url) {
    try{
        const response = await fetch(url, { method: 'GET' })
        let json_response = await response.json()
        console.log("GET Response is : ",json_response)
        return json_response[0]
    }catch(e){
        console.log("Service Failed: ", e)
        return {
            status: false,
            messages: ["Service Failed. Please try after sometime."]
        }
    }
}



/**
 * Function to get the headers
 */
async function getHeaders(usertype){
    let token = null
    let identifier = null
    let device_id = null

    if(usertype === "customers"){
        token = window.sessionStorage.getItem("Customer-Token");
        identifier = window.sessionStorage.getItem("Customer-Identifier");
        device_id = window.sessionStorage.getItem("Customer-Device-Id");
    }
    if(usertype === "employees"){
        token = window.sessionStorage.getItem("Employee-Token");
        identifier = window.sessionStorage.getItem("Employee-Identifier");
        device_id = window.sessionStorage.getItem("Employee-Device-Id");
    }
    
    let _return = {
        "Content-Type": 'application/json',
        "Token" : token,
        "Identifier" : identifier,
        "Device-Id" : device_id
    }
    return _return;
}


async function getUserType(url){
    let url_after_domain = url.split(BASE_URL)
    let uri = url_after_domain[1].split("/")
    console.log(uri[1])
    return uri[1]
}