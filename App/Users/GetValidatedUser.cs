// using Database;
// using Domain;
// using MediatR;

// namespace App.Users
// {
//     public class GetValidatedUser
//     {
//         public class Query : IRequest<UserInfo>
//         {
//             public string Username { get; set; }
//             public string Password { get; set; }
//         }

//         public class Handler : IRequestHandler<Query, UserInfo>
//         {
//             private readonly DataContext _context;
//             public Handler(DataContext context)
//             {
//                 _context = context;
//             }

//             public bool ValidatePassword(string userPass, string pass, string salt)
//             {
//                 var match = Encryption.Encryption.GenerateSHA256Hash(userPass, salt);
//                 if (match.Equals(pass))
//                     return true;

//                 return false;
//             }

//             public async Task<UserInfo> Handle(Query request, CancellationToken cancellationToken)
//             {
//                 var user = _context.Users.FirstOrDefault(user => user.Username == request.Username);
//                 UserInfo userInfo = new UserInfo
//                 {
//                     Username = user.Username,
//                     Budget = user.Budget,
//                     CreationDate = user.CreationDate,
//                     Id = user.Id
//                 };

//                 if (ValidatePassword(request.Password, user.Password, user.Salt))
//                 {
//                     return use;
//                 }

//                 return null;
//             }
//         }
//     }
// }