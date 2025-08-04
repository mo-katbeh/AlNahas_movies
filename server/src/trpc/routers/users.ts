import { publicProcedure, router } from '../init';
import { getAllUsers } from '../../db/kysely/queries/users'; // from your kysely logic

export const usersRouter = router({
  getAll: publicProcedure
    .query(async () => {  
      try{
        const users = await getAllUsers();
        // console.log("DB is ", users)
      return users
      }
      catch(err){
        console.error('TRPC getAll error:', err);
        throw new Error('Failed to fetch users');
      }
      
    }),
});

// console.log(usersRouter)