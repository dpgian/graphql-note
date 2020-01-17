import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { notify } from 'react-notify-toast'
import gql from 'graphql-tag'

const GET_NOTE = gql`
    query getNote($_id: ID!) {
        getNote (_id: $_id) {
            _id
            title
            content
            date
        }
    }
`

const EDIT_NOTE = gql`
    mutation updateNote($_id: ID!, $title: String, $content: String) {
        updateNote(_id: $_id, input: { title: $title, content: $content }) {
            _id
            title
            content
        }
    }
`

const EditNote = ({ match, history }) => {
    const [ title, setTitle ] = useState('')
    const [ content, setContent] = useState('')

    const { loading, error, data } = useQuery(GET_NOTE, {
        variables: {
            _id: match.params.id
        }
    })

    const [ updateNote ] = useMutation(EDIT_NOTE)

    if (loading) return <div>Fetching Note</div>
    if (error) return <div>Error while fetching note: {error}</div>

    const note = data

    return (
        <div className='container m-t-20'>
            <h1 className='page-title'>Edit Note</h1>

            <div className='newnote-page m-t-20'>
                <form
                    onSubmit={e => {
                        e.preventDefault();

                        updateNote({ variables: {
                            _id: note.getNote._id,
                            title: title ? title : note.getNote.title,
                            content: content ? content : note.getNote.content }
                        })
                    
                        notify.show('Note edits saved', 'success')
                        history.push('/')
                    }}
                >
                    <div className='field'>
                        <label className='label'>Note Title</label>
                        <div className='control'>
                            <input className='input' type='text' placeholder='Note Title' 
                            defaultValue={note.getNote.title} onChange={e => setTitle(e.target.value)}
                            required/>
                        </div>
                    </div>

                    <div className='field'>
                        <label className='label'>Note Content</label>
                        <div className='control'>
                            <textarea className='textarea' rows='10' placeholder='Note Content' 
                            defaultValue={note.getNote.content} onChange={e => setContent(e.target.value)}
                            required></textarea>
                        </div>
                    </div>

                    <div className='field'>
                        <div className='control'>
                            <button className='button is-link'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditNote