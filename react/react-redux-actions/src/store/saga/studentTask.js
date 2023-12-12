import { fetchStudents, setIsLoading, setStudentsAndTotal } from "../action/student/searchResult"
import { takeEvery, put, call, select } from "redux-saga/effects"
function searchStudents(condition) {
    console.log(' ');
    console.log('condition ==>>', condition);
    console.log(' ');
    return new Promise((rest, rej) => {
        let stus = [
            {
                id: 1,
                name: '张三',
                age: 20,
                sex: 1
            },
            {
                id: 2,
                name: '李四',
                age: 20,
                sex: 2
            },
            {
                id: 3,
                name: '王五',
                age: 20,
                sex: 1
            },
            {
                id: 4,
                name: '赵六',
                age: 20,
                sex: 1
            },
            {
                id: 5,
                name: '田七',
                age: 20,
                sex: 1
            },
            {
                id: 6,
                name: '周八',
                age: 20,
                sex: 1
            },
            {
                id: 7,
                name: '吴九',
                age: 20,
                sex: 1
            },
            {
                id: 8,
                name: '郑十',
                age: 20,
                sex: 2
            },
            {
                id: 9,
                name: '孙十一',
                age: 20,
                sex: 1
            },
            {
                id: 10,
                name: '周十二',
                age: 20,
                sex: 2
            },
            {
                id: 11,
                name: '吴十三',
                age: 20,
                sex: 2
            },
            {
                id: 12,
                name: '郑十四',
                age: 20,
                sex: 2
            },
            {
                id: 13,
                name: '孙十五',
                age: 20,
                sex: 1
            },
            {
                id: 14,
                name: '周十六',
                age: 20,
                sex: 1
            },
            {
                id: 15,
                name: '吴十七',
                age: 20,
                sex: 1
            },
            {
                id: 16,
                name: '郑十八',
                age: 20,
                sex: 1
            },
            {
                id: 17,
                name: '孙十九',
                age: 20,
                sex: 1
            },
            {
                id: 18,
                name: '周二十',
                age: 20,
                sex: 1
            },
            {
                id: 19,
                name: '吴二十一',
                age: 20,
                sex: 1
            },
            {
                id: 20,
                name: '郑二十二',
                age: 20,
                sex: 1
            },
            {
                id: 21,
                name: '孙二十三',
                age: 20,
                sex: 1
            },
            {
                id: 22,
                name: '周二十四',
                age: 20,
                sex: 1
            },
            {
                id: 23,
                name: '吴二十五',
                age: 20,
                sex: 1
            },
            {
                id: 24,
                name: '郑二十六',
                age: 20,
                sex: 1
            },
            {
                id: 25,
                name: '孙二十七',
                age: 20,
                sex: 1
            },
            {
                id: 26,
                name: '周二十八',
                age: 20,
                sex: 1
            },

        ]
        setTimeout(() => {
            rest({
                stus,
                count: stus.length
            })
        }, 1000)
    })
}

function* fetchStudentsSaga() {
    //设置为正在加载中
    yield put(setIsLoading(true))
    const condition = yield select(state => state.students.condition);
    const result = yield call(searchStudents, condition)
    yield put(setStudentsAndTotal(result.stus, result.count))
    yield put(setIsLoading(false))

}



export default function* () {
    
    yield takeEvery(fetchStudents.toString(), fetchStudentsSaga);
}