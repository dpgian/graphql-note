import React from 'react'
import { Link } from 'react-router-dom'

import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { notify } from 'react-notify-toast'

const FETCH_NOTES = gql`{
    allNotes{
        title
        content
        _id
        date
    }
}`

const DELETE_NOTE = gql`
    mutation deleteNote($_id: ID!) {
        deleteNote(_id: $_id) {
            title
            content
            _id
        }
    }
`

const AllNotes = () => {
    const { loading, error, data } = useQuery(FETCH_NOTES)
    
    const [deleteNote] = useMutation(DELETE_NOTE, {
        update( cache, { data: {deleteNote }}) {
            const { allNotes } = cache.readQuery({ query: FETCH_NOTES })
            const newNotes = allNotes.filter( note => note._id !== deleteNote._id)
            
            cache.writeQuery({
                query: FETCH_NOTES,
                data: { allNotes: newNotes }
            })
        }
    })
    
    if ( loading ) return 'Loading...'
    if (error) return (`Error while fetching Notes: ${error}`) 

    return (
        <div className='container m-t-20' style={{textAlign: 'center'}}>
            <h1 className='page-title'>All Notes</h1>
        
            {data.allNotes.length === 0 ? (<div>No notes yet</div>) : 

            <div className='allnotes-page'>
                <div className='columns is-multiline'>
                    {data.allNotes.map(note => (
                        <div className='column is-one-third' key={note._id}>
                            <div className='card'>
                                <header className='card-header'>
                                    <p className='card-header-title'>{note.title}</p>
                                </header>
                                <div className='card-content'>
                                    <div className='content'>
                                        {note.content}
                                        <br />
                                    </div>
                                </div>
                                <footer className='card-footer'>
                                    <Link to={`note/${note._id}`} className='card-footer-item'>
                                        Edit
                                    </Link>
                                    <button onClick={ e => {
                                        e.preventDefault()
                                        
                                        deleteNote({ variables: { _id: note._id } })
                                        notify.show('Note deleted.', 'success')
                                    }}
                                        className='card-footer-item'>
                                        Delete
                                    </button>
                                </footer>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            }
        </div>
     )
}

export default AllNotes