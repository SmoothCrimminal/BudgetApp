namespace Domain
{
    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public decimal Budget { get; set; }
        public DateTime CreationDate { get; set; }

    }
}