import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Menu from '../components/Menu'
import { Route, Switch } from 'react-router-dom'

import WelCome from './WelCome'
import StudentList from './student/StudentList'
import StudentAdd from './student/StudentAdd'
import CourseList from "./course/CourseList"
import CourseAdd from "./course/CourseAdd"
export default function Admin() {
    return (
        <Layout
            header={<Header />}
            aside={<Menu />}
        >
            <Switch>
                <Route path="/students" exact component={StudentList} />
                <Route path="/students/add" exact component={StudentAdd} />
                <Route path="/courses" exact component={CourseList} />
                <Route path="/courses/add" exact component={CourseAdd} />
                <Route path="/" exact component={WelCome} />
            </Switch>
        </Layout>
    )
}
