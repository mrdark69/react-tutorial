import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
// import Pages ที่เป็น Presentational Component มาจากโมดูล components
import {PAGES_ENDPOINT } from '../../constants/endpoints'
import {Pages}  from '../../components'

export default class PagesContainer extends Component {
  state = {
    pages: []
  }

  onReloadPages = () => {
    fetch(PAGES_ENDPOINT)
      .then((response) => response.json())
      .then((pages) => this.setState({ pages }))
  }

  // ถ้า pages ของเดิมกับของใหม่เท่ากัน ก็ไม่ต้องทำอะไร
  shouldComponentUpdate(_nextProps, nextState) {
    return this.state.pages !== nextState.pages;
  }
  // PagesContainer เป็น Container Component
  // มันมีสมองเลยรู้จักวิธีการดึงข้อมูลจากเซิร์ฟเวอร์
  componentDidMount() {
    this.onReloadPages()
  }

  render() {
    // เรียกใช้ Presentational Component
    return <Pages pages={this.state.pages} onReloadPages={this.onReloadPages} />
  }
}
