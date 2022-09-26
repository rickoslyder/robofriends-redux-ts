import { rest } from 'msw';

export const handlers = [
    rest.get('https://jsonplaceholder.typicode.com/users',
    async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                   id: 1,
                   name: "User One",
                   email: 'user1@email.com' 
                },
                {
                    id: 2,
                    name: "User Two",
                    email: 'user2@email.com' 
                 },
                {
                    id: 3,
                    name: "User Three",
                    email: 'user3@email.com' 
                }
            ])
        )
    })
]