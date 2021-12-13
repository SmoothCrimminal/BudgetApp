// using Database;
// using Domain;
// using MediatR;

// namespace App.Users
// {
//     public class GetUserInfo
//     {
//         public class Query : IRequest<User>
//         {
//             public string Username { get; set; }
//         }

//         public class Handler : IRequestHandler<Query, User>
//         {
//             private readonly DataContext _context;
//             public Handler(DataContext context)
//             {
//                 _context = context;
//             }
//             public async Task<User> Handle(Query request, CancellationToken cancellationToken)
//             {
//                 var user = _context.Users.FirstOrDefault(user => user.Username == request.Username);
//                 return user;
//             }
//         }
//     }
// }