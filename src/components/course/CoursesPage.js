import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CoursesList' ;
import {browserHistory} from 'react-router';

import fetch from 'isomorphic-fetch' ;

import jwt from 'jsonwebtoken';
const appKey = 'base64:Q6ERrj4q7NCiSD27kFQNrRkiJFS//jIHbcXHzF4+3qQ=';

class CoursesPage extends React.Component {
    constructor(props,context){
        super(props,context);

        let userToken = localStorage.getItem('userToken');
        console.log('Token localStorage : ',userToken);
        if (typeof userToken == 'undefined' || userToken==null ||  userToken=="" ){
             console.log('Token localStorage undefined : ',userToken);
            userToken = ""
        }

        this.state = {
            userId : 0,
            userToken : userToken
        };
        console.log('Token state : ', this.state.userToken);

        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
        this.Login = this.Login.bind(this);
        this.Logout = this.Logout.bind(this);
        this.ChangePass = this.ChangePass.bind(this);
    }

    // courseRow(course, index) {
    //     return <div key={index}>{course.title}</div>;
    // }

    redirectToAddCoursePage(){
        browserHistory.push('/course');
    }

    Login(){

        let params = {
            username: 'admin',
            password: 'admin1234'
        };

        var request = {
            method: 'POST',
            // headers: headers,
            body: jwt.sign({data: params}, appKey)
        };

        fetch('http://localhost/semi_server_pok/public/api/login',request)
            .then((response) => response.json())
            .then((pages) => {
                    if (pages.status == "error"){
                        alert(pages.message);
                    }
                    if (typeof pages.datas.data.token != 'undefined'){
                        // console.log('Token : ',pages.datas.data.token);
                        this.setState({ userToken : pages.datas.data.token });
                        // Put the object into storage
                        localStorage.setItem('userToken', pages.datas.data.token );
                    }
                }
            )
            .catch(function(error) {
                console.log('request failed', error)
            });
    }

    Logout(){
        console.log('Token : ',this.state.userToken);

        let params = {
            userToken: this.state.userToken,
            passdata: 'test'
        };

        let headers = {
            'Authorization': 'Bearer '+this.state.userToken
        };

        var request = {
            method: 'POST',
            headers: headers,
            body: jwt.sign({data: params}, appKey)
        };

        fetch('http://localhost/semi_server_pok/public/api/auth/logout',request)
            .then((response) => response.json())
            .then((pages) => {
                    if (pages.status == "error"){
                        alert(pages.message);
                    }
                    localStorage.setItem('userToken', "" );

                }
            )
            .catch(function(error) {
                console.log('request failed', error)
            });
    }

    ChangePass(){
        
        if (typeof this.state.userToken == 'undefined' || this.state.userToken == null ||  this.state.userToken == "" ){
           alert('Login Please !!!'); return false;
        }

        var decoded = jwt.decode(this.state.userToken);
        let dateExp = decoded.exp;
        let dateNow =  Math.floor( new Date().getTime()/ 1000 ) ;

        if ( dateNow > dateExp ){
            alert('Token Expire Login Please!!!'); return false;
        }

        let params = {
            userToken: this.state.userToken,
            oldPass: 'admin1234',
            newPass: '1234',
            confirmPass: '1234'
        };


        var request = {
            method: 'POST',
            // headers: headers,
            body: jwt.sign({data: params}, appKey)
        };

        fetch('http://localhost/semi_server_pok/public/api/auth/changepass',request)
            .then((response) => response.json())
            .then((pages) => {
                    if (pages.status == "error"){
                        alert(pages.message);
                    }else if (typeof pages.datas.data.token != 'undefined'){
                        console.log(pages);
                    }
                }
            )
            .catch(function(error) {
                console.log('request failed', error)
            });
    }
    
    postAjax(){

        // let JWT_SECRET = "base64:fh5CuDzXIPeRBiSks+ys649A7sJLMm+1B4uhxMnuBBM=" ;
        //
        // let data = {
        //     email: "admin@pos.com",
        //     password: "admin1234"
        // };
        // let token = jwt.sign(u, JWT_SECRET, {
        //     expiresIn: 60 * 60  // expires in 1 hours
        // });
        //
        // console.log(token);

        let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdFwvcmVzdEFwaVwvcHVibGljXC9hcGlcL2F1dGhlbnRpY2F0ZSIsImlhdCI6MTQ2NzI2MTg5OSwiZXhwIjoxNDY3MjY1NDk5LCJuYmYiOjE0NjcyNjE4OTksImp0aSI6Ijk2MDM4ZTk3N2UyYTVhMzM5ZGI2N2E4ZGEwMjU3YmRiIn0.RDiXLnX_6zUaq1XPPNZbphOnodYiCwUGFEh-nE2UqBI";


        let params = {
            name: 'admin',
            password: 'admin1234'
        };

        let headers =  {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };

        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }
        
        var request = {
            method: 'POST',
            headers: headers,
            body: jwt.sign({data: params}, appKey)
        };



        fetch('http://localhost/restApi/public/api/decode', request)
            .then((response) => response.json())
            .then((pages) => {
                    if (typeof pages.token != 'undefined'){
                        console.log(pages)
                    }
                }
            )
            .catch(function(error) {
                console.log('request failed', error)
            });


        // fetch('http://localhost/restApi/public/authenticate', {
        //     method: 'post',
        //     body: JSON.stringify({
        //         config_name: 'default',
        //         first_name: this.state.first_name,
        //         last_name: this.state.last_name,
        //         email: this.state.email,
        //         password: this.state.password,
        //         password_confirmation: this.state.password_confirmation,
        //     }).replace(/{|}/gi, ""),
        //     headers: {
        //         Authorization: 'Bearer ' + token
        //     }
        // })

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
                       onClick={this.Login}/>


                &nbsp;
                <input type="button"
                       value="ChangePass"
                       className="btn btn-Info"
                       onClick={this.ChangePass}/>
                &nbsp;
                <input type="button"
                       value="Logout"
                       className="btn btn-Info"
                       onClick={this.Logout}/>

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