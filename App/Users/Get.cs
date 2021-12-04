using Database;
using Domain;
using MediatR;

namespace App.Users
{
    public class Get
    {
        public class Query : IRequest<bool>
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        public class Handler : IRequestHandler<Query, bool>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public bool ValidatePassword(string userPass, string pass, string salt)
            {
                var match = Encryption.Encryption.GenerateSHA256Hash(userPass, salt);
                if (match.Equals(pass))
                    return true;

                return false;
            }

            public async Task<bool> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = _context.Users.FirstOrDefault(user => user.Username == request.Username);

                if (user == null)
                    return false;

                if (ValidatePassword(request.Password, user.Password, user.Salt))
                {
                    return true;
                }

                return false;
            }
        }
    }
}