import React from 'react'
import StudentSearchBar from './StudentSearchBar'
import StudentTable from './StudentTable'
import Pager from './common/Pager'
import Loading from './Loading'
import { connect } from 'react-redux'
import { change } from '../store/action/student/searchCondition'
import { fetchStudents } from '../store/action/student/searchResult'
import {useEffect} from'react'
import store from "../store"
// 链接StudentSearchBar
let mapStateToProps = state => ({
    defaultValue: {
        key: state.students.condition.key,
        sex: state.students.condition.sex
    }
})
let mapDispatchToProps = dispatch => ({
    onSearch: newCondition => {
        newCondition.page = 1; //条件中页码回归到1
        dispatch(change(newCondition))
        dispatch(fetchStudents());
    }

})
// 链接数据和处理函数之后，得到一个新的组件
const SearchBar = connect(mapStateToProps, mapDispatchToProps)(StudentSearchBar)

// 链接StudentTable
mapStateToProps = state => ({
    stus: state.students.result.datas
})
const SearchTable = connect(mapStateToProps)(StudentTable)

// 链接Pager
mapStateToProps = state => ({
    current: state.students.condition.page,
    total: state.students.result.total,
    limit: state.students.condition.limit,
    panelNumber: 5,
})
mapDispatchToProps = dispatch => ({
    onPageChange: target => {
        dispatch(change({
            page: target
        }))
        dispatch(fetchStudents());
    }

})
const PagerTemp = connect(mapStateToProps, mapDispatchToProps)(Pager)

//连接 Loading
mapStateToProps = state => ({
    show: state.students.result.isLoading
})
const LoadingTemp = connect(mapStateToProps)(Loading);
export default function StudentSearch() {
    useEffect(() => {
        store.dispatch(fetchStudents());
    })
    return (
        <div>
            <SearchBar />
            <SearchTable />
            <PagerTemp />
            <LoadingTemp />
        </div>
    )
}
