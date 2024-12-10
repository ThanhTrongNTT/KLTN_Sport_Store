// import { Routes, Route, Navigate } from 'react-router-dom';
// import {
//     ListUser,
//     DetailUser,
//     NewUser,
//     Home,
//     Login,
//     DetailCategory,
//     ListPost,
//     DetailPost,
//     NewPost,
// } from '~/screens';
// import NotFound from '~/screens/notFound/NotFound';
// import LayoutDefault from './layouts/LayoutDefault';
// import ListCatgory from './screens/list/ListCatgory';
// import ListCourse from './screens/list/ListCourse';
// import NewCategory from './screens/new/NewCategory';
// import PrivateRoute from './screens/privateRoute';

const App = () => {
    return (
        <div className="bg-gradient-to-t from-orange-400 via-red-500 to-pink-500 bg-repeat h-screen">
            {/* <Routes>
                <Route path='/' element={<Navigate to='/admin' />} />
                <Route path='/login' element={<Login />} />
                <Route path='/admin' element={<PrivateRoute />}>
                    <Route element={<LayoutDefault />}>
                        <Route path='' element={<Home />} />
                        <Route path='users'>
                            <Route index element={<ListUser />} />
                            <Route path=':userId' element={<DetailUser />} />
                            <Route path='new' element={<NewUser />} />
                        </Route>
                        <Route path='locations'>
                            <Route index element={<ListCatgory />} />
                            <Route path=':locationId' element={<DetailCategory />} />
                            <Route path='new' element={<NewCategory />} />
                        </Route>
                        <Route path='tours'>
                            <Route index element={<ListPost />} />
                            <Route path=':tourId' element={<DetailPost />} />
                            <Route path='new' element={<NewPost />} />
                        </Route>
                        <Route path='courses'>
                            <Route index element={<ListCourse />} />
                            <Route path=':courseId' element={<DetailPost />} />
                            <Route path='new' element={<NewPost />} />
                        </Route>
                        <Route path='analysis'>
                            <Route index element={<NotFound />} />
                            <Route path='user' element={<NotFound />} />
                            <Route path='post' element={<NotFound />} />
                            <Route path='comment' element={<NotFound />} />
                        </Route>
                    </Route>
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes> */}
        </div>
    );
};
export default App;
