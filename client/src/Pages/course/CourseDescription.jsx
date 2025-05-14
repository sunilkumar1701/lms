import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from '../../layouts/HomeLayout';
import { getProfile } from "../../redux/slices/AuthSlice";

function CourseDescription() {
    const dispatch = useDispatch();
    const location = useLocation();
    const courseState = location.state;
    const navigate = useNavigate();

    const { role, data } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    console.log("courseState:", courseState);
    console.log("role:", role);
    console.log("subscription status:", data?.subscription?.status);

    if (!courseState) {
        return (
            <HomeLayout>
                <div className="text-center text-red-500 font-bold mt-10">
                    Invalid access. Course data not found.
                </div>
            </HomeLayout>
        );
    }

    const hasAccess = role === 'ADMIN' || data?.subscription?.status === 'active';

    return (
        <HomeLayout>
            <div className="flex flex-col lg:flex-row lg:px-20 py-12">
                <div className="lg:w-1/2 w-full px-12 flex flex-col gap-7">
                    <img src={courseState.thumbnail?.secure_url} alt="thumbnail" className="rounded-xl w-full h-96" />
                    
                    <p className="font-semibold lg:text-2xl text-xl text-yellow-400 capitalize">
                        Course category : <span className="text-xl text-blue-500">{courseState.category}</span>
                    </p>
                    <p className="font-semibold lg:text-2xl text-xl text-yellow-400 capitalize">
                        Instructor : <span className="text-xl text-blue-500">{courseState.createdBy}</span>
                    </p>
                    <p className="font-semibold lg:text-2xl text-xl text-yellow-400 capitalize">
                        Number of lectures : <span className="text-xl text-blue-500">{courseState.numberOfLectures}</span>
                    </p>

                    {typeof hasAccess === "boolean" && (
                        hasAccess ? (
                            <button
                                className="btn btn-primary capitalize"
                                onClick={() => {
                                    navigate(`/course/${courseState.title}/${courseState._id}/lectures`, {
                                        state: courseState,
                                    });
                                }}
                            >
                                Go to Lectures
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary capitalize"
                                onClick={() => {
                                    navigate(`/course/${courseState.title}/checkout`, {
                                        state: courseState,
                                    });
                                }}
                            >
                                Subscribe
                            </button>
                        )
                    )}
                </div>

                <div className="lg:w-1/2 w-full px-12 py-12 flex flex-col gap-4 ">
                    <h1 className="font-bold text-yellow-500 lg:text-4xl text-xl capitalize">
                        {courseState.title}
                    </h1>
                    <p className="font-semibold lg:text-2xl text-xl text-amber-500 capitalize">
                        Course Description :
                    </p>
                    <p className="font-semibold lg:text-xl text-xs text-white normal-case tracking-wider">
                        {courseState.description}
                    </p>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseDescription;
