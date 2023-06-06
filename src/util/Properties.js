const BASE_URL = "http://ec2-54-209-198-222.compute-1.amazonaws.com:8080"
//const BASE_URL = "http://localhost:8080"

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
       
    //Wallet
    WALLET_FETCH_BANK_INFO : BASE_URL.concat("/employees/apis/wallet/fetch/bank/info/"),
    WALLET_UPDATE_BANK_INFO : BASE_URL.concat("/employees/apis/wallet/update/bank/info/"),

    //Open Bookings
    LIST_OPEN_BOOKINGS : BASE_URL.concat("/employees/apis/openbookings/list/all/"),
    FETCH_SERVICES_OF_BOOKING : BASE_URL.concat("/employees/apis/openbookings/fetch/services/"), //Pass booking ID Here
    ACCEPT_BOOKING : BASE_URL.concat("/employees/apis/openbookings/accept/service/"),
    
    //MY Bookings
    LIST_MY_BOOKINGS : BASE_URL.concat("/employees/apis/mybookings/list/bookings/"),
    LIST_SERVICES_OPEN_FOR_UPDATE :  BASE_URL.concat("/employees/apis/mybookings/list/services/openforupdate/"), //Append booking_id  at the end
    MODIFY_MY_BOOKING : BASE_URL.concat("/employees/apis/mybookings/update/booking/"),

    //File Upload:
    FETCH_BOOKING_WITH_PENDING_FILE_UPLOAD : BASE_URL.concat("/employees/apis/fileupload/fetch/bookings/withpendingfileupload/"),
    GET_FILEUPLOAD_PRESIGNED_URL : BASE_URL.concat("/employees/apis/fileupload/generate/presignedurl/"),    
    ACKNODWLEDGE_FILE_UPLOAD : BASE_URL.concat("/employees/apis/fileupload/acknodwledge/"),
    FETCH_UPLOADED_FILES_OF_SERVICE : BASE_URL.concat("/employees/apis/fileupload/fetch/uploadedfiles/"), //Pass service ID Here
    DELETE_FILE : BASE_URL.concat("/employees/apis/fileupload/delete/file/"),
    LOCK_AND_SUBMIT_SERVICE : BASE_URL.concat("/employees/apis/fileupload/service/lock/"), //Pass service ID at the end
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

    //Bookings
    UPDATE_BOOKING : BASE_URL.concat("/customers/apis/booking/update/"),
    LIST_CUSTOMER_BOOKINGS : BASE_URL.concat("/customers/apis/booking/fetch/bookings/"),
    FETCH_BOOKING_USING_ID : BASE_URL.concat("/customers/apis/booking/fetch/booking/"), //pass booking id at the end of the url
    FETCH_SERVICES : BASE_URL.concat("/customers/apis/booking/fetch/services/"), //pass booking id at the end of the url
    ADD_SERVICES : BASE_URL.concat("/customers/apis/booking/services/add/"),
    FETCH_INVOICE : BASE_URL.concat("/customers/apis/bookings/fetch/invoice/"),//Pass booking id at the end

    //Uploaded Files
    FETCH_UPLOADED_FILES : BASE_URL.concat("/customers/apis/fetchfiles/"), //pass the service id at the end
    
    //Cancellation
    CALCULATE_CANCELLATION_COST : BASE_URL.concat("/customers/apis/booking/calculate/cancellation/"),//pass booking id at the end of the url
    CANCEL_BOOKING : BASE_URL.concat("/customers/apis/booking/cancel/")//pass booking id at the end of the url
}


export {
    BASE_URL, 
    EMPLOYEE_APIS, 
    CUSTOMER_APIS,
    POSTAL_CODE_SEARCH_API
}