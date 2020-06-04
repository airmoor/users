import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, List, ListItem, ListItemText, Typography, ListItemIcon, FormControl, InputLabel, IconButton, InputAdornment, Input, makeStyles, Box } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';

const useStyles = makeStyles({
    root: {
      minWidth: 350,
      maxWidth: 500,
      borderRadius:10,
      margin: 50,
      padding: '30px 30px',
      boxShadow: '0 20px 50px  rgba(0, 0, 0, .3)',
      background:'#b0a4ff',
      color:"#000",
    }
  });

export default function Users({token}) {
    const classes = useStyles();
    const [values, setValues] = useState({
        users: [],
        filtredUsers: [],
        isLoaded: false,
        error: '',
        searchText: '',
        sortFromLess: true
    })

    useEffect( () => {
        axios.get('http://emphasoft-test-assignment.herokuapp.com/api/v1/users/', {
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        .then((response)=> {
            console.log('success',response)
            setValues({...values, error:'', isLoaded:true, users:response.data, filtredUsers:response.data})
        })
        .catch((error)=> {
            console.log('error',error)
            setValues({...values, error:error, isLoaded:true})
        })
    }, [])

    const dataSearch = (event) => {
        const search = event.target.value.toLowerCase();
        let filtredUsers = values.users.filter(user=> {
            return user.username.toLowerCase().includes(search)
        })
        setValues({...values, filtredUsers:filtredUsers, searchText:event.target.value})
    }

    const sort = () => {
        let filtredUsers = values.filtredUsers.sort((a,b) => a.id - b.id);
        if (!values.sortFromLess) filtredUsers.reverse()
        setValues({...values, filtredUsers:filtredUsers, sortFromLess:!values.sortFromLess })
    }

    return (
        <Card className={classes.root}>
            <Box alignItems='flex-end'>
                <FormControl>
                    <InputLabel size='normal' htmlFor="search" color='#fff'>Search by username</InputLabel>
                    <Input  className={classes.white}
                        id="search"
                        value={values.searchText}
                        onChange={dataSearch}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                <IconButton aria-label="sort" onClick={sort}>
                    <SortIcon />
                </IconButton>
            </Box>

            <List>
                {values.filtredUsers.map( user => (
                    <ListItem key={user.id} alignItems='flex-start'>
                        <ListItemIcon>
                        <AccountCircleIcon color={user.is_superuser? 'secondary': 'primary'}/>
                        </ListItemIcon> 
                    <ListItemText
                        primary = {
                            <Typography >{user.id}: {user.username} </Typography>                         
                        }
                        secondary = {
                            <Typography color='textSecondary'>{user.first_name} {user.last_name}</Typography> 
                        }
                        /> 
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}
