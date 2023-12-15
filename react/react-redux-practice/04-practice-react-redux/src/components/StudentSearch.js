import React, { useEffect } from 'react'
import store from '../store'
import { connect } from 'react-redux'
import { setSearchCondition } from '../store/actions/student/searchCondition'
import { fatchStudents } from '../store/actions/student/searchResult'
import StudentSearchBar from './StudentSearchBar'
import StudentTable from './StudentTable'
import Pager from './common/Pager'
import Loading from './Loading'
let mapStateToProps = state => {
    return {
        defaultValue: {
            key: state.student.condition.key,
            sex: state.student.condition.sex,
        }
    }
}

let mapDispatchToProps = dispatch => {
    return {
        onSearch: newCondition => {
            newCondition.page = 1
            dispatch(setSearchCondition(newCondition))
            dispatch(fatchStudents())
        }
    }
}

// 连接 StudentSearchBar
const SearchBar = connect(mapStateToProps, mapDispatchToProps)(StudentSearchBar)

mapStateToProps = state => {
    return {
        stus: state.student.result.datas,
    }
}
// 连接 StudentTable
const Table = connect(mapStateToProps)(StudentTable)

mapStateToProps = state => {
    return {
        current: state.student.condition.page,
        limit: state.student.condition.limit,
        total: state.student.result.total,
        panelNumber: 5
    }
}
mapDispatchToProps = dispatch => {
    return {
        onPageChange: target => {
            dispatch(setSearchCondition({ page: target }))
            dispatch(fatchStudents())
        }
    }
}

const PagerTemp = connect(mapStateToProps, mapDispatchToProps)(Pager)
mapStateToProps = state => {
    return {
        show: state.student.result.isLoading
    }
}

const LoadingTemp = connect(mapStateToProps)(Loading)

function StudentSearch() {
    useEffect(() => {
        store.dispatch(fatchStudents())
    }, [])
    return (
        <div>
            <SearchBar />
            <Table />
            <PagerTemp />
            <LoadingTemp />
        </div>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(StudentSearch)
