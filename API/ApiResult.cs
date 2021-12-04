using System.Net;

namespace API
{
    public class ApiResult<T>
    {
        private ApiResult(HttpStatusCode failureStatus) => FailureStatus = failureStatus;
        private ApiResult(T payload) => Payload = payload;

        public T Payload { get; }
        public HttpStatusCode? FailureStatus { get; }
        public bool IsSuccess => FailureStatus == null;

        public static ApiResult<T> Fail(HttpStatusCode failureStatus) => new ApiResult<T>(failureStatus);
        public static ApiResult<T> Success(T paylooad) => new ApiResult<T>(paylooad);

        public static implicit operator bool(ApiResult<T> result) => result.IsSuccess;
    }
}