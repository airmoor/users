import React, { useState } from 'react';
import {Card, CardContent, Typography, TextField, Button, CardActions, makeStyles} from '@material-ui/core'
import axios from 'axios';
import Users from './Users';

const useStyles = makeStyles({
    root: {
      minWidth: 350,
      maxWidth: 500,
      borderRadius:10,
      margin: 100,
      padding: '30px 30px',
      boxShadow: '0 20px 50px  rgba(0, 0, 0, .3)',
      background:'#b0a4ff',
      color:'#fff',
    },
    secondary: {
        color:"#c2c2ff"
    },
    white: {
        color:"#fff"
    }
  });


export default function Login() {
    const classes = useStyles();
    const [values, setValues] = useState({
        username: '',
        password: '',
        error: '',
        token: ''
    })

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value })
    }

    const clickSubmit = () => {
        const user = {
            username: values.username || undefined,
            password: values.password || undefined
        }

        axios.post('http://emphasoft-test-assignment.herokuapp.com/api-token-auth/', user)
        .then((response)=> {
            if (!response) {
                console.log('no data')
            } else {
                setValues({...values, error:'', token:response.data.token})
                console.log('token',values.token)
                console.log('signin good')
            }
        })
        .catch((error) => {
            setValues({...values, error:'incorrect user'})
            console.log('incorrect user',error)
        })
    }
    
    return(
        <>
        {!values.token && (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant='h4' align='center'> Sign In</Typography>
                <TextField id='username' fullWidth type='username' label='Username' margin='normal'
                    value={values.username} onChange={handleChange('username')}/> <br/>
                <TextField id='password' fullWidth type='password' label='Password' margin='normal'
                    value={values.password} onChange={handleChange('password')}/> <br/>
                {
                    values.error && (
                    <Typography component='p' color='info' align='center'>
                        {values.error}
                    </Typography>)
                }    
            </CardContent>
            <CardActions>
                <Button color='primary' variant='contained' fullWidth onClick={clickSubmit}>Submit</Button>
            </CardActions>
        </Card>
        )}
        {
            values.token && (
                <Users token={values.token}/>
            )
        }
        </>
    ) 
}
