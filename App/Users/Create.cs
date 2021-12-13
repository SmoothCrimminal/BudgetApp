// using Database;
// using Domain;
// using MediatR;

// namespace App.Users
// {
//     public class Create
//     {
//         public class Command : IRequest
//         {
//             public User User { get; set; }
//         }

//         public class Handler : IRequestHandler<Command>
//         {
//             private readonly DataContext _context;
//             private string _userSalt = Encryption.Encryption.CreateSalt(10);

//             private string GetUserPasswordHashed(User user)
//             {
//                 return Encryption.Encryption.GenerateSHA256Hash(user.Password, _userSalt);
//             }

//             public Handler(DataContext context)
//             {
//                 _context = context;
//             }

//             public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
//             {
//                 request.User.Password = GetUserPasswordHashed(request.User);
//                 request.User.Salt = _userSalt;

//                 if (request.User.CreationDate == null)
//                 {
//                     request.User.CreationDate = DateTime.Now;
//                 }

//                 await _context.Users.AddAsync(request.User);

//                 await _context.SaveChangesAsync();

//                 return Unit.Value;
//             }

//         }
//     }
// }