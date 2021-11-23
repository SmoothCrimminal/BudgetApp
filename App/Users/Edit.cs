using Database;
using Domain;
using MediatR;

namespace App.Users
{
    public class Edit
    {
        public class Command : IRequest
        {
            public User User { get; set; }
        }

         public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Users.Update(request.User);

                await _context.SaveChangesAsync();

                return Unit.Value; // the same as retun void (nothing)
            }
        }
    }
}