import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillGoogleCircle, AiOutlineGithub } from "react-icons/ai";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/auth_provider/AuthProvider";

const Register = () => {

    const { createUser, googleSignIn, githubSignIn, updateUserProfile, createUserMongoDB } = useContext(AuthContext);
    const navigate = useNavigate();
    const currLocation = useLocation();

    console.log("Previous location ", currLocation.state);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const handlerRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const photourl = e.target.photourl.value ? e.target.photourl.value : null;
        const email = e.target.email.value;
        const password = e.target.password.value;


        // validations
        if (password.length < 6) {
            toast.error("Password is less than 6 characters");
            return;
        }
        if (!(/[A-Z]/.test(password))) {
            toast.error("Password doesn't have capital letter");
            return;
        }

        if (!(/\W|_/g.test(password))) {
            toast.error("Password doesn't have a special character");
            return;
        }

        createUser(email, password)
            .then(() => {
                updateUserProfile(name, photourl)
                    .then(() => {
                        createUserMongoDB();
                        toast.success('account created successfully');
                        navigate(currLocation?.state ? currLocation?.state : "/");
                        window.location.reload();
                    })
                    .catch(error => {
                        toast.error(error.code);
                    })
            })
            .catch(error => {
                toast.error(error.code);
            })
    }

    const handlerGoogleSignIn = () => {
        googleSignIn()
            .then(() => {
                createUserMongoDB();
                toast.success('account created successfully');
                navigate(currLocation?.state ? currLocation?.state : "/");
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    const handlerGithubSignIn = () => {
        githubSignIn()
            .then(() => {
                createUserMongoDB();
                toast.success('account created successfully');
                navigate(currLocation?.state ? currLocation?.state : "/");
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-100 font-light">
            <div className="hero-content flex-col gap-16 lg:flex-row-reverse my-12">
                <div
                    className="text-center lg:text-left"
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    data-aos-easing="linear"
                >
                    <h1 className="text-5xl  font-light">Register now!</h1>
                    <p className="py-6">{`Join us for an unforgettable experience
                        that you won't want to miss`}</p>
                </div>
                <div
                    className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white bg-opacity-60"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-easing="linear"
                >
                    <form onSubmit={handlerRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo Url (optional)</span>
                            </label>
                            <input type="text" name="photourl" placeholder="photo url" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-outline font-light">Register</button>
                        </div>
                        <div className="form-control pt-4">
                            <div className="w-full space-y-2">
                                <p className="text-center">or use one of these options</p>
                                <div className="flex justify-center text-3xl gap-4">
                                    <span onClick={handlerGoogleSignIn}>
                                        <AiFillGoogleCircle ></AiFillGoogleCircle>
                                    </span>
                                    <span onClick={handlerGithubSignIn}>
                                        <AiOutlineGithub ></AiOutlineGithub>
                                    </span>
                                </div>
                            </div>

                        </div>
                        <div className="form-control pt-4">
                            <label className="text-center">
                                <div className="label-text-alt">
                                    {`Don't have an account? `}
                                    <Link to={"/login"} className="font-bold  link link-hover">Log In</Link>
                                </div>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;