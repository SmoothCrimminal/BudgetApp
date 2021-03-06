using Database;
using MediatR;

namespace App.Users
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var user = await _context.Users.FindAsync(request.Id);

                _context.Remove(user);

                await _context.SaveChangesAsync();

                return Unit.Value; // the same as retun void (nothing)
            }
        }
    }
}