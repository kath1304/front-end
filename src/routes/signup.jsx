import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import React from "react";
import axios from 'axios';

export default function Signup() {
    const token = localStorage.getItem('authentication')
    const role = localStorage.getItem('role');
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }
    });

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/users/', {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
        }, {headers: {'authorization': token, 'role': role}})
            .then(() => {
                return navigate('/paths/checkUser')
                //add sending user
            })
            .catch((error) => {
                console.error(error)
            })
    }

    axios.get('http://localhost:3001/validate', {headers: {'authorization': token}})
        .then((response) => {
            if (!response.data) {
                return navigate('/')
            }
            if (role === 'user') {
                console.log('stop you cannot access');
                return navigate('/paths/user')
            }
        })
        .catch(e => {console.error(e)})
    return(
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-control">
                    <label>Username</label>
                    <input type="text" name="username" {...register("username", {required: true})} />
                </div>

                <div className="form-control">
                    <label>Firstname</label>
                    <input type="text" name="firstname" {...register("firstname", {required: true})} />
                </div>

                <div className="form-control">
                    <label>Lastname</label>
                    <input type="text" name="lastname" {...register("lastname", {required: true})} />
                </div>

                <div className="form-control">
                    <label>Email</label>
                    <input type="text" name="email" {...register("email", {required: true})} />
                </div>


                <div className="form-control">
                    <label>Password</label>
                    <input type="password" name="password" {...register("password", {required:true})} />
                </div>

                <div className="form-control">
                    <label></label>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    )


   /* <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Signup up
            </Typography>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary"/>}
                            label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Signup Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2">
                            Already have an account? Signup in
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    </Container>
);*/


}