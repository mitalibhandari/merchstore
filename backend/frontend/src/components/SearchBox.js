import React, {useState} from 'react'
import { Button, Form, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SearchBox() {

    const [keyword, setKeyword] = useState()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)
        }else{
            navigate('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} className='d-flex' >
            
            <Form.Control
            type='text'
            name='q'
            onChange={ (e) => setKeyword(e.target.value)}
            style={{width:'500px', marginLeft:'100px'}}>
            </Form.Control>

            <Button type='submit' variant='info'>
                <i class="fa-solid fa-magnifying-glass"></i>
            </Button>
            
        </Form>
    )
}

export default SearchBox
