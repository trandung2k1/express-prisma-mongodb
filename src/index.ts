import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({});

async function main() {
    await prisma.$connect();
    console.log('Connected DB successfully');
    // const user = await prisma.user.create({
    //     data: {
    //         email: 'trandungksnb00@gmail.com',
    //         name: 'TranDung',
    //         posts: {
    //             create: [
    //                 {
    //                     title: 'My first day at Prisma',
    //                 },
    //                 {
    //                     title: 'How to connect to a SQLite database',
    //                 },
    //             ],
    //         },
    //     },
    // });

    // Use transaction
    const [findFirstOrThrow, createdUser] = await prisma.$transaction([
        prisma.user.findFirstOrThrow({
            where: {
                name: 'Mai',
            },
        }),
        prisma.user.create({
            data: {
                email: 'dung@gmail.com',
                name: 'Dung',
                posts: {
                    create: [
                        {
                            title: 'Post 1',
                        },
                        {
                            title: 'Post 2',
                        },
                    ],
                },
            },
        }),
    ]);
    console.log(findFirstOrThrow, createdUser);

    // const users = await prisma.user.findMany({
    //     include: {
    //         posts: true,
    //     },
    // });
    // console.log(users);
}
main()
    .catch(async (e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        console.log('Disconnected DB');
        await prisma.$disconnect();
    });
