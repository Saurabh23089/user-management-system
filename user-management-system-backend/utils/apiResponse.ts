// interface ApiResponse<T> {
//     success:boolean,
//     message:string,
//     data?:T
// }

// export function successResponse<T>(
//     message:string,
//     data?:T
// ):ApiResponse<T> {
//     return {
//         success:true,
//         message:message,
//         data:data
//     }
// }

class ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;

    constructor(success: boolean, message: string, data?: T) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

}

export default ApiResponse;