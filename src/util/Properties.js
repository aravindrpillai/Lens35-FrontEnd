//const BASE_URL = "http://ec2-54-209-198-222.compute-1.amazonaws.com:8080"
const BASE_URL = "http://localhost:8080"

const POSTAL_CODE_SEARCH_API = "https://api.postalpincode.in/pincode/"

const EMPLOYEE_APIS = {
    OTP_REQUEST_SERVICE : BASE_URL.concat("/employees/apis/generate/otp/"),
    OTP_GENERATE_TOKEN : BASE_URL.concat("/employees/apis/generate/token/"),
    FETCH_EMPLOYEE_DATA : BASE_URL.concat("/employees/apis/profile/fetch/info/"),
    UPDATE_EMPLOYEE_BASIC_INFO : BASE_URL.concat("/employees/apis/profile/update/basic/"),
    UPDATE_EMPLOYEE_SERVICES : BASE_URL.concat("/employees/apis/profile/update/services/"),
    UPDATE_EMPLOYEE_BASE_LOCATION : BASE_URL.concat("/employees/apis/profile/update/baselocations/"),
    FETCH_OTP_FOR_MOBILE_NO_UPDATE : BASE_URL.concat("/employees/apis/profile/fetch/mobilenumber/requestotp/"),
    UPDATE_EMPLOYEE_MOBILE_NO : BASE_URL.concat("/employees/apis/profile/update/mobilenumber/"),
    GET_PRESIGNED_URL_FOR_EMPLOYEE_FILE_UPLOAD : BASE_URL.concat("/employees/apis/profile/fetch/presigned/url/"),
    UPDATE_EMPLOYEE_DP : BASE_URL.concat("/employees/apis/profile/update/profilepicture/"),
    UPDATE_EMPLOYEE_ID_PROOF : BASE_URL.concat("/employees/apis/profile/update/idproof/"),
    UPDATE_EMPLOYEE_PORTFOLIOS : BASE_URL.concat("/employees/apis/profile/update/portfolios/"),
    VERIFY_EMAIL : BASE_URL.concat("/employees/apis/verify/email/"), //pass the token at the end
    
    LIST_OPEN_BOOKINGS : BASE_URL.concat("/bookings/apis/employees/bookings/list/"),
    FETCH_BOOKING_INFO : BASE_URL.concat("/bookings/apis/employees/bookings/fetch/"), //Pass booking ID Here
    ACCEPT_BOOKING : BASE_URL.concat("/bookings/apis/employees/bookings/accept/"),
    FETCH_BOOKING_WITH_PENDING_FILE_UPLOAD : BASE_URL.concat("/bookings/apis/employees/fetch/bookings/withpendingfileupload/"),
   

    //------------------ REMOVE BELOW
    
    //FETCH_EMPLOYEE_IDPROOFS : BASE_URL.concat("/employees/api/fetch/employee/idproofs/"),
    EMPLOYEE_FILE_UPLOAD : BASE_URL.concat("/employees/api/update/employee/upload/file/"),
    //EMPLOYEE_FILE_DELETE : BASE_URL.concat("/employees/api/update/employee/delete/file/"),
    
    FETCH_EMPLOYEE_EXPERIENCE : BASE_URL.concat("/employees/api/fetch/employee/experience/"),
    UPDATE_EMPLOYEE_EXPERIENCE : BASE_URL.concat("/employees/api/update/employee/experience/"),
    DELETE_EMPLOYEE_EXPERIENCE : BASE_URL.concat("/employees/api/delete/employee/experience/"),
    
    EMPLOYEE_SPECIFIC_FILE_UPLOAD_PRESIGNED_URL : BASE_URL.concat("/employees/api/generate/presignedurl/"),
}

const FILES_API = {
    GET_FILEUPLOAD_PRESIGNED_URL : BASE_URL.concat("/bookings/apis/employees/bookings/fileupload/fetch/presignedurl/"),
    ACKNODWLEDGE_FILE_UPLOAD : BASE_URL.concat("/bookings/apis/employees/bookings/fileupload/acknodwledge/"),

    //---------------Deal the below later
    DELETE_FILE : BASE_URL.concat("/files/api/acknowledge/file/delete/"),
}

const CUSTOMER_APIS = {
    OTP_REQUEST_SERVICE : BASE_URL.concat("/customers/apis/generate/otp/"),
    OTP_GENERATE_TOKEN : BASE_URL.concat("/customers/apis/generate/token/"),
    FETCH_PROFILE_INFO : BASE_URL.concat("/customers/apis/profile/fetch/info/"),
    UPDATE_CUSTOMER_BASIC_INFO : BASE_URL.concat("/customers/apis/profile/update/basicinfo/"),
    FETCH_OTP_FOR_MOBILE_NO_UPDATE : BASE_URL.concat("/customers/apis/profile/fetch/mobilenumber/requestotp/"),
    UPDATE_CUSTOMER_MOBILE_NO : BASE_URL.concat("/customers/apis/profile/update/mobilenumber/"),
    GET_PRESIGNED_URL_FOR_CUSTOMER_DP : BASE_URL.concat("/customers/apis/profile/fetch/presigned/url/"),
    UPDATE_CUSTOMER_PROFILE_PIC : BASE_URL.concat("/customers/apis/profile/update/profilepicture/"),
    VERIFY_EMAIL : BASE_URL.concat("/customers/apis/verify/email/"), //pass the token at the end

    
}

const BOOKING_APIS = {
    LIST_CUSTOMER_BOOKINGS : BASE_URL.concat("/bookings/apis/customers/bookings/fetch/"),
    FETCH_BOOKINGS : BASE_URL.concat("/bookings/apis/customers/bookings/fetch/"),
    FETCH_BOOKING_USING_ID : BASE_URL.concat("/bookings/apis/customers/booking/fetch/"), //pass booking id at the end of the url
    FETCH_SERVICES : BASE_URL.concat("/bookings/apis/customers/services/fetch/"), //pass booking id at the end of the url
    UPDATE_BOOKING : BASE_URL.concat("/bookings/apis/customers/booking/"),
    ADD_SERVICES : BASE_URL.concat("/bookings/apis/customers/services/add/"),
    REMOVE_SERVICES : BASE_URL.concat("/bookings/apis/customers/services/remove/"),
    FETCH_INVOICE : BASE_URL.concat("/bookings/apis/customers/fetch/invoice/"),

    //Employees
    
}

export {
    BASE_URL, 
    EMPLOYEE_APIS, 
    CUSTOMER_APIS, 
    FILES_API, 
    POSTAL_CODE_SEARCH_API, 
    BOOKING_APIS
}