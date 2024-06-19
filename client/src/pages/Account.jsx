import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Account = () => {
    const { user, dispatch } = useAuthContext();
    const { deleteUser, isLoading: isDeleteLoading, error: deleteError } = useDeleteUser();
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    if (!user) {
        navigate('/unauthorized')
    }

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            await deleteUser();
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setIsChangingPassword(false);
        setUsername(user?.username || "");
        setEmail(user?.email || "");
        setCurrentPassword("");
        setNewPassword("");
        setError(null);
    };

    const handleSave = async () => {
        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.patch(
                `http://localhost:4000/api/user/${user._id}`,
                { username, email },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );

            dispatch({ type: "UPDATE_USER", payload: response.data });
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangePassword = async () => {
        setError(null);
        setIsLoading(true);

        try {
            await axios.patch(
                `http://localhost:4000/api/user/${user._id}/password`,
                { currentPassword, newPassword },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );

            setIsChangingPassword(false);
            setCurrentPassword("");
            setNewPassword("");
            alert("Password updated successfully");
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen animate-fadeIn bg-slate-200 dark:bg-slate-900 w-full flex justify-center items-center relative">
            {deleteError && <div className="absolute bottom-0 object-center w-64 bg-red-400 flex justify-center items-center text-slate-200 h-8 rounded-md">{deleteError}</div>}
            <Link to='/' className="absolute top-5 left-5 bg-blue-100 dark:bg-blue-600 dark:text-slate-200 p-2 rounded-md hover:scale-105">
                <div className="flex justify-center items-center gap-2">
                    <ArrowLeftIcon className="size-6" />
                    <p className="">Go back</p>
                </div>
            </Link>
            <div className={`bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md h-[500px] w-96 transition-all flex flex-col justify-between ${isChangingPassword ? '!h-fit' : ''}`}>
                <h2 className="text-2xl font-bold mb-6 text-center dark:text-slate-200 text-gray-800">
                    Account Details
                </h2>
                <div className="flex flex-col gap-4">
                    <div className="mb-4">
                        <label className="block dark:text-slate-200 text-gray-700 text-sm font-bold mb-2">
                            Email:
                        </label>
                        {isEditing ? (
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        ) : (
                            <p className="dark:text-slate-200 text-gray-600">{user?.email}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block dark:text-slate-200 text-gray-700 text-sm font-bold mb-2">
                            Username:
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        ) : (
                            <p className="text-gray-600 dark:text-slate-200">{user?.username}</p>
                        )}
                    </div>
                </div>


                {isChangingPassword && (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-slate-200">
                                Current Password:
                            </label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-slate-200">
                                New Password:
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </>
                )}

                {error && (
                    <p className="text-red-500 text-xs italic mb-4">{error}</p>
                )}

                <div className="flex justify-between items-center">
                    {isEditing || isChangingPassword ? (
                        <>
                            <button
                                onClick={isChangingPassword ? handleChangePassword : handleSave}
                                disabled={isLoading}
                                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
                            >
                                {isLoading ? "Saving..." : "Save"}
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col justify-center items-end gap-4 w-full">
                                <button
                                    onClick={handleEdit}
                                    className="bg-green-400 hover:bg-green-600 text-white p-1 font-bold rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
                                >
                                    Edit Details
                                </button>
                                <button
                                    onClick={() => setIsChangingPassword(true)}
                                    className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold p-1 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
                                >
                                    Change Password
                                </button>
                                <button onClick={handleDelete} disabled={isDeleteLoading} className="bg-red-400 p-1 hover:bg-red-600 text-white font-bold rounded-lg focus:outline-none focus:shadow-outline transition duration-300">
                                    {isDeleteLoading ? 'Deleting...' : 'Delete Account'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};