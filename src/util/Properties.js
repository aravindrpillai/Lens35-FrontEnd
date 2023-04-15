const BASE_URL = "http://ec2-54-209-198-222.compute-1.amazonaws.com:8080"

const POSTAL_CODE_SEARCH_API = "https://api.postalpincode.in/pincode/"

const EMPLOYEE_APIS = {
    OTP_REQUEST_SERVICE : BASE_URL.concat("/employees/apis/generate/otp/"),
    OTP_GENERATE_TOKEN : BASE_URL.concat("/employees/apis/generate/token/"),
    FETCH_EMPLOYEE_DATA : BASE_URL.concat("/employees/apis/profile/fetch/info/"),
    UPDATE_EMPLOYEE_BASIC_INFO : BASE_URL.concat("/employees/apis/profile/update/basic/"),
    UPDATE_EMPLOYEE_SERVICES : BASE_URL.concat("/employees/apis/profile/update/services/"),
    UPDATE_EMPLOYEE_BASE_LOCATION : BASE_URL.concat("/employees/apis/profile/update/baselocations/"),

    GET_PRESIGNED_URL_FOR_EMPLOYEE_FILE_UPLOAD : BASE_URL.concat("/employees/apis/profile/fetch/presigned/url/"),
    UPDATE_EMPLOYEE_DP : BASE_URL.concat("/employees/apis/profile/update/profilepicture/"),
    UPDATE_EMPLOYEE_ID_PROOF : BASE_URL.concat("/employees/apis/profile/update/idproof/"),
    UPDATE_EMPLOYEE_PORTFOLIOS : BASE_URL.concat("/employees/apis/profile/update/portfolios/"),
    

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
    GET_FILEUPLOAD_PRESIGNED_URL : BASE_URL.concat("/files/api/generate/presignedurl/for/uploading/"),
    ACKNODWLEDGE_FILE_UPLOAD : BASE_URL.concat("/files/api/acknowledge/file/upload/"),
    DELETE_FILE : BASE_URL.concat("/files/api/acknowledge/file/delete/"),
}

const CUSTOMER_APIS = {
    OTP_REQUEST_SERVICE : BASE_URL.concat("/customers/apis/generate/otp/"),
    OTP_GENERATE_TOKEN : BASE_URL.concat("/customers/apis/generate/token/"),
    
    
    
    FETCH_BOOKING : BASE_URL.concat("/bookings/api/fetch/booking/forcustomer/"),
}

const BOOKING_APIS = {
    FETCH_BOOKINGS : BASE_URL.concat("/bookings/api/fetch/bookings/"),
    UPDATE_BOOKING : BASE_URL.concat("/bookings/api/update/booking/"),
    FETCH_INVOICE : BASE_URL.concat("/bookings/api/fetch/invoice/")
}

export {
    BASE_URL, 
    EMPLOYEE_APIS, 
    CUSTOMER_APIS, 
    FILES_API, 
    POSTAL_CODE_SEARCH_API, 
    BOOKING_APIS
}