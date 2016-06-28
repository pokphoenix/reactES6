import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="courses" component={CoursesPage} />
            <route path="course">
                    <IndexRoute component={ManageCoursePage} />
                    {/* สำหรับ /pages/:id */}
                    <route path=":id" component={ManageCoursePage} />
            </route>
        <Route path="about" component={AboutPage} />
    </Route>
);