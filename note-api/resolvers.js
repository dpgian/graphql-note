import Note from './models/note'

export const resolvers = {
    Query : {
        async allNotes(){
            return await Note.find()
        }
    }
}