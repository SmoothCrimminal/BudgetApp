// using Database;
// using Domain;
// using MediatR;

// namespace App.Users
// {
//     public class Validate
//     {
//         public class Query : IRequest<bool>
//         {
//             public User User { get; set; }
//         }

//         public class Handler : IRequestHandler<Query, bool>
//         {
//             private DataContext _context;

//             private bool CheckIfUserInDb(string username)
//             {
//                 var user = _context.Users.FirstOrDefault(user => user.Username == username);

//                 if (user == null)
//                 {
//                     return false;
//                 }

//                 else return true;
//             }

//             public Handler(DataContext context)
//             {
//                 _context = context;
//             }

//             public async Task<bool> Handle(Query request, CancellationToken cancellationToken)
//             {
//                 if (request.User == null)
//                 {
//                     return true;
//                 }

//                 if (string.IsNullOrWhiteSpace(request.User.Username))
//                 {
//                     return true;
//                 }

//                 return CheckIfUserInDb(request.User.Username);
//             }
//         }
//     }
// }