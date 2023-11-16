import React from 'react'
import PropTypes from 'prop-types'

export default function StudentList({ stus }) {
    const list = stus.map((stu, index) => (
        <li key={index}>{stu.name}-{stu.age}-{stu.sex === 1 ? '男' : '女'}</li>
    ))
    return (
        <ul>
            {list}
        </ul>
    )
}

StudentList.defaultProps = {
    stus: []
}

StudentList.propTypes = {
    stus: PropTypes.array.isRequired,
}

