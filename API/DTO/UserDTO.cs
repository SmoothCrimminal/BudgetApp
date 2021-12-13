namespace API.DTO
{
    public class UserDTO
    {
        public string Username {get; set;}
        public string Token {get; set;}
        public decimal Budget { get; set; }
        public DateTime CreationDate { get; set; }
    }
}