import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CoursesList' ;
import {browserHistory} from 'react-router';

import fetch from 'isomorphic-fetch' ;

class CoursesPage extends React.Component {
    constructor(props,context){
        super(props,context);

        this.state = {
            userId : 0
        };

        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
        this.testAjaxLogin = this.testAjaxLogin.bind(this);
        this.testAjax = this.testAjax.bind(this);
    }

    // courseRow(course, index) {
    //     return <div key={index}>{course.title}</div>;
    // }

    redirectToAddCoursePage(){
        browserHistory.push('/course');
    }

    testAjaxLogin(){
        fetch('http://localhost/semi_server_pok/public/api/auth/login?username=admin&password=admin1234')
            .then((response) => response.json())
            .then((pages) =>
                this.setState({ userId : pages.datas.data.id })
            );
    }

    testAjax(){
        fetch('http://localhost/semi_server_pok/public/api/auth/test?userid='+this.state.userId)
            .then((response) => response.json())
            .then((pages) =>
                console.log(pages)
            );
    }

    render(){
        const {courses} = this.props;

        return(
            <div>
                <h1>Courses</h1>
                <input type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCoursePage}/>

                <input type="button"
                       value="Login"
                       className="btn btn-success"
                       onClick={this.testAjaxLogin}/>

                <input type="button"
                       value="test AJAX"
                       className="btn btn-Info"
                       onClick={this.testAjax}/>

               <CourseList  courses={courses} />
            </div>
        );
    }
}

CoursesPage.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps){
    return {
        courses: state.courses
    };
}


function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(courseActions,dispatch)
    };
}

export  default connect(mapStateToProps,mapDispatchToProps)(CoursesPage) ;