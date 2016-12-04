import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { PAGES_ENDPOINT } from '../../constants/endpoints'
import {ShowPage}  from '../../components'

export default class ShowPageContainer extends Component {
	state = {
		page: {
			title : '',
			content : ''
		}
	}

	shouldComponentUpdate(_nextProps, nextState) {
	 	   return this.state.page !== nextState.page;
	 } 

	  componentDidMount() {
    // react-router จะจับคู่ URL ที่เข้ามากับ ID 
    // แล้วส่งค่า ID เข้ามาเป็น this.props.params.id
    // เช่น ถ้าขณะนั้น path คือ /pages/1
    // ID ที่ส่งเข้ามาจะเป็น 1
    fetch(`${PAGES_ENDPOINT}/${this.props.params.id}`)
      .then((response) => response.json())
      .then((page) => this.setState({ page }))
  }

   render() {
    const { id, title, content } = this.state.page

    return <ShowPage
      id={id}
      title={title}
      content={content} />
  }
}